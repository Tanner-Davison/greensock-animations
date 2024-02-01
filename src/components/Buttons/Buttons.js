import React from "react";
/* eslint-disable */
import styled from "styled-components";
import colors from "../../styles/colors";
import { ReactComponent as LeftArrow } from "./svgs/LeftArrow.svg";
import { ReactComponent as RightArrow } from "./svgs/RightArrow.svg";

export const CarouselButtonRight = ({ children, onClick }) => {
  const handleClick = (e) => {
    onClick && onClick(e);
  };
  return <StyledArrow id={'rightArrow'} as={RightArrow} onClick={handleClick}></StyledArrow>;
};

export const CarouselButtonLeft = ({ children, onClick }) => {
  const handleClick = (e) => {
    
    onClick && onClick(e);
  };
  return <StyledArrow id={'leftArrow'}as={LeftArrow} onClick={handleClick}></StyledArrow>;
};

const StyledArrow = styled.svg`
  cursor: pointer;
  width: 6.944vw;
  height: 6.944vw;
  fill: ${colors.primary}; /* Change fill color */
  stroke: ${colors.primaryOrange}; /* Change stroke color */
  stroke-width: 2; /* Adjust stroke width if needed */
`;
