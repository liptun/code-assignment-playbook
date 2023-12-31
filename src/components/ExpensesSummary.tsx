import { observer } from "mobx-react";
import { styled } from "styled-components";
import store from "../store";
import { displayCurrency } from "../utils/Currency";

const Wrapper = styled.div`
  font-size: 1.4em;
`;

const ExpensesSummary = observer(() => (
  <Wrapper>
    Sum: {displayCurrency(store.getTotal())} (
    {displayCurrency(store.getTotalEuro())} EUR)
  </Wrapper>
));

export default ExpensesSummary;
