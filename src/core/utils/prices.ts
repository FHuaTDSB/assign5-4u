export const findPrice = (release_date: string) => {
  const year = release_date.slice(0, release_date.indexOf("-")) as unknown as number;
  return Math.max(year - 2007, 4);
};
