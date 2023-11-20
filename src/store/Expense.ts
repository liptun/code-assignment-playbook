import { computed, makeAutoObservable } from "mobx";
import { v4 as uuid } from "uuid";
import { Dinero } from "dinero.js";

import type { ExpenseSchema } from "./types";
import Currency from "../utils/Currency";
import Store from "./Store";

class Expense {
  id: string;
  title: string;
  amount: Dinero;

  constructor(
    expense: ExpenseSchema,
    private readonly store: Store
  ) {
    makeAutoObservable(this);

    this.id = uuid();
    this.title = expense.title;
    this.amount = Currency(parseInt(expense.amount.replaceAll(".", "")));
  }

  @computed public get amountPln() {
    return this.amount;
  }

  @computed private get conversion() {
    return this.amount.divide(this.store.conversionRate);
  }

  @computed public get isConversionFloatZero() {
    return parseFloat(this.conversion.toFormat("0.00")) === 0;
  }

  @computed public get amountEur() {
    return this.isConversionFloatZero ? Currency(1) : this.conversion;
  }
}

export default Expense;
