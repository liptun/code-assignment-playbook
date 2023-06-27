import { makeAutoObservable } from "mobx";
import { mockTransactions } from "./mockData";

export type Transaction = {
  title: string;
  amount: number;
};

class Store {
  transactions: Transaction[] = [];
  constructor(transactions: Transaction[] = []) {
    makeAutoObservable(this);
    this.transactions = transactions;
  }
}
const store = new Store(mockTransactions);

export default store;
