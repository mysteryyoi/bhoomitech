// The homepage scrapbook: what is on each spread and where it sits.
// Desktop boxes use a 2400 × 1500 stage; phone boxes use a 1000 × 1600 stage (see docs/plan/07-home-scrapbook.md).
// A piece without a phone box is left out on phones.

export interface Box {
  x: number;
  y: number;
  w: number;
}

export interface Piece {
  /** Asset ID from the asset list, e.g. H1.1. */
  id: string;
  /** File name without extension, shared by the .riv and the .svg still. */
  file: string;
  /** Artboard size in pixels. */
  size: [number, number];
  /** True when the piece moves (has a .riv); false for a still. */
  rive: boolean;
  /** Which Rive control the page drives. */
  control?: 'scroll' | 'tap' | 'drive';
  /** Short description for screen readers; empty when the piece is decoration only. */
  alt: string;
  /** Visible hint and button label for pieces that react to a tap. */
  tapLabel?: string;
  desk: Box;
  phone?: Box;
  /** Parallax depth: negative is far away (moves slower), positive is near (moves faster). */
  depth: number;
  /** Resting tilt in degrees. */
  tilt?: number;
}

export interface Note {
  text: string;
  desk: Box;
  phone?: Box;
  tilt?: number;
}

/** A paper price tag on a string, drawn in code. The figures are illustrative, not real prices. */
export interface PriceTag {
  title: string;
  /** Earlier figures, shown struck through. */
  was: string[];
  now: string;
  desk: Box;
  phone?: Box;
  depth: number;
}

/** A link pinned to a spread. */
export interface PinnedLink {
  text: string;
  href: string;
  desk: Box;
  phone?: Box;
}

/** A dashed route that draws itself as the spread arrives. Paths use the stage grids. */
export interface Route {
  desk: string;
  phone: string;
}

/** One of the closing tags: a way in for each kind of visitor. */
export interface WayTag {
  kicker: string;
  text: string;
  go: string;
  href: string;
  desk: Box;
  phone: Box;
  /** String length on the desktop stage grid. */
  string: number;
  tilt: number;
}

export interface Spread {
  id: string;
  /** Short label for the chapter rail. */
  label: string;
  heading: string;
  /** The cover uses the page's h1; every other spread uses an h2. */
  level: 1 | 2;
  lead?: string;
  cue?: string;
  text: { desk: Box; phone: Box };
  pieces: Piece[];
  notes: Note[];
  tags?: PriceTag[];
  links?: PinnedLink[];
  route?: Route;
  ways?: WayTag[];
}

