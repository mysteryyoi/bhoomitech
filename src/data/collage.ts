// The homepage photo collage: eight chapters that travel sideways as you scroll down.
// Each chapter is a full photo page with cut-out photos layered over it at different depths,
// paper notes, and a spot where the egret lands or glides.
//
// Positions are on a stage of 1600 × 1000 on wide screens and 1000 × 1800 on phones.
// x and y are the piece's anchor point (its centre unless ax/ay say otherwise), w its width.
// depth: how fast it drifts as the chapter passes. Below 0 is slower (far away), above 0 faster (close up).
import media from './collage-media.json';

export type MediaId = keyof typeof media;

export interface Place {
  x: number;
  y: number;
  w: number;
  /** Rotation in degrees. */
  r?: number;
}

export interface Piece {
  img: MediaId;
  /** Empty for decoration. */
  alt?: string;
  desk: Place;
  phone?: Place;
  depth: number;
  /** Paint order. 1 is the backdrop; everything else sits above all backdrops, so it can overlap a torn edge. */
  z: number;
  /** Anchor inside the picture, 0 to 1 (default 0.5). Also the point it turns around. */
  ax?: number;
  ay?: number;
  motion?: 'sway' | 'sway-slow' | 'drift' | 'hover' | 'crawl' | 'breathe';
  /** Fade the top edge into what is behind it (for hazy strips like the treeline). */
  fade?: boolean;
  /** Extra behaviour handled in the markup: the phone screen, the auto's wheels, the sensor light. */
  extra?: 'screen' | 'wheels' | 'sensor' | 'drive' | 'tape' | 'scan' | 'placeholder';
}

export interface Note {
  text: string;
  desk: Place;
  phone?: Place;
}

export interface Placeholder {
  caption: string;
  desk: Place;
  phone?: Place;
  depth: number;
  z: number;
}

export interface Egret {
  /** perch: lands here (x is the middle of the standing bird, y the line its legs disappear at).
   *  glide: keeps flying around this point (x, y the middle of the bird, w its wingspan). */
  kind: 'perch' | 'glide';
  desk: Place;
  phone: Place;
  depth: number;
  z: number;
  water?: boolean;
  /** -1 faces left. */
  facing?: 1 | -1;
}

export interface Way {
  kicker: string;
  text: string;
  go: string;
  href: string;
  desk: Place & { str: number };
  phone: Place & { str: number };
}

export interface Chapter {
  id: string;
  label: string;
  /** Words between asterisks are set in italic. */
  heading: string;
  level: 1 | 2;
  lead?: string;
  cue?: string;
  link?: { text: string; href: string };
  /** dark: light text over a darker photo. light: dark text over a pale sky. */
  theme: 'dark' | 'light';
  pieces: Piece[];
  notes: Note[];
  placeholder?: Placeholder;
  egret: Egret;
  ways?: Way[];
  price?: { title: string; was: string[]; now: string; desk: Place & { str: number }; phone?: Place & { str: number } };
  rain?: boolean;
  glints?: [number, number][];
}

/** A full photo page: fills the stage, with room to drift. */
const page = (img: MediaId, phoneX = 500, deskY = 501): Piece => ({
  img,
  desk: { x: 800, y: deskY, w: 1780 },
  phone: { x: phoneX, y: 900, w: 3200 },
  depth: -0.12,
  z: 1,
});

