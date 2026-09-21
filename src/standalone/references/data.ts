/**
 * STANDALONE REFERENCES — localized data for dry-cleaning client presentation.
 * Source text adapted from /рефы/рефы.txt (originally for engineering/plumbing context).
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
      "Современная корпоративная подача сервисной компании: крупные визуалы, уверенная типографика и структурированный рассказ о процессах, услугах и стандартах работы. Для химчистки такой подход помогает показать бренд не как «обычный пункт приёма», а как зрелую службу с понятными правилами, опытом и ответственностью за результат — профессиональную, системную и надёжную.",
  },
  {
    id: "ref-02",
    title: "Pizzato ITS",
    src: "/references/ref-02.mp4",
    description:
      "Сильный арт-дирекшн показывает, как повседневную сервисную тему можно подать неожиданно, современно и премиально. Выразительная визуальная система, движение и смелая подача создают запоминающийся образ — полезный ориентир, если химчистке важно выделиться среди конкурентов и выглядеть уверенно, особенно в сегменте премиального ухода за одеждой и текстилем.",
  },
  {
    id: "ref-03",
    title: "United Careers",
    src: "/references/ref-03.mp4",
    description:
      "Референс на вау-сторителлинг: вместо сухого перечня услуг пользователь проходит через последовательный визуальный сценарий, где контент раскрывается через смену сцен, ритма и эффектов. Для химчистки такой подход может превратить «стирка, чистка, реставрация» в понятную историю о заботе, процессе и результате — и удержать внимание клиента, который выбирает, кому доверить вещи.",
  },
  {
    id: "ref-04",
    title: "Kononenko Architectural Bureau",
    src: "/references/ref-04.mp4",
    description:
      "Сочетание спокойной премиальной подачи и выразительных интерактивных деталей: много воздуха, чёткая сетка, сильная типографика и аккуратная анимация. Такой визуальный язык создаёт ощущение аккуратности, контроля и зрелой экспертизы — важные сигналы для клиента химчистки, который оценивает, насколько бережно и профессионально обращаются с дорогими или деликатными вещами.",
  },
  {
    id: "ref-05",
    title: "Air Company",
    src: "/references/ref-05.mp4",
    description:
      "Технологичный и собранный образ сервисной компании: сложный процесс объясняется через сильную визуальную систему, крупные детали, motion и ясный сторителлинг. Для химчистки это ориентир, как показать профессионализм — оборудование, этапы обработки, стандарты — понятно и без перегруза, чтобы доверие к качеству возникало ещё до чтения подробностей.",
  },
  {
    id: "ref-06",
    title: "Caeli Energie",
    src: "/references/ref-06.mp4",
    description:
      "Сервис и технология подаются визуально, но с опорой на конкретику: понятные преимущества, сценарии использования и доказательства качества. Такой подход создаёт доверие не за счёт общих обещаний, а через прозрачное объяснение — что принимают, как обрабатывают, какие сроки и гарантии. Для химчистки это сильный ориентир, если важно снять типичные сомнения клиента до первого визита.",
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
    "Ниже собраны шесть референсов — проекты из других сфер, которые задают возможные направления по визуальному языку, подаче и взаимодействию для сайта химчистки. Это не готовые решения «под ключ», а ориентиры: как можно показать сервис, процесс и доверие.",
  defaultSubCaseId: referencesSubCases[0]?.id ?? "",
};
