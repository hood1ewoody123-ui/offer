/**
 * DANCE SCHOOL REFERENCES — localized data only.
 * Source text: dance-school-references.txt
 * Source videos: /рефы академия брейкинга/рефф1.mp4 … рефф6.mp4
 *   → /public/dance-references/dance-ref-1.mp4 … dance-ref-6.mp4
 */

import type {
  StandalonePageConfig,
  StandaloneSubCase,
  StandaloneWall,
} from "@/standalone/client-cases/data";

const WALL_WIDTH = 785;
const WALL_HEIGHT = 446;

type ReferenceItem = {
  id: string;
  title: string;
  src: string;
  description: string;
};

const REFERENCES: ReferenceItem[] = [
  {
    id: "dance-ref-1",
    title: "SHARE",
    src: "/dance-references/dance-ref-1.mp4",
    description:
      "Видео на первом экране, крупные заголовки и много свободного пространства. Такой подход помогает показать атмосферу школы, познакомить с преподавателями и рассказать о занятиях без перегруза.",
  },
  {
    id: "dance-ref-2",
    title: "Mikki Sindhunata",
    src: "/dance-references/dance-ref-2.mp4",
    description:
      "Видео на весь экран и минимум элементов поверх него — всё внимание на танце. Подойдёт, чтобы показать хореографию, выступления и стиль школы уже с первого экрана.",
  },
  {
    id: "dance-ref-3",
    title: "SFD+I — Velocity Dance Center",
    src: "/dance-references/dance-ref-3.mp4",
    description:
      "Чёрно-белый дизайн с синими акцентами, крупные заголовки и раскрывающиеся карточки программ. Удобный пример того, как разложить занятия по уровням и помочь человеку выбрать подходящую группу.",
  },
  {
    id: "dance-ref-4",
    title: "Abadir",
    src: "/dance-references/dance-ref-4.mp4",
    description:
      "Яркие цветные плашки, необычные изображения и блоки, похожие на афишу. Такой приём можно использовать для танцевальных направлений, мастер-классов и объявлений о наборе в группы.",
  },
  {
    id: "dance-ref-5",
    title: "Ethos Music Academy",
    src: "/dance-references/dance-ref-5.mp4",
    description:
      "Тёмный фон, жёлтые акценты и округлые карточки с фотографиями. Понятная структура для школы: виды занятий, возрастные группы и преподаватели — всё легко найти и посмотреть.",
  },
  {
    id: "dance-ref-6",
    title: "Lordz Dance Academy",
    src: "/dance-references/dance-ref-6.mp4",
    description:
      "Жёлто-чёрная палитра, наклонные заголовки и видео с танцорами передают настроение уличных танцев. Крупный блок записи на пробное занятие помогает сразу перейти от просмотра к действию.",
  },
];

function toWall(item: ReferenceItem): StandaloneWall {
  return {
    id: item.id,
    type: "video",
    src: item.src,
    width: WALL_WIDTH,
    height: WALL_HEIGHT,
    objectFit: "cover",
    objectPosition: "50% 50%",
    poster: item.src.replace(/\.mp4$/, ".jpg"),
  };
}

export const danceReferencesSubCases: StandaloneSubCase[] = REFERENCES.map(
  (item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    walls: [toWall(item)],
  }),
);

export const danceReferencesFaceWalls: StandaloneWall[] =
  danceReferencesSubCases.map((item) => item.walls[0]);

export const danceReferencesPageConfig: StandalonePageConfig = {
  wallSize: { width: WALL_WIDTH, height: WALL_HEIGHT },
  collectionDescription:
    "Ниже собраны шесть референсов — проекты, которые задают возможные направления по визуальному языку, подаче и взаимодействию.",
  defaultSubCaseId: danceReferencesSubCases[0]?.id ?? "",
};
