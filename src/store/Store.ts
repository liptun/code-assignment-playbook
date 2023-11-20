import { action, computed, configure, makeObservable, observable } from "mobx";
import Currency from "../utils/Currency";
import Expense from "./Expense";
import type { ExpenseSchema } from "./types";

configure({
  enforceActions: "observed",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
});

class Store {
  @observable public expenses: Expense[] = [];

  constructor(
    initialExpenses: ExpenseSchema[] = [],
    public conversionRate = 4.382
  ) {
    makeObservable(this);
    initialExpenses.forEach((expense) => {
      this.addExpense(expense);
    });
  }

  @action public setConversionRate(newConversionRate: number) {
    this.conversionRate = newConversionRate;
  }

  @action public addExpense(expense: ExpenseSchema) {
    this.expenses.push(new Expense(expense, this));
  }

  @action public deleteExpense(idToRemove: string) {
    this.expenses = this.expenses.filter(
      (expense) => expense.id !== idToRemove
    );
  }

  @computed public get total() {
    return this.expenses.reduce((acc, curr) => {
      return acc.add(curr.amountPln);
    }, Currency(0));
  }

  @computed public get totalEuro() {
    return this.expenses.reduce((acc, curr) => {
      return acc.add(curr.amountEur);
    }, Currency(0));
  }
}

export default Store;
