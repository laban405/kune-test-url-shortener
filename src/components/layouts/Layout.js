import React from "react";
import styled from "styled-components";
import NavBar from "../navbar/Navbar";
import bgSvg from "../../assets/svg/bgSvg.svg";
import darkBgSvg from "../../assets/svg/darkBgSvg.svg";
// import Footer from "./Footer";

const Layout = ({ children, themeMode, themeToggler }) => {
  console.log("layout dark mode", themeMode);
  return (
    <LayoutWrapper themeMode={themeMode}>
      <Padding>
        <NavWrapper>
          <NavBar themeToggler={themeToggler} themeMode={themeMode} />
        </NavWrapper>
        <ContentWrapper>
          <main>{children}</main>
        </ContentWrapper>
      </Padding>
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.fontColor};
  width: 100%;
  min-height: 100vh;
  background-image: url(${(props) =>
    props.themeMode != "light" ? darkBgSvg : bgSvg});
  background-size: cover;
`;

const Padding = styled.div`
  padding: 20px;
`;

const ContentWrapper = styled.div`
  color: ${(props) => props.theme.colors.fontColor};
  background: rgba(255, 255, 255, 0.05);
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  width: 100%;
  margin: auto;
`;

const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 100px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  margin-bottom: 2rem;
`;
