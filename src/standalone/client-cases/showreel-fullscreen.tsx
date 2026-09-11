"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

type ShowreelFullscreenProps = {
  src: string;
  onClose: () => void;
  loop?: boolean;
};

export function StandaloneShowreelFullscreen({
  src,
  onClose,
  loop = false,
}: ShowreelFullscreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClose = useCallback(() => {
    videoRef.current?.pause();
    onClose();
  }, [onClose]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    void video.play();
  }, [src]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black"
        style={{ zIndex: "calc(var(--z-overlay) + 1)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        role="dialog"
        aria-label="шоурил"
      >
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-contain"
          playsInline
          controls={false}
          loop={loop}
        />

        <button
          type="button"
          onClick={handleClose}
          className="scc-fullscreen-exit fixed bottom-[14vh] right-6 transition-opacity hover:opacity-60 md:right-8"
        >
          закрыть
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
