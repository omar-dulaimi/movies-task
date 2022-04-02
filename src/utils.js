export const createArrayFromRange = (min, max) =>
  Array.from({ length: max - min + 1 }, (_, i) => max - i);

export const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
