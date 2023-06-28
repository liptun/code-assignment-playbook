import { styled } from "styled-components";
import AddExpenseForm from "./components/AddExpenseForm";
import AppTitle from "./components/AppTitle";
import ExpensesSummary from "./components/ExpensesSummary";
import ExpensesTable from "./components/ExpensesTable";
import ConversionRate from "./components/ConversionRate";

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