export const chapters: Chapter[] = [
  {
    id: 'bhoomi',
    label: 'Bhoomi',
    heading: 'भूमि means *land.*',
    level: 1,
    lead: 'Bhoomi Tech grows food and builds farm technology, side by side with farmers.',
    cue: 'Scroll to walk the field',
    theme: 'dark',
    pieces: [
      page('cover-ground', 120),
      { img: 'seedling', alt: 'A young seedling growing out of a mound of dark soil', desk: { x: 1060, y: 700, w: 470 }, phone: { x: 560, y: 1590, w: 600 }, depth: 0.22, z: 6, motion: 'breathe', ay: 0.9 },
      { img: 'new-leaf', desk: { x: 1445, y: 190, w: 150, r: -12 }, phone: { x: 830, y: 930, w: 150, r: -12 }, depth: 0.45, z: 9, motion: 'drift' },
      { img: 'soil-clods', desk: { x: 1330, y: 938, w: 480 }, phone: { x: 600, y: 1730, w: 600 }, depth: 0.5, z: 10 },
    ],
    notes: [{ text: 'भूमि (bhoomi): land, earth, soil.', desk: { x: 265, y: 820, w: 330, r: -2 }, phone: { x: 385, y: 830, w: 470, r: -2 } }],
    egret: { kind: 'perch', desk: { x: 1430, y: 660, w: 118 }, phone: { x: 175, y: 1300, w: 130 }, depth: 0.1, z: 7, facing: -1 },
  },
  {
    id: 'land',
    label: 'The land',
    heading: 'It starts with the *land*',
    level: 2,
    theme: 'light',
    pieces: [
      { img: 'land-sky', desk: { x: 800, y: 390, w: 1800 }, phone: { x: 420, y: 700, w: 3100 }, depth: -0.14, z: 1 },
      { img: 'treeline', desk: { x: 800, y: 338, w: 1800 }, phone: { x: 420, y: 575, w: 3100 }, depth: -0.1, z: 1, fade: true },
      { img: 'fields', desk: { x: 800, y: 745, w: 1800 }, phone: { x: 420, y: 1270, w: 3100 }, depth: -0.06, z: 1 },
      { img: 'pump-house', alt: 'A small pump house with a rusty tin roof at the edge of the fields', desk: { x: 1075, y: 540, w: 160 }, phone: { x: 770, y: 905, w: 170 }, depth: -0.03, z: 2 },
      { img: 'palm-b', desk: { x: 40, y: 830, w: 190 }, depth: 0.03, z: 2, ax: 0.45, ay: 0.98, motion: 'sway-slow' },
      { img: 'palm-a', desk: { x: 1610, y: 700, w: 330 }, phone: { x: 975, y: 1190, w: 320 }, depth: 0.05, z: 3, ax: 0.54, ay: 0.98, motion: 'sway-slow' },
      { img: 'bund', desk: { x: 1080, y: 840, w: 1250, r: -4 }, phone: { x: 640, y: 1450, w: 1500, r: -4 }, depth: 0.04, z: 3 },
      { img: 'rice-water', desk: { x: 800, y: 905, w: 1760 }, phone: { x: 500, y: 1580, w: 2100 }, depth: 0.1, z: 5 },
      { img: 'turned-soil', alt: 'A patch of freshly turned wet soil', desk: { x: 905, y: 875, w: 540 }, phone: { x: 520, y: 1505, w: 620 }, depth: 0.15, z: 6 },
      { img: 'photo-print', alt: 'An old photo print of monsoon clouds over paddy fields', desk: { x: 1225, y: 245, w: 290, r: 5 }, depth: 0.3, z: 14, extra: 'tape' },
      { img: 'rice-stalk', alt: 'A pressed stalk of ripe rice', desk: { x: 1385, y: 330, w: 160, r: 18 }, depth: 0.32, z: 15 },
      { img: 'seedling-bundles', alt: 'Bundles of rice seedlings tied with straw', desk: { x: 1430, y: 965, w: 500 }, phone: { x: 770, y: 1710, w: 500 }, depth: 0.5, z: 17 },
      { img: 'pot-and-tiffin', alt: 'A brass water pot and a steel tiffin carrier', desk: { x: 1180, y: 900, w: 200 }, phone: { x: 300, y: 1655, w: 220 }, depth: 0.42, z: 16 },
      { img: 'slippers', alt: 'A worn pair of blue slippers left on the bund', desk: { x: 330, y: 950, w: 120, r: -14 }, depth: 0.45, z: 16 },
      { img: 'spare-mammoty', alt: 'A mammoty, the broad-bladed hoe used to turn soil', desk: { x: 560, y: 960, w: 380, r: -12 }, phone: { x: 250, y: 1775, w: 380, r: -12 }, depth: 0.5, z: 18 },
      { img: 'rice-leaves', desk: { x: 70, y: 1015, w: 380 }, phone: { x: 40, y: 1810, w: 360 }, depth: 0.6, z: 20, ax: 0.45, ay: 0.95, motion: 'sway' },
    ],
    placeholder: { caption: 'Photo to come: one of our farmers at work.', desk: { x: 905, y: 640, w: 215, r: 4 }, phone: { x: 520, y: 1215, w: 290, r: 4 }, depth: 0.15, z: 7 },
    notes: [
      { text: 'Every season begins the same way: hands, a mammoty and the soil.', desk: { x: 305, y: 775, w: 330, r: -2 }, phone: { x: 385, y: 850, w: 500, r: -2 } },
      { text: 'Farmers have read this land for generations.', desk: { x: 1290, y: 452, w: 300, r: 2 } },
    ],
    egret: { kind: 'perch', desk: { x: 560, y: 712, w: 104 }, phone: { x: 830, y: 1370, w: 125 }, depth: 0.06, z: 4, water: true },
    glints: [[260, 640], [430, 690], [690, 655], [330, 735], [780, 700]],
  },
  {
    id: 'hard',
    label: 'The hard parts',
    heading: 'The land doesn’t make it *easy*',
    level: 2,
    theme: 'dark',
    rain: true,
    pieces: [
      page('storm', 40),
      { img: 'cracked-soil', alt: 'Dry, cracked soil with a dead seedling', desk: { x: 1110, y: 850, w: 760 }, phone: { x: 560, y: 1520, w: 900 }, depth: 0.2, z: 6 },
      { img: 'bitten-leaf', alt: 'A leaf with holes eaten through it', desk: { x: 1150, y: 640, w: 560, r: -8 }, phone: { x: 560, y: 1285, w: 640, r: -8 }, depth: 0.35, z: 8 },
      { img: 'caterpillar', alt: 'A caterpillar on the leaf', desk: { x: 1065, y: 598, w: 120, r: -14 }, phone: { x: 465, y: 1240, w: 140, r: -14 }, depth: 0.35, z: 9, motion: 'crawl' },
    ],
    price: { title: 'Price per kg', was: ['₹40', '₹31'], now: '₹22', desk: { x: 1440, y: 0, w: 190, str: 150 } },
    notes: [
      { text: 'Too much rain, or too little.', desk: { x: 1010, y: 235, w: 290, r: -2 } },
      { text: 'Pests that eat a season’s work.', desk: { x: 520, y: 870, w: 300, r: 1.5 }, phone: { x: 385, y: 870, w: 480, r: 1.5 } },
      { text: 'Prices that change overnight.', desk: { x: 1440, y: 470, w: 250, r: -1.5 } },
    ],
    egret: { kind: 'glide', desk: { x: 600, y: 660, w: 210 }, phone: { x: 680, y: 1020, w: 250 }, depth: 0.1, z: 12 },
  },
  {
    id: 'tools',
    label: 'New tools',
    heading: 'New tools that *listen* to the land',
    level: 2,
    theme: 'dark',
    pieces: [
      page('aerial-paddy', 560),
      { img: 'polyhouse', alt: 'A polyhouse, a greenhouse covered in plastic sheet', desk: { x: 1190, y: 800, w: 430 }, phone: { x: 640, y: 1440, w: 520 }, depth: 0.12, z: 4 },
      { img: 'drone', alt: 'A farm drone flying over the fields', desk: { x: 1110, y: 370, w: 600 }, phone: { x: 560, y: 1040, w: 640 }, depth: 0.3, z: 10, motion: 'hover', extra: 'scan' },
      { img: 'soil-sensor', alt: 'A soil sensor pushed into the ground', desk: { x: 860, y: 830, w: 170 }, phone: { x: 225, y: 1510, w: 180 }, depth: 0.45, z: 12, extra: 'sensor' },
      { img: 'drip-line', alt: 'A drip irrigation line over the soil', desk: { x: 1230, y: 955, w: 520 }, phone: { x: 600, y: 1750, w: 640 }, depth: 0.5, z: 13 },
      { img: 'phone', alt: 'A phone showing a reading from the field', desk: { x: 1450, y: 720, w: 180, r: 8 }, phone: { x: 790, y: 1505, w: 200, r: 8 }, depth: 0.5, z: 14, extra: 'screen' },
    ],
    notes: [
      { text: 'A drone sees the whole field in minutes.', desk: { x: 1340, y: 128, w: 300, r: 2 } },
      { text: 'A sensor checks the soil every hour.', desk: { x: 560, y: 885, w: 290, r: -2 }, phone: { x: 385, y: 770, w: 480, r: -2 } },
    ],
    egret: { kind: 'glide', desk: { x: 560, y: 690, w: 200 }, phone: { x: 770, y: 770, w: 210 }, depth: 0.1, z: 12 },
  },
  {
    id: 'together',
    label: 'Together',
    heading: 'Old knowledge. New tools. *The same field.*',
    level: 2,
    theme: 'light',
    pieces: [
      page('together-bank', 760),
      { img: 'tea', alt: 'Two glasses of tea on a tree stump', desk: { x: 815, y: 882, w: 330 }, phone: { x: 300, y: 1650, w: 360 }, depth: 0.45, z: 12 },
      { img: 'notebook', alt: 'An open notebook with a hand-drawn map of the fields', desk: { x: 1390, y: 870, w: 380, r: 7 }, phone: { x: 720, y: 1665, w: 400, r: 7 }, depth: 0.5, z: 13 },
    ],
    placeholder: { caption: 'Photo to come: our farmer and engineer, side by side.', desk: { x: 1110, y: 590, w: 255, r: -3 }, phone: { x: 520, y: 1230, w: 330, r: -3 }, depth: 0.2, z: 8 },
    notes: [{ text: 'We don’t replace the farmer. We stand beside them.', desk: { x: 330, y: 805, w: 360, r: -2 }, phone: { x: 385, y: 860, w: 500, r: -2 } }],
    egret: { kind: 'perch', desk: { x: 1480, y: 650, w: 80 }, phone: { x: 855, y: 1450, w: 105 }, depth: 0.05, z: 4, facing: -1 },
  },
  {
    id: 'grows',
    label: 'What grows',
    heading: 'What *grows*',
    level: 2,
    theme: 'dark',
    pieces: [
      page('grows-table', 500),
      { img: 'lettuce-leaf', desk: { x: 1440, y: 385, w: 260, r: -20 }, phone: { x: 820, y: 930, w: 240, r: -20 }, depth: 0.3, z: 5, motion: 'drift' },
      { img: 'crate', desk: { x: 1090, y: 820, w: 520 }, phone: { x: 520, y: 1490, w: 640 }, depth: 0.3, z: 6 },
      { img: 'lettuce', alt: 'Heads of green lettuce', desk: { x: 1010, y: 700, w: 360 }, phone: { x: 420, y: 1340, w: 440 }, depth: 0.3, z: 7 },
      { img: 'kale', alt: 'A bunch of kale', desk: { x: 1190, y: 690, w: 340, r: 6 }, phone: { x: 640, y: 1330, w: 420, r: 6 }, depth: 0.3, z: 8 },
      { img: 'crate-front', desk: { x: 1090, y: 820, w: 520 }, phone: { x: 520, y: 1490, w: 640 }, depth: 0.3, z: 9 },
      { img: 'cucumbers', alt: 'Cucumbers, one of them sliced', desk: { x: 1430, y: 890, w: 320, r: -6 }, phone: { x: 805, y: 1715, w: 320, r: -6 }, depth: 0.45, z: 10 },
      { img: 'seed-packet', alt: 'A paper packet of lettuce seeds', desk: { x: 720, y: 860, w: 170, r: -12 }, phone: { x: 170, y: 1670, w: 190, r: -12 }, depth: 0.45, z: 10 },
    ],
    notes: [
      { text: 'Lettuce, kale and cucumber, picked fresh.', desk: { x: 360, y: 805, w: 360, r: -2 }, phone: { x: 385, y: 860, w: 480, r: -2 } },
      { text: 'More crops are on the way.', desk: { x: 1360, y: 205, w: 270, r: 3 } },
    ],
    egret: { kind: 'glide', desk: { x: 990, y: 440, w: 190 }, phone: { x: 420, y: 1080, w: 220 }, depth: 0.1, z: 12 },
  },
  {
    id: 'plate',
    label: 'To your plate',
    heading: 'From our field to *your plate*',
    level: 2,
    lead: 'Seed to fork.',
    link: { text: 'Where to buy', href: '/where-to-buy/' },
    theme: 'dark',
    pieces: [
      page('plate-lane', 640),
      { img: 'shop', alt: 'A small roadside shop with vegetables on the counter', desk: { x: 1160, y: 500, w: 500 }, phone: { x: 620, y: 1175, w: 560 }, depth: 0.12, z: 5 },
      { img: 'goods-auto', alt: 'A goods auto carrying crates of vegetables', desk: { x: 560, y: 770, w: 420 }, phone: { x: 300, y: 1505, w: 460 }, depth: 0.3, z: 8, extra: 'wheels' },
      { img: 'plate-salad', alt: 'A plate of salad with lettuce, kale and cucumber', desk: { x: 1390, y: 840, w: 420, r: 6 }, phone: { x: 785, y: 1670, w: 400, r: 6 }, depth: 0.5, z: 12 },
    ],
    notes: [{ text: 'Find our vegetables at shops near you.', desk: { x: 1365, y: 228, w: 270, r: 2 }, phone: { x: 385, y: 840, w: 480, r: 2 } }],
    egret: { kind: 'perch', desk: { x: 1175, y: 356, w: 92 }, phone: { x: 735, y: 1005, w: 100 }, depth: 0.12, z: 4, facing: -1 },
  },
  {
    id: 'wayin',
    label: 'Way in',
    heading: 'Find your *way in*',
    level: 2,
    lead: 'Whether you’re buying vegetables, farming, or running a farm business, start here.',
    theme: 'light',
    pieces: [page('closing-fields', 420, 493)],
    notes: [],
    ways: [
      { kicker: 'For households', text: 'I want fresh vegetables', go: 'Our produce', href: '/produce/', desk: { x: 905, y: 0, w: 230, str: 470, r: 1.5 }, phone: { x: 330, y: 0, w: 300, str: 880, r: 1 } },
      { kicker: 'For farmers', text: 'I’m a farmer', go: 'For farmers', href: '/for-farmers/', desk: { x: 1175, y: 0, w: 230, str: 600, r: 0 }, phone: { x: 680, y: 0, w: 300, str: 1110, r: -1 } },
      { kicker: 'For farm businesses', text: 'I run a farm business', go: 'Farm software', href: '/farm-software/', desk: { x: 1445, y: 0, w: 230, str: 500, r: -1.5 }, phone: { x: 330, y: 0, w: 300, str: 1340, r: 1 } },
    ],
    egret: { kind: 'perch', desk: { x: 520, y: 858, w: 150 }, phone: { x: 720, y: 1720, w: 160 }, depth: 0.2, z: 6, water: true },
  },
];

export const mediaFor = (id: MediaId) => media[id] as { aspect: number; files: { w: number; file: string }[]; wheels?: { file: string; x: number; y: number; d: number }[] };
