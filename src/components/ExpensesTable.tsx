import { observer } from "mobx-react";
import store from "../store";
import { displayCurrency } from "../utils/Currency";

const ExpensesTable = observer(() => (
  <>
    <ul>
      {store.expenses.map((transaction) => (
        <li key={transaction.id}>
          <p>{transaction.title}</p>
          <p>PLN {displayCurrency(transaction.getAmountPln())}</p>
          <p>Euro {displayCurrency(transaction.getAmountEur())}</p>
          <button onClick={() => store.deleteExpense(transaction.id)}>
            Delete
          </button>
          <hr />
        </li>
      ))}
    </ul>

    <p>sum: {displayCurrency(store.getTotal())} </p>
    <p>sum: {displayCurrency(store.getTotalEuro())} </p>
  </>
));

export default ExpensesTable;
