import React from "react";
import styled from "styled-components";
import { device } from "../GlobalStyles";

const Wrapper = styled.div`
  display: flex;
`;
const LogoWrap = styled.div`
  margin-left: 10px;
  flex: 0 1 40px;

  @media ${device.laptop} {
    margin: auto 0;
    flex: 0 1 60px;
  }
`;

const LogoText = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
`;

const Logo = () => {
  return (
    <Wrapper>
      <LogoWrap>
        <LogoText>URL Shortener</LogoText>
      </LogoWrap>
    </Wrapper>
  );
};

export default Logo;
