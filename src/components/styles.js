import styled from "styled-components";

export const CopyButton = styled.button`
  color: ${({ theme }) => theme.colors.white};
  background-color: #056608;
  cursor: pointer;
  border: none;
  padding: 5px;
  border-radius: 3px;
  min-width:3rem;
  max-height:2rem;
  transition: transform 300ms ease-in-out;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 0px 2px ${({ theme }) => theme.colors.primary};
  }
  &:active {
    transform: scale(0.7);
  }
`;