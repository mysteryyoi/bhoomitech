export const color = {
  'soil-950': '#0B100B',
  'soil-900': '#101610',
  'soil-800': '#172218',
  'soil-700': '#202B1B',
  'line-700': '#30382E',
  'line-600': '#495143',
  'moss-600': '#294A20',
  'leaf-500': '#629E36',
  'lime-400': '#B8ED79',
  'lime-200': '#E2FFB0',
  'ink-50': '#F3F5EB',
  'ink-400': '#A1AAA0',
  'ink-700': '#4A5446',
  'husk-100': '#F2EEE3',
  'husk-200': '#E6E0D0',
  'fern-700': '#3A6B22',
  'sun-400': '#F2B544',
  'water-400': '#7CC8D8',
  'clay-500': '#D1683A',
  'loam-800': '#2B2219',
  'loam-600': '#4A3A2A',
} as const;

export type ColorToken = keyof typeof color;

export interface TextPair {
  fg: ColorToken;
  bg: ColorToken;
  min: number;
  use: string;
}

export const TEXT_PAIRS: TextPair[] = [
  { fg: 'ink-50', bg: 'soil-900', min: 4.5, use: 'body on dark' },
  { fg: 'ink-400', bg: 'soil-900', min: 4.5, use: 'secondary on dark' },
  { fg: 'ink-400', bg: 'soil-800', min: 4.5, use: 'secondary on cards' },
  { fg: 'lime-400', bg: 'soil-900', min: 4.5, use: 'signal text and links on dark' },
  { fg: 'soil-900', bg: 'lime-400', min: 4.5, use: 'primary button label' },
  { fg: 'leaf-500', bg: 'soil-900', min: 4.5, use: 'secondary green on dark' },
  { fg: 'soil-900', bg: 'husk-100', min: 4.5, use: 'body on daylight' },
  { fg: 'ink-700', bg: 'husk-100', min: 4.5, use: 'secondary on daylight' },
  { fg: 'fern-700', bg: 'husk-100', min: 4.5, use: 'links on daylight' },
  { fg: 'clay-500', bg: 'soil-900', min: 4.5, use: 'alerts in data UI' },
];

/** Lime is never text on cream (master plan §4). */
export const FORBIDDEN_TEXT_PAIRS: { fg: ColorToken; bg: ColorToken }[] = [
  { fg: 'lime-400', bg: 'husk-100' },
  { fg: 'sun-400', bg: 'husk-100' },
];
