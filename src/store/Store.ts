import { makeAutoObservable } from "mobx";
import Currency from "../utils/Currency";
import Expense from "./Expense";
import type { ExpenseSchema } from "./types";

class Store {
  expenses: Expense[] = [];
  conversionRate = 1;

  constructor(initialExpenses: ExpenseSchema[] = [], initialRate = 4.382) {
    makeAutoObservable(this);
    this.conversionRate = initialRate;
    initialExpenses.forEach((expense) => {
      this.addExpense(expense);
    });
  }

  setConversionRate(newConversionRate: number) {
    this.conversionRate = newConversionRate;
    this.expenses.forEach((expense) =>
      expense.setConversionRate(this.conversionRate)
    );
  }

  addExpense(expense: ExpenseSchema) {
    this.expenses.push(new Expense(expense, this.conversionRate));
  }

  deleteExpense(idToRemove: string) {
    this.expenses = this.expenses.filter(
      (expense) => expense.id !== idToRemove
    );
  }

  getTotal() {
    return this.expenses.reduce((acc, curr) => {
      return acc.add(curr.getAmountPln());
    }, Currency(0));
  }

  getTotalEuro() {
    return this.expenses.reduce((acc, curr) => {
      return acc.add(curr.getAmountEur());
    }, Currency(0));
  }
}

export default Store;
