import { useState } from "react";
import { styled } from "styled-components";
import { cleanupString, countDecimalPlaces, stringToFloat } from "../helpers";
import store from "../store";
import ValidationErrors from "./common/ValidationErrors";
import Button from "./common/Button";

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

const AddExpenseForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: string[] = [];

    const newTitle = cleanupString(title);
    const newAmount = stringToFloat(amount);

    if (!newTitle) {
      errors.push("Title is required");
    }
    if (newTitle.length < 5) {
      errors.push("Title minimum lenght is 5 characters");
    }
    if (newTitle.length > 100) {
      errors.push("Be resonable and type shorter title");
    }
    if (!amount) {
      errors.push("Amount is required");
    }
    if (isNaN(newAmount)) {
      errors.push("Amount must to be a number");
    }
    if (newAmount <= 0) {
      errors.push("Amount must be greater than 0");
    }

    if (!isNaN(newAmount) && countDecimalPlaces(newAmount) > 2) {
      errors.push("Maxinum precision is limited to two decimal places");
    }
    if (newAmount > 999999999999999) {
      errors.push("Be resonable and enter lower value");
    }

    setErrors(errors);

    if (!errors.length) {
      store.addExpense({
        title: title.trim(),
        amount: newAmount.toFixed(2),
      });
      setTitle("");
      setAmount("");
    }
  };

  return (
    <Wrapper>
      <FormTitle>Add new expense</FormTitle>
      <Form onSubmit={onSubmitHandle}>
        <InputsWrapper>
          <Label>
            <p>Title of transaction</p>
            <Input
              value={title}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setTitle(e.currentTarget.value)
              }
            />
          </Label>
          <Label>
            <p>Amount (in PLN)</p>
            <Input
              value={amount}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setAmount(e.currentTarget.value)
              }
            />
          </Label>
        </InputsWrapper>
        <SubmitWrapper>
          <Button>add</Button>
        </SubmitWrapper>
      </Form>
      <ValidationErrors errors={errors} />
    </Wrapper>
  );
};

export default AddExpenseForm;
