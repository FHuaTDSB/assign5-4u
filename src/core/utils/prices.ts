export const findPrice = (release_date: string) => {
  const year = Number(release_date.slice(0, release_date.indexOf("-")));
  return Math.max(year - 2007, 4);
};
