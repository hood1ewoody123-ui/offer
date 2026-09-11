/**
 * STANDALONE REFERENCES — localized data only.
 * Source text: /рефы/рефы.txt
 * Source videos: /рефы/реф1.mp4 … реф6.mp4 → /public/references/ref-01.mp4 … ref-06.mp4
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
    id: "ref-01",
    title: "Varco Pruden",
    src: "/references/ref-01.mp4",
    description:
      "Современная корпоративная подача сложной инженерной компании: крупные архитектурные визуалы, уверенная типографика и структурированный рассказ о процессах, решениях и реализованных объектах. Такой подход помогает показать подрядчика не как обычную сантехническую компанию, а как зрелого инженерного партнёра для крупных объектов — профессионального, системного и надёжного.",
  },
  {
    id: "ref-02",
    title: "Pizzato ITS",
    src: "/references/ref-02.mp4",
    description:
      "Сильный арт-дирекшн показывает, как сантехническую и инженерную тематику можно подать неожиданно, современно и премиально. Выразительная визуальная система, движение и смелая подача создают вау-эффект, который особенно полезен при работе с ТЦ, девелоперами и крупными компаниями: бренд выглядит заметным, уверенным и масштабным.",
  },
  {
    id: "ref-03",
    title: "United Careers",
    src: "/references/ref-03.mp4",
    description:
      "Референс на вау-сторителлинг: вместо обычного перечня услуг пользователь проходит через последовательный визуальный сценарий, где контент раскрывается через смену сцен, ритма и эффектов. Для инженерного подрядчика такой подход может превратить сложную и техническую сферу в понятную историю о масштабе работ, процессе и результате — удерживая внимание крупного B2B-клиента.",
  },
  {
    id: "ref-04",
    title: "Kononenko Architectural Bureau",
    src: "/references/ref-04.mp4",
    description:
      "Сочетание спокойной премиальной подачи и выразительных интерактивных деталей: много воздуха, архитектурная сетка, сильная типографика и аккуратная анимация. Такой визуальный язык создаёт ощущение масштаба, контроля и зрелой экспертизы — именно те качества, которые важны B2B-заказчику при выборе подрядчика для сложного объекта.",
  },
  {
    id: "ref-05",
    title: "Air Company",
    src: "/references/ref-05.mp4",
    description:
      "Технологичный и очень собранный образ инженерной компании: сложная технология объясняется через сильную визуальную систему, крупные детали, motion и ясный сторителлинг. Для нашей сферы это хороший ориентир, как сделать техническую компетенцию понятной и одновременно премиальной, чтобы профессионализм компании ощущался ещё до изучения подробностей.",
  },
  {
    id: "ref-06",
    title: "Caeli Energie",
    src: "/references/ref-06.mp4",
    description:
      "Инженерная технология подаётся визуально, но с опорой на конкретику: 3D, понятные преимущества, показатели эффективности и сценарии для профессиональных клиентов. Такой подход создаёт доверие не за счёт сухого корпоративного текста, а через сочетание прозрачного объяснения, доказательности и современного digital-опыта — сильный ориентир для крупного инженерного подрядчика.",
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
    poster: "",
  };
}

export const referencesSubCases: StandaloneSubCase[] = REFERENCES.map(
  (item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    walls: [toWall(item)],
  }),
);

export const referencesFaceWalls: StandaloneWall[] = referencesSubCases.map(
  (item) => item.walls[0],
);

export const referencesPageConfig: StandalonePageConfig = {
  wallSize: { width: WALL_WIDTH, height: WALL_HEIGHT },
  collectionDescription:
    "Ниже собраны шесть референсов — проекты, которые задают возможные направления по визуальному языку, подаче и взаимодействию.",
  defaultSubCaseId: referencesSubCases[0]?.id ?? "",
};
