export const formatCount = (
  count: number,
  prefix: string = "",
  suffix: string = "",
) => {
  if (count >= 1000) {
    return prefix + (count / 1000).toFixed(1) + "k" + suffix;
  }

  return prefix + count + suffix;
};
