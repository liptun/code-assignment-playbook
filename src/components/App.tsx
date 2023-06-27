import { styled } from "styled-components";
import AddExpenseForm from "./AddExpenseForm";
import AppTitle from "./AppTitle";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesTable from "./ExpensesTable";

const AppWrapper = styled.div`
  padding: 2em;
  max-width: 600px;
  width: 100%;
  margin: auto;
`;

const App = () => (
  <AppWrapper>
    <AppTitle />
    <AddExpenseForm />
    <ExpensesTable />
    <ExpensesSummary />
  </AppWrapper>
);

export default App;
