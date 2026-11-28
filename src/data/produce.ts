// Our Produce: the three vegetables, each in its own Bhoomi Tech pack.
// The layout follows Agrumea Farm's Pantry: a big title per crop, a photo, a few lines, the pack, and a card
// where the pack tilts and pieces of the crop tumble in behind it.
//
// The words are drafts for Rohit to approve. Anything not yet known is null and shows as "To be confirmed":
// pack sizes, how long it keeps, and how it is grown. Never fill those in with a guess.
import media from './produce-media.json';

export type ProduceMediaId = keyof typeof media;

export interface Crop {
  slug: 'lettuce' | 'kale' | 'cucumber';
  name: string;
  /** As printed under the name on the label. */
  variety: string;
  /** The pack in two or three words, for chips. */
  packShort: string;
  /** One line on taste and texture. */
  lead: string;
  /** One line on the pack. */
  packNote: string;
  /** General handling advice, true of the vegetable anywhere. */
  keep: string;
  goodWith: string[];
  size: string | null;
  keeps: string | null;
  grown: string | null;
  /** Card colours: the tint behind the pack, and a deeper shade for its edges and hover. */
  tint: string;
  deep: string;
  /** Pieces that tumble in behind the pack, and their width as a share of the card's width. */
  pieces: { img: ProduceMediaId; w: number }[];
}

export const crops: Crop[] = [
  {
    slug: 'lettuce',
    name: 'Lettuce',
    variety: 'Leaf lettuce',
    packShort: 'Fibre punnet',
    lead: 'Soft, frilly leaves with a clean, sweet crunch.',
    packNote: 'It travels whole in a vented fibre punnet, with a tall rim at the back so the leaves aren’t crushed.',
    keep: 'Keep it in the fridge in its punnet, and wash the leaves just before you eat them.',
    goodWith: ['Salads', 'Sandwiches', 'Wraps', 'Burgers'],
    size: null,
    keeps: null,
    grown: null,
    tint: '#e4eec6',
    deep: '#8fb158',
    pieces: [
      { img: 'piece-lettuce-a', w: 0.34 },
      { img: 'piece-lettuce-b', w: 0.24 },
      { img: 'piece-lettuce-a', w: 0.28 },
      { img: 'piece-lettuce-b', w: 0.2 },
      { img: 'piece-lettuce-a', w: 0.3 },
      { img: 'piece-lettuce-a', w: 0.24 },
      { img: 'piece-lettuce-b', w: 0.26 },
      { img: 'piece-lettuce-a', w: 0.32 },
      { img: 'piece-lettuce-b', w: 0.22 },
      { img: 'piece-lettuce-a', w: 0.26 },
    ],
  },
  {
    slug: 'kale',
    name: 'Kale',
    variety: 'Curly kale',
    packShort: 'Kraft paper pouch',
    lead: 'Deep green, curly leaves with an earthy bite.',
    packNote: 'Packed in a fold-top kraft paper pouch with a window, so you can see the leaves before you buy.',
    keep: 'Keep it in the fridge in its pouch. Strip the leaves from the stems and wash them just before cooking.',
    goodWith: ['Thoran', 'Stir-fries', 'Soups', 'Smoothies'],
    size: null,
    keeps: null,
    grown: null,
    tint: '#d5e1dc',
    deep: '#4f7563',
    pieces: [
      { img: 'piece-kale-a', w: 0.42 },
      { img: 'piece-kale-a', w: 0.34 },
      { img: 'piece-kale-a', w: 0.38 },
      { img: 'piece-kale-a', w: 0.3 },
      { img: 'piece-kale-a', w: 0.4 },
      { img: 'piece-kale-a', w: 0.32 },
      { img: 'piece-kale-a', w: 0.36 },
    ],
  },
  {
    slug: 'cucumber',
    name: 'Cucumber',
    variety: 'Whole cucumbers',
    packShort: 'Paper band, no tray',
    lead: 'Firm, cool and crisp, with a clean snap.',
    packNote: 'Sold as a pair, held together by a paperboard band with no tray, so there’s less to throw away.',
    keep: 'Keep it in the vegetable drawer of the fridge, and wash it before you slice it.',
    goodWith: ['Salads', 'Raita', 'Sandwiches', 'Juice'],
    size: null,
    keeps: null,
    grown: null,
    tint: '#f1e7cf',
    deep: '#b89a62',
    pieces: [
      { img: 'piece-cucumber-a', w: 0.22 },
      { img: 'piece-cucumber-a', w: 0.18 },
      { img: 'piece-cucumber-a', w: 0.2 },
      { img: 'piece-cucumber-a', w: 0.16 },
      { img: 'piece-cucumber-a', w: 0.22 },
      { img: 'piece-cucumber-a', w: 0.19 },
      { img: 'piece-cucumber-a', w: 0.17 },
      { img: 'piece-cucumber-a', w: 0.21 },
      { img: 'piece-cucumber-a', w: 0.18 },
      { img: 'piece-cucumber-a', w: 0.2 },
      { img: 'piece-cucumber-a', w: 0.16 },
      { img: 'piece-cucumber-a', w: 0.22 },
    ],
  },
];

export const cropBySlug = (slug: string) => crops.find((c) => c.slug === slug);

export const produceMedia = (id: ProduceMediaId) => media[id] as { aspect: number; files: { w: number; file: string }[]; bg?: string };

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** srcset and fallback for a prepared picture. */
export function pic(id: ProduceMediaId) {
  const m = produceMedia(id);
  return {
    src: `${base}/produce/img/${m.files[0].file}`,
    srcset: m.files.map((f) => `${base}/produce/img/${f.file} ${f.w}w`).join(', '),
    aspect: m.aspect,
    /** Corner colour of an opaque photo. */
    bg: m.bg,
  };
}

/** The wheel (no slug), or one vegetable's page. */
export const producePath = (slug?: string) => `${base}/preview/produce/${slug ? `${slug}/` : ''}`;
/** The range: every pack on a shelf, then a section per vegetable. */
export const rangePath = () => `${base}/preview/produce/range/`;
