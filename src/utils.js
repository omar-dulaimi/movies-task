export const createArrayFromRange = (min, max) =>
  Array.from({ length: max - min + 1 }, (_, i) => min + i);
