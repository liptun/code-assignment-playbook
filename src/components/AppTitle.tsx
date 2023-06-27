import { observer } from "mobx-react";
import { styled } from "styled-components";
import store from "../store";

const Wrapper = styled.div`
  font-size: 1.4em;
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 1.6em;
`;

const AppTitle = observer(() => (
  <Wrapper>
    <Title>List of expenses</Title>
    <p>1 EUR = {store.eurPlnRate} PLN</p>
  </Wrapper>
));

export default AppTitle;
