import { useState } from "react";
import { styled } from "styled-components";
import store from "../store";

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
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 2em;
`;

const Label = styled.label`
  font-size: 1em;
  display: flex;
  grid-gap: 2em;
  align-items: center;
  justify-content: space-between;
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
`;

const Add = styled.button`
  font-size: 1em;
  border: 1px solid #404040;
  padding: 0.6em 1em;
  width: 100%;
  background: #ccc;
  cursor: pointer;
`;

const AddExpenseForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const onSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.addExpense({
      title: title.trim(),
      amount: parseFloat(amount).toFixed(2),
    });
    setTitle("");
    setAmount("");
  };

  return (
    <Wrapper>
      <FormTitle>Add new expense</FormTitle>
      <Form onSubmit={onSubmitHandle}>
        <InputsWrapper>
          <Label>
            <p>Title of transaction</p>
            <Input
              type="text"
              required
              minLength={5}
              value={title}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setTitle(e.currentTarget.value.replace(/ {2,}/g, " "))
              }
            />
          </Label>
          <Label>
            <p>Amount (in PLN)</p>
            <Input
              type="number"
              required
              step={0.01}
              min={0}
              value={amount}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setAmount(e.currentTarget.value)
              }
            />
          </Label>
        </InputsWrapper>
        <SubmitWrapper>
          <Add>add</Add>
        </SubmitWrapper>
      </Form>
    </Wrapper>
  );
};

export default AddExpenseForm;
