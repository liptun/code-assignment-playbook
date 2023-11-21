import { observer } from "mobx-react";
import { styled } from "styled-components";
import { displayCurrency } from "../utils/Currency";
import AppState from "../store/AppState";

const Wrapper = styled.div`
  font-size: 1.4em;
`;

type Props = {
  appState: AppState;
};

const ExpensesSummary = observer(({ appState }: Props) => (
  <Wrapper>
    Sum: {displayCurrency(appState.total)} ({displayCurrency(appState.totalEuro)} EUR)
  </Wrapper>
));

export default ExpensesSummary;
