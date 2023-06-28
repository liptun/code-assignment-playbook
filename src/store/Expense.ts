import { makeAutoObservable } from "mobx";
import { v4 as uuid } from "uuid";
import { Dinero } from "dinero.js";

import type { ExpenseSchema } from "./types";
import Currency from "../utils/Currency";

class Expense {
  id: string;
  title: string;
  amount: Dinero;
  conversionRate: number = 1;

  constructor(expense: ExpenseSchema, conversionRate: number = 1) {
    makeAutoObservable(this);

    this.id = uuid();
    this.title = expense.title;
    this.amount = Currency(parseInt(expense.amount.replaceAll(".", "")));
    this.setConversionRate(conversionRate);
  }

  setConversionRate(rate: number) {
    this.conversionRate = rate;
  }

  getAmountPln() {
    return this.amount;
  }

  getAmountEur() {
    return this.amount.divide(this.conversionRate);
  }
}

export default Expense;
