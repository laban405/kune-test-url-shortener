import React from 'react';
import styled from 'styled-components';

const ToggleDarkMode = (props) => {
   const { themeToggler,themeMode } = props;
   console.log('thene toggler', themeToggler)
   return (
      <Button onClick={themeToggler}>{`${themeMode !='light'? '☀️' :'🌙'}`}</Button>
   );
};

export default ToggleDarkMode;

const Button = styled.button`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: 3px;
  height: 2rem;
  border: none;
  text-decoration: none;
  cursor: pointer;
`;
