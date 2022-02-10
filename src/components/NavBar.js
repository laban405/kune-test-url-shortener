import React from "react";
import ToggleDarkMode from "./ToggleDarkMode";
import styled from "styled-components";

function NavBar({ darkMode, theme }) {
  return (
    <Wrapper>
      <ToggleDarkMode darkMode={darkMode} theme={theme} />
    </Wrapper>
  );
}

export default NavBar;

const Wrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;
