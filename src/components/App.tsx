import { observer } from "mobx-react";
import { styled } from "styled-components";
import store from "../store";

const AppWrapper = styled.div`
  font-size: 2em;
`;

const List = observer(() => (
  <>
    <ul>
      {store.transactions.map((transaction) => (
        <li>{transaction.title} - {transaction.amount}</li>
      ))}
    </ul>
  </>
));

const App = () => (
  <AppWrapper>
    <List />
  </AppWrapper>
);

export default App;
