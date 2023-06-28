import { observer } from "mobx-react";
import { useState } from "react";
import { styled } from "styled-components";
import { countDecimalPlaces, stringToFloat } from "../helpers";
import store from "../store";
import ValidationErrors from "./common/ValidationErrors";
import Button from "./common/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 1em;
  @media (min-width: 700px) {
    flex-direction: row;
  }
`;

const ConversionRateStatus = styled.p`
  margin-bottom: 1em;
`;

const Input = styled.input`
  padding: 0.6em 1em;
  border: 1px solid #404040;
  font-size: 1em;
`;

const ConversionRate = observer(() => {
  const [rate, setRate] = useState(store.conversionRate.toString());
  const [errors, setErrors] = useState<string[]>([]);

  const onSetConversionRateHandle = () => {
    const errors: string[] = [];
    const newRate = stringToFloat(rate);
    if (isNaN(newRate)) {
      errors.push("Enter correct conversion rate value");
    }
    if (newRate <= 0) {
      errors.push("Value must be greater than 0");
    }
    if (!isNaN(newRate) && countDecimalPlaces(newRate) > 3) {
      errors.push("Maximal precision is three decimal points");
    }

    !errors.length && store.setConversionRate(newRate);
    setErrors(errors);
  };
  return (
    <Wrapper>
      <FormTitle>Conversion rate</FormTitle>
      <ConversionRateStatus>
        1 EUR = {store.conversionRate} PLN
      </ConversionRateStatus>
      <InputWrapper>
        <Input
          required
          value={rate}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setRate(e.currentTarget.value)
          }
        />
        <Button onClick={onSetConversionRateHandle}>
          set new conversion rate
        </Button>
      </InputWrapper>
      <ValidationErrors errors={errors} />
    </Wrapper>
  );
});

export default ConversionRate;
