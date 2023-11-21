import { observer } from "mobx-react";
import { css, styled } from "styled-components";
import { displayCurrency } from "../utils/Currency";
import ValidationErrors from "./common/ValidationErrors";
import AppState from "../store/AppState";

const CellCss = css`
  padding: 1em 0.6em;
  border: 1px solid #404040;
  text-align: left;
  font-size: 1em;
`;

const Table = styled.table`
  margin-bottom: 2em;
  width: 100%;
`;
const Row = styled.tr`
  &:nth-child(even) {
    background: #ddd;
  }
`;
const HeaderCell = styled.th`
  font-weight: 700;
  background: #bbb;
  ${CellCss};
`;
const Cell = styled.td`
  ${CellCss}
`;

const Delete = styled.button`
  border: none;
  background: none;
  font-size: 1em;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

type Props = {
  appState: AppState;
};

const ExpensesTable = observer(({ appState }: Props) => (
  <Table>
    <thead>
      <Row>
        <HeaderCell>Title</HeaderCell>
        <HeaderCell>Amount (PLN)</HeaderCell>
        <HeaderCell>Amount (EUR)</HeaderCell>
        <HeaderCell>Options</HeaderCell>
      </Row>
    </thead>
    <tbody>
      {appState.expenses.map(
        ({ id, title, amountPln, amountEur, isConversionFloatZero }) => {
          return (
            <Row key={id}>
              <Cell>{title}</Cell>
              <Cell>
                <p>{displayCurrency(amountPln)}</p>
              </Cell>
              <Cell>
                <p>{displayCurrency(amountEur)}</p>
                {isConversionFloatZero && (
                  <ValidationErrors
                    errors={[
                      "Be aware, this value is rounded to minimal value due to conversion to zero",
                    ]}
                  />
                )}
              </Cell>
              <Cell>
                <Delete onClick={() => appState.deleteExpense(id)}>Delete</Delete>
              </Cell>
            </Row>
          );
        }
      )}
      {appState.expenses.length === 0 && (
        <Row>
          <Cell colSpan={4}>
            No data - use form above to add expense to this table
          </Cell>
        </Row>
      )}
    </tbody>
  </Table>
));

export default ExpensesTable;
