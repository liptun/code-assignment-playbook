import { observer } from "mobx-react";
import { styled } from "styled-components";
import store from "../store";
import { displayCurrency } from "../utils/Currency";

const AppWrapper = styled.div`
  font-size: 2em;
`;

const List = observer(() => (
  <>
    <ul>
      {store.expenses.map((transaction, index) => (
        <li key={index}>
          <p>{transaction.title}</p>
          <p>PLN {displayCurrency(transaction.getAmountPln())}</p>
          <p>Euro {displayCurrency(transaction.getAmountEur())}</p>
          <hr />
        </li>
      ))}
    </ul>

    <p>sum: {displayCurrency(store.getTotal())} </p>
    <p>sum: {displayCurrency(store.getTotalEuro())} </p>
  </>
));

const App = () => (
  <AppWrapper>
    <List />
    <input type="number" inputMode="numeric" step={0.01} min={0.01} />
  </AppWrapper>
);

export default App;
