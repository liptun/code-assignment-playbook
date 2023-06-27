import { Dinero } from "dinero.js";
import Currency from "../utils/Currency";
import type { ExpenseSchema } from "./types";
import { v4 as uuid } from "uuid";

class Expense {
  id: string;
  title: string;
  amount: Dinero;
  eurPlnRate: number = 1;

  constructor(expense: ExpenseSchema, conversionRate: number = 1) {
    this.id = uuid();
    this.title = expense.title;
    this.amount = Currency(parseInt(expense.amount.replaceAll(".", "")));
    this.setConversionRate(conversionRate);
  }

  setConversionRate(rate: number) {
    this.eurPlnRate = rate;
  }

  getAmountPln() {
    return this.amount;
  }

  getAmountEur() {
    return this.amount.divide(this.eurPlnRate, "DOWN");
  }
}

export default Expense;
