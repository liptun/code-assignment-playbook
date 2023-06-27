import { styled } from "styled-components";
import ConversionRate from "./ConversionRate";

const Wrapper = styled.div`
  margin-bottom: 1em;
`;

const Title = styled.h1`
  font-size: 1.6em;
`;

const AppTitle = () => (
  <Wrapper>
    <Title>List of expenses</Title>
    <ConversionRate />
  </Wrapper>
);

export default AppTitle;
