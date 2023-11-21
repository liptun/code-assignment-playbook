import { action, computed, configure, makeObservable, observable } from "mobx";
import Currency from "../utils/Currency";
import type { ExpenseSchema } from "./types";
import ExpenseModel from "./ExpenseModel";

configure({
  enforceActions: "observed",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
});

class AppState {
  @observable public expenses: ExpenseModel[] = [];

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
    this.expenses.push(new ExpenseModel(expense, this));
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

export default AppState;
