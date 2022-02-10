import React, { useState } from "react";
import styled from "styled-components";
import ToggleDarkMode from "../ToggleDarkMode";
import Logo from "./Logo";
import { device } from "../GlobalStyles";

const Navbar = ({ themeToggler,themeMode }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  // const [theme, themeToggler] = useDarkTheme();

  return (
    <Wrapper>
      <Logo />
      <Spacer />

      <Navbox></Navbox>

      <Toggle
        navbarOpen={navbarOpen}
        onClick={() => setNavbarOpen(!navbarOpen)}
      >
        {navbarOpen ? <Hamburger open /> : <Hamburger />}
      </Toggle>
      <ToggleDarkMode themeToggler={themeToggler} themeMode={themeMode}/>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  align-items: center;
  @media ${device.tablet} {
    min-width: 500px;
  }
`;

const Toggle = styled.div`
  display: none;
  height: 100%;
  cursor: pointer;
  padding: 0 10px;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Navbox = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
  align-items: center;
  flex-grow: 1;
 `;

const Hamburger = styled.div`
  background-color: ${({ theme }) => theme.primaryColor};
  width: 30px;
  height: 3px;
  transition: all 0.3s linear;
  align-self: center;
  position: relative;
  transform: ${(props) => (props.open ? "rotate(-45deg)" : "inherit")};

  ::before,
  ::after {
    width: 30px;
    height: 3px;
    background-color: ${({ theme }) => theme.primaryColor};
    content: "";
    position: absolute;
    transition: all 0.3s linear;
  }

  ::before {
    transform: ${(props) =>
      props.open ? "rotate(-90deg) translate(-10px, 0px)" : "rotate(0deg)"};
    top: -10px;
  }

  ::after {
    opacity: ${(props) => (props.open ? "0" : "1")};
    transform: ${(props) => (props.open ? "rotate(90deg) " : "rotate(0deg)")};
    top: 10px;
  }
`;

const Spacer = styled.div`
  @media screen and (max-width: 960px) {
    flex-grow: 1;
  }
`;
