/**
 * CLEANING REFERENCES — localized data only.
 * Source text: cleaning-references.txt
 * Source videos: /рефы услуг/реффф1(1).mp4 … реффф5(1).mp4
 *   → /public/cleaning-references/cleaning-ref-1.mp4 … cleaning-ref-5.mp4
 * Ref 6 reuses Pizzato ITS video from /references/ref-02.mp4
 */

import type {
  StandalonePageConfig,
  StandaloneSubCase,
  StandaloneWall,
} from "@/standalone/client-cases/data";

const WALL_WIDTH = 785;
const WALL_HEIGHT = 446;

const PIZZATO_VIDEO_SRC = "/references/ref-02.mp4";

type ReferenceItem = {
  id: string;
  title: string;
  src: string;
  poster?: string;
  description: string;
};

const REFERENCES: ReferenceItem[] = [
  {
    id: "cleaning-ref-1",
    title: "ACOR",
    src: "/cleaning-references/cleaning-ref-1.mp4",
    description:
      "Крупные фотографии интерьеров, минимум текста и галерея с фильтрами по типу объекта. Для клининга так можно показывать выполненные работы: клиенту проще найти похожее помещение и рассмотреть результат уборки в деталях.",
  },
  {
    id: "cleaning-ref-2",
    title: "Odyssée Clinic",
    src: "/cleaning-references/cleaning-ref-2.mp4",
    description:
      "Светлые оттенки, плавные переходы и фотографии крупным планом создают ощущение аккуратности и внимания к деталям. Для химчистки такой подход поможет подчеркнуть бережный уход: показать фактуру ткани и объяснить, как подбирается способ чистки.",
  },
  {
    id: "cleaning-ref-3",
    title: "Laundry Loft",
    src: "/cleaning-references/cleaning-ref-3.mp4",
    description:
      "Услуги собраны в понятные карточки, рядом указаны цены, сроки и ответы на частые вопросы. Полезный пример для химчистки и клининга: клиент быстро понимает условия, выбирает нужную услугу и переходит к заказу.",
  },
  {
    id: "cleaning-ref-4",
    title: "Aura — The Urban Retreat",
    src: "/cleaning-references/cleaning-ref-4.mp4",
    description:
      "Тёплые цвета, спокойные видео и крупные фотографии передают ощущение уюта. Для клининга и чистки мебели так можно показать, ради чего заказывают услугу: свежий диван, приятный интерьер и отдых без домашних хлопот.",
  },
  {
    id: "cleaning-ref-5",
    title: "The Quaker School at Horsham",
    src: "/cleaning-references/cleaning-ref-5.mp4",
    description:
      "Живые фотографии людей, мягкие цвета и простые блоки делают сайт дружелюбным и понятным. Для клининга такой подход поможет познакомить клиента с командой и показать, кому он доверяет свой дом и вещи.",
  },
  {
    id: "cleaning-ref-6",
    title: "Pizzato ITS",
    src: PIZZATO_VIDEO_SRC,
    poster: "",
    description:
      "Выразительная графика и анимация делают привычную техническую тему интересной для просмотра. В клининге и химчистке этот приём можно использовать для наглядного рассказа об этапах работы: как удаляют загрязнения и за счёт чего получают результат.",
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
    poster: item.poster ?? item.src.replace(/\.mp4$/, ".jpg"),
  };
}

export const cleaningReferencesSubCases: StandaloneSubCase[] = REFERENCES.map(
  (item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    walls: [toWall(item)],
  }),
);

export const cleaningReferencesFaceWalls: StandaloneWall[] =
  cleaningReferencesSubCases.map((item) => item.walls[0]);

export const cleaningReferencesPageConfig: StandalonePageConfig = {
  wallSize: { width: WALL_WIDTH, height: WALL_HEIGHT },
  collectionDescription:
    "Ниже собраны шесть референсов — проекты, которые задают возможные направления по визуальному языку, подаче и взаимодействию.",
  defaultSubCaseId: cleaningReferencesSubCases[0]?.id ?? "",
};
