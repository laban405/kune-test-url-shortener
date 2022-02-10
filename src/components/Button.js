import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 30px;
  height: 3rem;
  border: none;
  text-decoration: none;
  cursor: pointer;
  font-size: 1rem;
  width: 200px;
  position: relative;
  transition: all 0.3s ease-in-out;
  :before {
    content: "";
    background: linear-gradient(
      45deg,
      #006666,
      #707070,
      #d4145a,
      #ff7300,
      #fffb00,
      #48ff00,
      #7a00ff
    );
    position: absolute;
    top: -3px;
    left: -3px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    border-radius: 30px;
  }
  :hover:before {
    opacity: 1;
  }
  :hover {
    transform: translateY(-3px);
    background: #333453;
  }
  :after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #33345300;
    left: 0;
    top: 0;
    border-radius: 30px;
  }

  @keyframes glowing {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;

export default StyledButton;
