import { styled } from "styled-components";

const Button = styled.button`
  font-size: 1rem;
  border: 1px solid #404040;
  padding: 0.6rem 1rem;
  width: 100%;
  background: #ccc;
  cursor: pointer;
  color: #404040;
  &:hover {
    background: #eee;
  }
`;

export default Button;
