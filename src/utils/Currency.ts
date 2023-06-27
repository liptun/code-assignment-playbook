import DineroFactory from "dinero.js";
import type { Dinero } from "dinero.js";

DineroFactory.defaultCurrency = "PLN";
DineroFactory.defaultPrecision = 2;
const Currency = (amount: number, options: DineroFactory.Options = {}) =>
  DineroFactory({ amount, ...options });

export default Currency;

export const displayCurrency = (currency: Dinero) => {
  const format = currency.hasSubUnits() ? "0.00" : "0";
  return currency.setLocale("en-US").toFormat(format);
};
