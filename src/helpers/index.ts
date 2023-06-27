export const countDecimalPlaces = (value: number) =>
  value.toString().indexOf(".") < 0
    ? 0
    : value.toString().split(".")[1].length;

export const cleanupString = (value: string) =>
  value.replace(/ {2,}/g, " ").trim();
