"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { StandaloneWall } from "./data";

/** Seconds for the room to advance by one wall on its own. */
const AUTO_SECONDS_PER_WALL = 16;

/** Higher = snappier catch-up after a manual step. */
const FOLLOW_SPEED = 3.4;

/** Trackpad distance needed to commit one step. */
const SWIPE_THRESHOLD = 190;
const SWIPE_DOMINANCE = 1.5;
const SWIPE_IDLE_RESET_MS = 220;
const STEP_COOLDOWN_MS = 620;

/** Touch swipe — lower threshold, finger-friendly. */
const TOUCH_SWIPE_THRESHOLD = 48;
const TOUCH_AXIS_LOCK_PX = 10;

type CollectionWallStripProps = {
  walls: StandaloneWall[];
  paused?: boolean;
  seek?: { id: string; gen: number } | null;
  onFrontChange?: (id: string) => void;
};

function wrapIndex(value: number, count: number) {
  return ((value % count) + count) % count;
}

function usePreferMobileVideoBudget() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return mobile;
}

function WallVideo({
  wall,
  active,
  budgetMobile,
}: {
  wall: StandaloneWall;
  active: boolean;
  budgetMobile: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStyle = { objectPosition: wall.objectPosition ?? "50% 50%" };
  const shouldPlay = budgetMobile ? active : true;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;
    if (shouldPlay) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [wall.src, shouldPlay]);

  return (
    <>
      {wall.poster ? (
        <img
          src={wall.poster}
          alt=""
          className="scc-wall-media"
          draggable={false}
          data-fit="cover"
          style={mediaStyle}
        />
      ) : null}
      <video
        ref={videoRef}
        className="scc-wall-media scc-wall-media-live"
        src={wall.src}
        muted
        loop
        playsInline
        preload={budgetMobile && !active ? "metadata" : "auto"}
        draggable={false}
        data-fit="cover"
        style={mediaStyle}
      />
    </>
  );
}

export function StandaloneCollectionWallStrip({
  walls,
  paused = false,
  seek,
  onFrontChange,
}: CollectionWallStripProps) {
  const roomRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const targetRef = useRef(0);
  const pausedRef = useRef(paused);
  const onFrontChangeRef = useRef(onFrontChange);
  const lastFrontIdRef = useRef<string | null>(walls[0]?.id ?? null);
  const wallsRef = useRef(walls);
  const [frontId, setFrontId] = useState(walls[0]?.id ?? "");
  const budgetMobile = usePreferMobileVideoBudget();

  pausedRef.current = paused;
  onFrontChangeRef.current = onFrontChange;
  wallsRef.current = walls;

  const count = walls.length;
  const wallKey = walls.map((wall) => wall.id).join("|");
  const stepAngle = count > 0 ? 360 / count : 0;
  const apothemFactor =
    count > 0 ? 1 / (2 * Math.tan(Math.PI / count)) : 0.68819;

  const reportFront = useCallback(() => {
    const items = wallsRef.current;
    if (items.length === 0 || stepAngle === 0) return;
    const index = wrapIndex(
      Math.round(angleRef.current / stepAngle),
      items.length,
    );
    const id = items[index]?.id;
    if (!id || id === lastFrontIdRef.current) return;
    lastFrontIdRef.current = id;
    setFrontId(id);
    onFrontChangeRef.current?.(id);
  }, [stepAngle]);

  const step = useCallback(
    (direction: 1 | -1) => {
      if (stepAngle === 0) return;
      const settled = Math.round(targetRef.current / stepAngle) * stepAngle;
      targetRef.current = settled + direction * stepAngle;
    },
    [stepAngle],
  );

  const goToIndex = useCallback(
    (index: number) => {
      if (stepAngle === 0 || count === 0) return;
      const current = Math.round(targetRef.current / stepAngle);
      const currentWrapped = wrapIndex(current, count);
      let delta = index - currentWrapped;
      if (delta > count / 2) delta -= count;
      if (delta < -count / 2) delta += count;
      targetRef.current = (current + delta) * stepAngle;
    },
    [count, stepAngle],
  );

  useEffect(() => {
    if (!seek) return;
    const index = wallsRef.current.findIndex((wall) => wall.id === seek.id);
    if (index >= 0) goToIndex(index);
  }, [seek, goToIndex]);

  useEffect(() => {
    angleRef.current = 0;
    targetRef.current = 0;
    lastFrontIdRef.current = null;
    setFrontId(wallsRef.current[0]?.id ?? "");
  }, [wallKey]);

  useEffect(() => {
    if (stepAngle === 0) return;

    let frame = 0;
    let last = performance.now();

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const tick = (now: number) => {
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (!reduced && !pausedRef.current) {
        targetRef.current += (delta / AUTO_SECONDS_PER_WALL) * stepAngle;
      }

      angleRef.current +=
        (targetRef.current - angleRef.current) *
        (1 - Math.exp(-FOLLOW_SPEED * delta));

      if (roomRef.current) {
        roomRef.current.style.transform = `translateZ(var(--scc-wall-apothem)) rotateY(${(-angleRef.current).toFixed(3)}deg)`;
      }

      reportFront();
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reportFront, stepAngle]);

  useEffect(() => {
    let accumulated = 0;
    let lastEvent = 0;
    let lastStep = 0;

    const onWheel = (event: WheelEvent) => {
      const horizontal = Math.abs(event.deltaX);
      const vertical = Math.abs(event.deltaY);
      if (horizontal < vertical * SWIPE_DOMINANCE) return;

      const now = performance.now();
      if (now - lastEvent > SWIPE_IDLE_RESET_MS) accumulated = 0;
      lastEvent = now;

      event.preventDefault();

      if (now - lastStep < STEP_COOLDOWN_MS) return;

      accumulated += event.deltaX;
      if (Math.abs(accumulated) < SWIPE_THRESHOLD) return;

      step(accumulated > 0 ? -1 : 1);
      accumulated = 0;
      lastStep = now;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [step]);

  const pointerStart = useRef<{
    id: number;
    x: number;
    y: number;
    axis: "x" | "y" | null;
    stepped: boolean;
  } | null>(null);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    pointerStart.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      axis: null,
      stepped: false,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    if (!start || start.id !== event.pointerId || start.stepped) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    if (!start.axis) {
      if (
        Math.abs(dx) < TOUCH_AXIS_LOCK_PX &&
        Math.abs(dy) < TOUCH_AXIS_LOCK_PX
      ) {
        return;
      }
      start.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }

    if (start.axis !== "x") return;

    if (Math.abs(dx) >= TOUCH_SWIPE_THRESHOLD) {
      step(dx < 0 ? 1 : -1);
      start.stepped = true;
    }
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStart.current?.id === event.pointerId) {
      pointerStart.current = null;
    }
  };

  if (count === 0) return null;

  return (
    <section
      className="scc-wall-strip-section"
      style={
        {
          "--scc-wall-apothem": `calc(var(--scc-wall-pitch) * ${apothemFactor.toFixed(5)})`,
        } as CSSProperties
      }
    >
      <div
        className="scc-wall-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="scc-wall-room" ref={roomRef}>
          {walls.map((wall, index) => (
            <div
              key={wall.id}
              className="scc-wall"
              style={{
                transform: `rotateY(${index * stepAngle}deg) translateZ(calc(-1 * var(--scc-wall-apothem)))`,
              }}
            >
              <WallVideo
                wall={wall}
                active={wall.id === frontId}
                budgetMobile={budgetMobile}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
