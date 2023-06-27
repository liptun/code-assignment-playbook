import { styled } from "styled-components";
import ExpensesTable from "./ExpensesTable";

const AppWrapper = styled.div`
  font-size: 2em;
`;

const App = () => (
  <AppWrapper>
    <ExpensesTable />
    <input type="number" inputMode="numeric" step={0.01} min={0.01} />
  </AppWrapper>
);

export default App;
