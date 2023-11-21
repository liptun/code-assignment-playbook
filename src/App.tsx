import { styled } from "styled-components";
import AddExpenseForm from "./components/AddExpenseForm";
import AppTitle from "./components/AppTitle";
import ExpensesSummary from "./components/ExpensesSummary";
import ExpensesTable from "./components/ExpensesTable";
import ConversionRate from "./components/ConversionRate";
import { observer } from "mobx-react-lite";
import AppState from "./store/AppState";

const AppWrapper = styled.div`
  padding: 15px;
  max-width: 600px;
  width: 100%;
  margin: auto;
`;

type Props = {
  appState: AppState;
};
const App = observer(({ appState }: Props) => {
  return (
    <AppWrapper>
      <AppTitle />
      <ConversionRate appState={appState} />
      <AddExpenseForm appState={appState} />
      <ExpensesTable appState={appState} />
      <ExpensesSummary appState={appState} />
    </AppWrapper>
  );
});

export default App;
