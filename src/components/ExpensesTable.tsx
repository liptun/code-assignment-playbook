import { observer } from "mobx-react";
import { css, styled } from "styled-components";
import store from "../store";
import { displayCurrency } from "../utils/Currency";
import ValidationErrors from "./common/ValidationErrors";

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
  &:nth-child(odd) {
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

const ExpensesTable = observer(() => (
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
      {store.expenses.map((transaction) => {
        const { amount: amountPln } = transaction.getAmountPln();
        const { amount: amountEur, isConversionFloatZero } =
          transaction.getAmountEur();
        return (
          <Row key={transaction.id}>
            <Cell>{transaction.title}</Cell>
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
              <Delete onClick={() => store.deleteExpense(transaction.id)}>
                Delete
              </Delete>
            </Cell>
          </Row>
        );
      })}
      {store.expenses.length === 0 && (
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
