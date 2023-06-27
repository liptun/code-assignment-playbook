import { styled } from "styled-components";
import AddExpenseForm from "./AddExpenseForm";
import AppTitle from "./AppTitle";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesTable from "./ExpensesTable";
import ConversionRate from "./ConversionRate";

const AppWrapper = styled.div`
  padding: 15px;
  max-width: 600px;
  width: 100%;
  margin: auto;
`;

const App = () => (
  <AppWrapper>
    <AppTitle />
    <ConversionRate />
    <AddExpenseForm />
    <ExpensesTable />
    <ExpensesSummary />
  </AppWrapper>
);

export default App;
