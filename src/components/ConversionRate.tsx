import { observer } from "mobx-react";
import { useState } from "react";
import { styled } from "styled-components";
import store from "../store";
import ValidationErrors from "./common/ValidationErrors";
import Button from "./common/Button";
import { ConversionRateState } from "./ConversionRateState";

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
  const [conversionRateState] = useState(() => new ConversionRateState(store));

  return (
    <Wrapper>
      <FormTitle>Conversion rate</FormTitle>
      <ConversionRateStatus>
        1 EUR = {store.conversionRate} PLN
      </ConversionRateStatus>
      <InputWrapper>
        <Input
          required
          value={conversionRateState.rate}
          onChange={conversionRateState.onChangeRateHandle}
        />
        <Button onClick={conversionRateState.onSetConversionRateHandle}>
          set new conversion rate
        </Button>
      </InputWrapper>
      <ValidationErrors errors={conversionRateState.errors} />
    </Wrapper>
  );
});

export default ConversionRate;
