import { action, makeObservable, observable } from "mobx";
import { ChangeEvent, FormEvent } from "react";
import { cleanupString, countDecimalPlaces, stringToFloat } from "../helpers";
import AppState from "../store/AppState";

export class AddExpenseFormState {
  @observable public title = "";
  @observable public amount = "";
  @observable public errors: Array<string> = [];
  constructor(private readonly store: AppState) {
    makeObservable(this);
  }

  public onChangeTitleHandle = (e: ChangeEvent<HTMLInputElement>) => {
    this.title = e.currentTarget.value;
  };

  public onChangeAmountHandle = (e: ChangeEvent<HTMLInputElement>) => {
    this.amount = e.currentTarget.value;
  };

  @action public onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: string[] = [];

    const newTitle = cleanupString(this.title);
    const newAmount = stringToFloat(this.amount);

    if (!newTitle) {
      errors.push("Title is required");
    }
    if (newTitle.length < 5) {
      errors.push("Title minimum lenght is 5 characters");
    }
    if (newTitle.length > 100) {
      errors.push("Be resonable and type shorter title");
    }
    if (!this.amount) {
      errors.push("Amount is required");
    }
    if (isNaN(newAmount)) {
      errors.push("Amount must to be a number");
    }
    if (newAmount <= 0) {
      errors.push("Amount must be greater than 0");
    }

    if (!isNaN(newAmount) && countDecimalPlaces(newAmount) > 2) {
      errors.push("Maxinum precision is limited to two decimal places");
    }
    if (newAmount > 999999999999999) {
      errors.push("Be resonable and enter lower value");
    }

    this.errors = errors;

    if (!this.errors.length) {
      this.store.addExpense({
        title: this.title.trim(),
        amount: newAmount.toFixed(2),
      });
      this.title = "";
      this.amount = "";
    }
  };
}
