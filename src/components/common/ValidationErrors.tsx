import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: .8em;
  grid-gap: 0.3em;
`;

const Error = styled.p`
  color: red;
  background: rgba(255, 0, 0, 0.3);
  font-size: 1rem;
  padding: 0.3em 0.8em;
  border-radius: 0.4em;
  border: 1px solid rgba(255, 0, 0, 0.5);
`;

type Props = {
  errors: string[];
};
const ValidationErrors = ({ errors }: Props) => {
  return (
    <Wrapper>
      {errors.map((error, index) => (
        <Error key={index}>{error}</Error>
      ))}
    </Wrapper>
  );
};

export default ValidationErrors;