export const spreads: Spread[] = [
  {
    id: 'cover',
    label: 'Bhoomi',
    heading: 'भूमि means land.',
    level: 1,
    lead: 'Bhoomi Tech grows food and builds farm technology, side by side with farmers.',
    cue: 'Scroll to walk the field',
    text: { desk: { x: 170, y: 330, w: 980 }, phone: { x: 70, y: 110, w: 860 } },
    pieces: [
      {
        id: 'H0.2', file: 'H0.2-soil-clods', size: [480, 260], rive: false, alt: '',
        desk: { x: 230, y: 1080, w: 520 }, phone: { x: 520, y: 1300, w: 430 }, depth: 0.25, tilt: -4,
      },
      {
        id: 'H0.1', file: 'H0.1-hands-with-a-seedling', size: [600, 420], rive: true, control: 'scroll',
        alt: 'Two hands cupping soil, with a seedling growing from it.',
        desk: { x: 1190, y: 330, w: 1080 }, phone: { x: 40, y: 700, w: 920 }, depth: 0.1, tilt: 2,
      },
    ],
    notes: [],
  },
  {
    id: 'land',
    label: 'The land',
    heading: 'It starts with the land',
    level: 2,
    text: { desk: { x: 150, y: 120, w: 900 }, phone: { x: 70, y: 70, w: 860 } },
    pieces: [
      {
        id: 'H1.4', file: 'H1.4-morning-sun', size: [460, 320], rive: false, alt: '',
        desk: { x: 1640, y: 70, w: 560 }, phone: { x: 600, y: 230, w: 380 }, depth: -0.35, tilt: 0,
      },
      {
        id: 'H1.6', file: 'H1.6-coconut-palms', size: [500, 380], rive: false, alt: '',
        desk: { x: 1830, y: 300, w: 560 }, depth: -0.2, tilt: 0,
      },
      {
        id: 'H1.2', file: 'H1.2-paddy-strip', size: [760, 325], rive: true,
        alt: 'Rows of young rice in a flooded paddy field.',
        desk: { x: 760, y: 760, w: 1640 }, phone: { x: -60, y: 930, w: 1120 }, depth: -0.05, tilt: 0,
      },
      {
        id: 'H1.3', file: 'H1.3-egret', size: [420, 320], rive: true, control: 'tap',
        alt: 'A white egret wading in the paddy.', tapLabel: 'Tap the egret',
        desk: { x: 1380, y: 700, w: 400 }, phone: { x: 640, y: 830, w: 320 }, depth: 0.05, tilt: 0,
      },
      {
        id: 'H1.1', file: 'H1.1-farmer-with-mammoty', size: [600, 400], rive: true, control: 'tap',
        alt: 'A farmer in a white mundu and a towel tied round his head, turning the soil with a mammoty.',
        tapLabel: 'Tap the farmer',
        desk: { x: 330, y: 610, w: 1020 }, phone: { x: -20, y: 560, w: 820 }, depth: 0.3, tilt: 0,
      },
    ],
    notes: [
      { text: 'Every season begins the same way: hands, a mammoty and the soil.', desk: { x: 170, y: 340, w: 640 }, phone: { x: 70, y: 260, w: 520 }, tilt: -2 },
      { text: 'Farmers have read this land for generations.', desk: { x: 1150, y: 420, w: 520 }, phone: { x: 380, y: 1440, w: 560 }, tilt: 2.5 },
    ],
  },
  {
    id: 'hard',
    label: 'The hard parts',
    heading: 'The land doesn’t make it easy',
    level: 2,
    text: { desk: { x: 150, y: 120, w: 760 }, phone: { x: 70, y: 70, w: 860 } },
    pieces: [
      {
        id: 'H2.1', file: 'H2.1-rain-cloud', size: [550, 360], rive: true, control: 'scroll',
        alt: 'A heavy rain cloud, the rain getting harder.',
        desk: { x: 880, y: 60, w: 720 }, phone: { x: 430, y: 250, w: 550 }, depth: -0.15, tilt: 0,
      },
      {
        id: 'H2.2', file: 'H2.2-cracked-soil', size: [600, 355], rive: false,
        alt: 'Dry, cracked earth with one wilted seedling.',
        desk: { x: 1480, y: 760, w: 820 }, phone: { x: 330, y: 760, w: 650 }, depth: 0.12, tilt: 2,
      },
      {
        id: 'H2.3', file: 'H2.3-leaf-with-a-caterpillar', size: [530, 360], rive: true,
        alt: 'A leaf full of bite holes, with a caterpillar crawling along it.',
        desk: { x: 330, y: 740, w: 760 }, phone: { x: 10, y: 1080, w: 560 }, depth: 0.28, tilt: -6,
      },
    ],
    tags: [
      {
        title: 'Price per kg', was: ['₹40', '₹31'], now: '₹22',
        desk: { x: 1760, y: 120, w: 300 }, phone: { x: 60, y: 440, w: 290 }, depth: 0.2,
      },
    ],
    notes: [
      { text: 'Too much rain, or too little.', desk: { x: 170, y: 390, w: 520 }, phone: { x: 70, y: 300, w: 380 }, tilt: -2 },
      { text: 'Pests that eat a season’s work.', desk: { x: 1000, y: 1060, w: 440 }, phone: { x: 470, y: 1420, w: 500 }, tilt: 2 },
      { text: 'Prices that change overnight.', desk: { x: 1700, y: 560, w: 520 }, phone: { x: 30, y: 930, w: 360 }, tilt: -1.5 },
    ],
  },
  {
    id: 'tools',
    label: 'New tools',
    heading: 'New tools that listen to the land',
    level: 2,
    text: { desk: { x: 150, y: 120, w: 820 }, phone: { x: 70, y: 70, w: 860 } },
    pieces: [
      {
        id: 'H3.5', file: 'H3.5-polyhouse', size: [650, 402], rive: false,
        alt: 'A polyhouse: curved hoops covered in clear film, with plants inside.',
        desk: { x: 1760, y: 500, w: 600 }, depth: -0.25, tilt: 0,
      },
      {
        id: 'H3.2', file: 'H3.2-field-from-above', size: [650, 365], rive: true,
        alt: 'Paddy fields seen from above, with a scan passing over them.',
        desk: { x: 860, y: 660, w: 940 }, phone: { x: 40, y: 700, w: 920 }, depth: -0.08, tilt: -2,
      },
      {
        id: 'H3.1', file: 'H3.1-drone', size: [620, 430], rive: true, control: 'scroll',
        alt: 'A farm drone hovering, its scan beam sweeping the field below.',
        desk: { x: 990, y: 110, w: 760 }, phone: { x: 300, y: 330, w: 680 }, depth: 0.2, tilt: 0,
      },
      {
        id: 'H3.4', file: 'H3.4-phone-with-the-app', size: [420, 410], rive: true,
        alt: 'A phone showing a simple farm app with a gauge and a field map.',
        desk: { x: 400, y: 720, w: 430 }, phone: { x: 30, y: 1150, w: 380 }, depth: 0.32, tilt: -5,
      },
      {
        id: 'H3.3', file: 'H3.3-soil-sensor', size: [420, 390], rive: true,
        alt: 'A soil sensor in the ground, its light blinking.',
        desk: { x: 1860, y: 930, w: 440 }, phone: { x: 610, y: 1160, w: 360 }, depth: 0.15, tilt: 0,
      },
      {
        id: 'H3.6', file: 'H3.6-drip-line', size: [470, 320], rive: true,
        alt: 'A drip line on the soil, letting out one drop at a time.',
        desk: { x: 1060, y: 1010, w: 540 }, depth: 0.22, tilt: 1.5,
      },
    ],
    notes: [
      { text: 'A drone sees the whole field in minutes.', desk: { x: 170, y: 390, w: 560 }, phone: { x: 70, y: 380, w: 400 }, tilt: -2 },
      { text: 'A sensor checks the soil every hour.', desk: { x: 1820, y: 1330, w: 500 }, tilt: 2 },
      { text: 'The farmer gets the answer on their phone.', desk: { x: 170, y: 1230, w: 560 }, phone: { x: 380, y: 1450, w: 580 }, tilt: 1.5 },
    ],
  },
  {
    id: 'together',
    label: 'Together',
    heading: 'Old knowledge. New tools. The same field.',
    level: 2,
    text: { desk: { x: 150, y: 140, w: 760 }, phone: { x: 70, y: 70, w: 860 } },
    pieces: [
      {
        id: 'H4.1', file: 'H4.1-engineer-and-farmer', size: [640, 410], rive: true, control: 'scroll',
        alt: 'An engineer rests his hand on a farmer’s shoulder as they look out over the field together.',
        desk: { x: 780, y: 170, w: 1560 }, phone: { x: -20, y: 420, w: 1040 }, depth: 0.08, tilt: 0,
      },
      {
        id: 'H4.2', file: 'H4.2-two-glasses-of-tea', size: [510, 358], rive: true,
        alt: 'Two glasses of tea on a stone, steaming.',
        desk: { x: 400, y: 1010, w: 480 }, phone: { x: 560, y: 1200, w: 400 }, depth: 0.3, tilt: -3,
      },
      {
        id: 'H4.3', file: 'H4.3-notebook', size: [545, 335], rive: false, alt: '',
        desk: { x: 1900, y: 1110, w: 460 }, depth: 0.22, tilt: 5,
      },
    ],
    notes: [
      { text: 'We don’t replace the farmer. We stand beside them.', desk: { x: 170, y: 560, w: 600 }, phone: { x: 70, y: 1130, w: 460 }, tilt: -2 },
    ],
  },
  {
    id: 'grows',
    label: 'What grows',
    heading: 'What grows',
    level: 2,
    text: { desk: { x: 150, y: 120, w: 760 }, phone: { x: 70, y: 70, w: 860 } },
    pieces: [
      {
        id: 'H5.5', file: 'H5.5-seed-packet', size: [360, 440], rive: false, alt: '',
        desk: { x: 1930, y: 90, w: 300 }, phone: { x: 700, y: 150, w: 250 }, depth: -0.15, tilt: 8,
      },
      {
        id: 'H5.4', file: 'H5.4-harvest-crate', size: [520, 350], rive: false, alt: 'A wooden harvest crate.',
        desk: { x: 860, y: 840, w: 760 }, phone: { x: 120, y: 900, w: 760 }, depth: 0, tilt: 0,
      },
      {
        id: 'H5.1', file: 'H5.1-lettuce', size: [515, 410], rive: true, alt: 'A fresh head of lettuce.',
        desk: { x: 240, y: 520, w: 640 }, phone: { x: -10, y: 400, w: 560 }, depth: 0.18, tilt: -3,
      },
      {
        id: 'H5.2', file: 'H5.2-kale', size: [510, 420], rive: true, alt: 'A bunch of curly kale.',
        desk: { x: 1560, y: 470, w: 620 }, phone: { x: 450, y: 450, w: 550 }, depth: 0.12, tilt: 3,
      },
      {
        id: 'H5.3', file: 'H5.3-cucumbers', size: [590, 389], rive: false, alt: 'Two cucumbers and a few slices.',
        desk: { x: 520, y: 1060, w: 560 }, phone: { x: 0, y: 1170, w: 480 }, depth: 0.3, tilt: -4,
      },
      {
        id: 'H5.6', file: 'H5.6-water-drop', size: [475, 380], rive: true, alt: '',
        desk: { x: 1720, y: 1020, w: 500 }, depth: 0.25, tilt: 4,
      },
    ],
    notes: [
      { text: 'Lettuce, kale and cucumber, picked fresh.', desk: { x: 170, y: 330, w: 600 }, phone: { x: 70, y: 200, w: 580 }, tilt: -2 },
      { text: 'More crops are on the way.', desk: { x: 1520, y: 290, w: 380 }, phone: { x: 520, y: 1430, w: 440 }, tilt: 3 },
    ],
  },
  {
    id: 'plate',
    label: 'To your plate',
    heading: 'From our field to your plate',
    level: 2,
    text: { desk: { x: 150, y: 120, w: 820 }, phone: { x: 70, y: 70, w: 860 } },
    pieces: [
      {
        id: 'H6.2', file: 'H6.2-shop-counter', size: [670, 465], rive: false, alt: 'A small shop counter with baskets of vegetables.',
        desk: { x: 1290, y: 300, w: 720 }, phone: { x: 400, y: 800, w: 580 }, depth: -0.1, tilt: 2,
      },
      {
        id: 'H6.1', file: 'H6.1-goods-auto', size: [820, 355], rive: true, control: 'drive',
        alt: 'A three-wheeled goods auto carrying crates of vegetables.',
        desk: { x: 90, y: 660, w: 1120 }, phone: { x: -60, y: 380, w: 1120 }, depth: 0.2, tilt: 0,
      },
      {
        id: 'H6.3', file: 'H6.3-plate-of-salad', size: [620, 465], rive: false, alt: 'A plate of fresh salad with a fork.',
        desk: { x: 1600, y: 920, w: 600 }, phone: { x: 20, y: 1040, w: 440 }, depth: 0.25, tilt: -3,
      },
    ],
    notes: [
      { text: 'Seed to fork.', desk: { x: 170, y: 400, w: 360 }, phone: { x: 70, y: 290, w: 360 }, tilt: -2 },
      { text: 'Find our vegetables at shops near you.', desk: { x: 860, y: 1130, w: 560 }, phone: { x: 470, y: 1250, w: 480 }, tilt: 1.5 },
    ],
    links: [
      { text: 'Where to buy', href: '/where-to-buy/', desk: { x: 900, y: 1320, w: 340 }, phone: { x: 520, y: 1450, w: 400 } },
    ],
    route: {
      desk: 'M 700 760 C 900 560 1180 520 1380 600 S 1640 860 1760 960',
      phone: 'M 560 560 C 760 640 820 780 700 880 S 360 980 260 1060',
    },
  },
  {
    id: 'wayin',
    label: 'Way in',
    heading: 'Find your way in',
    level: 2,
    lead: 'Whether you’re buying vegetables, farming, or running a farm business, start here.',
    text: { desk: { x: 150, y: 420, w: 640 }, phone: { x: 70, y: 70, w: 860 } },
    pieces: [],
    notes: [],
    ways: [
      {
        kicker: 'For households', text: 'I want fresh vegetables', go: 'Our produce', href: '/produce/',
        desk: { x: 930, y: 0, w: 400 }, phone: { x: 70, y: 400, w: 540 }, string: 300, tilt: -3,
      },
      {
        kicker: 'For farmers', text: 'I’m a farmer', go: 'For farmers', href: '/for-farmers/',
        desk: { x: 1420, y: 0, w: 400 }, phone: { x: 400, y: 780, w: 540 }, string: 520, tilt: 2,
      },
      {
        kicker: 'For farm businesses', text: 'I run a farm business', go: 'Farm software', href: '/farm-software/',
        desk: { x: 1910, y: 0, w: 400 }, phone: { x: 70, y: 1160, w: 540 }, string: 220, tilt: -1.5,
      },
    ],
  },
];
