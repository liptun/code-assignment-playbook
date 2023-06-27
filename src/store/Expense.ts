import { makeAutoObservable } from "mobx";
import { Dinero } from "dinero.js";
import Currency from "../utils/Currency";
import type { ExpenseSchema } from "./types";
import { v4 as uuid } from "uuid";

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
