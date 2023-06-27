import { makeAutoObservable } from "mobx";
import Currency from "../utils/Currency";
import Expense from "./Expense";
import type { ExpenseSchema } from "./types";

class Store {
  expenses: Expense[] = [];
  eurPlnRate = 1;

  constructor(initialExpenses: ExpenseSchema[] = [], initialRate = 4.382) {
    makeAutoObservable(this);
    this.eurPlnRate = initialRate;
    initialExpenses.forEach((expense) => {
      this.addExpense(expense);
    });
  }

  addExpense(expense: ExpenseSchema) {
    this.expenses.push(new Expense(expense, this.eurPlnRate));
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
