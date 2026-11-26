// Pattern attribute value; browsers compile it with the v flag, so `-` is escaped in classes.
export const INDIAN_MOBILE_PATTERN = '(?:\\+?91[ \\-]?|0)?[6-9][0-9]{4}[ \\-]?[0-9]{5}';

export const FARM_TYPES = ['Greenhouse', 'Polyhouse', 'Open field', 'Hydroponic', 'Vertical', 'Other', 'Not sure'] as const;

// [ASSUMED — confirm with owner], master plan Q8
export const FARMER_NEEDS = [
  'Water and irrigation',
  'Crop disease',
  'Soil and fertiliser',
  'Polyhouse or greenhouse setup',
  'Planning what to grow',
  'Selling produce',
] as const;

export const CALL_TIMES = ['Morning', 'Afternoon', 'Evening'] as const;
export const CALL_LANGUAGES = ['Hindi', 'English'] as const;
