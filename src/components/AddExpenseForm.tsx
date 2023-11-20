import { useState } from "react";
import { styled } from "styled-components";
import store from "../store";
import ValidationErrors from "./common/ValidationErrors";
import Button from "./common/Button";
import { AddExpenseFormState } from "./AddExpenseFormState";
import { observer } from "mobx-react-lite";

const Wrapper = styled.div`
  padding: 2em 0;
  border: 1px solid #404040;
  background: rgba(50, 50, 50, 0.05);
  padding: 1em;
  margin-bottom: 1em;
`;

const FormTitle = styled.h2`
  font-size: 1.4em;
  margin-bottom: 1em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  grid-gap: 2em;
  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }
`;

const Label = styled.label`
  font-size: 1em;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  grid-gap: 0.5em;
  justify-content: space-between;
  @media (min-width: 700px) {
    flex-direction: row;
    align-items: center;
  }
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 2em;
`;

const SubmitWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Input = styled.input`
  padding: 0.6em 1em;
  border: 1px solid #404040;
  font-size: 1em;
  width: 100%;
  @media (min-width: 700px) {
    width: auto;
  }
`;

const AddExpenseForm = observer(() => {
  const [addExpenseFormState] = useState(() => new AddExpenseFormState(store));

  return (
    <Wrapper>
      <FormTitle>Add new expense</FormTitle>
      <Form onSubmit={addExpenseFormState.onSubmitHandle}>
        <InputsWrapper>
          <Label>
            <p>Title of transaction</p>
            <Input
              value={addExpenseFormState.title}
              onChange={addExpenseFormState.onChangeTitleHandle}
            />
          </Label>
          <Label>
            <p>Amount (in PLN)</p>
            <Input
              value={addExpenseFormState.amount}
              onChange={addExpenseFormState.onChangeAmountHandle}
            />
          </Label>
        </InputsWrapper>
        <SubmitWrapper>
          <Button>add</Button>
        </SubmitWrapper>
      </Form>
      <ValidationErrors errors={addExpenseFormState.errors} />
    </Wrapper>
  );
});

export default AddExpenseForm;
