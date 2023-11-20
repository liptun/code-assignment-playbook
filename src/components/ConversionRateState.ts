import { action, makeObservable, observable } from "mobx";
import { countDecimalPlaces, stringToFloat } from "../helpers";
import { ChangeEvent } from "react";
import Store from "../store/Store";

export class ConversionRateState {
  @observable public errors: Array<string> = [];
  @observable public rate: string;

  constructor(private readonly store: Store) {
    makeObservable(this);
    this.rate = this.store.conversionRate.toString();
  }

  public onChangeRateHandle = (e: ChangeEvent<HTMLInputElement>) => {
    this.rate = e.currentTarget.value;
  };

  @action public onSetConversionRateHandle = () => {
    const errors: string[] = [];
    const newRate = stringToFloat(this.rate);
    if (isNaN(newRate)) {
      errors.push("Enter correct conversion rate value");
    }
    if (newRate <= 0) {
      errors.push("Value must be greater than 0");
    }
    if (!isNaN(newRate) && countDecimalPlaces(newRate) > 3) {
      errors.push("Maximal precision is three decimal points");
    }

    !errors.length && this.store.setConversionRate(newRate);
    this.errors = errors;
  };
}
