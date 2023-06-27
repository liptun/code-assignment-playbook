import { styled } from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 1em;
`;

const Title = styled.h1`
  font-size: 1.6em;
`;

const AppTitle = () => (
  <Wrapper>
    <Title>List of expenses</Title>
  </Wrapper>
);

export default AppTitle;
