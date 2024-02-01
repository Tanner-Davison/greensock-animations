import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import HeroImage from "../images/HeroImage.webp";
import PictureLeft from "../images/PictureLeft.webp";
import PictureLeftAgain from "../images/PictureLeftAgain.webp";
import PictureRightAgain from "../images/PictureRightAgain.webp";
import SaitamaPunch from "../images/SaitamaPunch.png";
import Stars from "../images/Stars.jpg";
import colors from "../styles/colors";
import text from "../styles/text";
import { CarouselButtonLeft, CarouselButtonRight } from "./Buttons/Buttons";

const CustomCarousel = () => {
  const imgArray = [
    HeroImage,
    PictureLeft,
    PictureRightAgain,
    PictureLeftAgain,
    SaitamaPunch,
    Stars,
  ];
  
  let count = 0;
  const targets = useRef([]);

  useEffect(() => {
    targets.current = document.querySelectorAll(".box");
    gsap.set(targets.current, { xPercent: 100, opacity: 0 });
    gsap.set(targets.current[0], { xPercent: 0, opacity: 1 });
    //button Elements
    const moveRight = document.getElementById("rightArrow");
    const moveLeft = document.getElementById("rightArrow");
    const controls = document.getElementById("controls")
    gsap.set(moveRight, { xPercent: 0 });
    gsap.set(moveLeft, { xPercent: 0 });
    gsap.set(controls, {xPercent:0})
  }, []);

  // Next button
  function slideOneNext() {
    gsap.to(targets.current[count], {
      duration: 1.3,
      xPercent: -125,
      opacity: 0,
      zIndex: -10,
      ease: "circ.out",
    });

    count = count < targets.current.length - 1 ? count + 1 : 0; // Reset to 0 if at the last image

    gsap.fromTo(
      targets.current[count],
      { xPercent: 100, opacity: 1, zIndex: -10 },
      { duration: 0.8, xPercent: 0, opacity: 1, zIndex: 0, ease: "smooth" }
    );
  }

  // Previous button
  function slideOnePrev() {
    gsap.to(targets.current[count], {
      duration: 1.3,
      xPercent: 100,
      opacity: 0,
      zIndex: -10,
      ease: "circ.out",
    });

    count = count > 0 ? count - 1 : targets.current.length - 1; // Go to the last image if at the first image

    gsap.fromTo(
      targets.current[count],
      { xPercent: -100, opacity: 1, zIndex: -10 },
      { duration: 0.8, xPercent: 0, opacity: 1, zIndex: 0, ease: "circ.Out" }
    );
  }

  const handleClickLeft = () => {
    const moveLeft = document.getElementById("leftArrow");
    const controls = document.getElementById('controls');
    gsap.fromTo(controls,{xPercent: 0},{xPercent: -15,duration:.3, onComplete: ()=>{gsap.to(controls,{xPercent: 0, duration:.3})}})
    gsap.fromTo(
      moveLeft,
      {
        xPercent: 0,
        y: 0,
        rotation: 0,
        fill: `${colors.orange200}`,
        strokeWidth: "2",
      },
      {
        xPercent: -35,
        ease: "power1.out",
        duration: 0.2,
        strokeWidth: "2",

        onComplete: () => {
          gsap.to(moveLeft, {
            xPercent: 0,
            yPercent: 0,
            ease: "smooth",
            fill: "transparent",
          });
        },
      }
    );
    slideOnePrev();
  };

  const handleClickRight = () => {
    const moveRight = document.getElementById("rightArrow");
    const controls = document.getElementById("controls");
    gsap.fromTo(
      controls,
      { xPercent: 0 },
      {
        xPercent: 15,
        duration: 0.3,
        onComplete: () => {
          gsap.to(controls, { xPercent: 0, duration: 0.3 });
        },
      }
    );
    gsap.fromTo(
      moveRight,
      {
        xPercent: 0,
        y: 0,
        rotation: 0,
      },
      {
        xPercent: 34,
        fill: `${colors.orange200}`,
        duration: 0.2,
        ease: "smooth",

        onComplete: () => {
          gsap.to(moveRight, {
            xPercent: 0,
            yPercent: 0,
            fill: "transparent",
            ease: "smooth",
          });
        },
      }
    );
    slideOneNext();
  };
  const runImgs = imgArray.map((img, index) => (
    <Box
      key={index}
      imgurl={img}
      className={`box box${index < 9 ? "0" : ""}${index + 1}`}></Box>
  ));

  return (
    <Wrapper>
      <BoxContainer>{runImgs}</BoxContainer>
      <Controls id={'controls'}>
        <CarouselButtonLeft id={"arrowLeft"} onClick={() => handleClickLeft()}>
          Prev
        </CarouselButtonLeft>
        <StyledData>{count}</StyledData>
        <CarouselButtonRight
          id={"arrowRight"}
          onClick={() => handleClickRight()}>
          Next
        </CarouselButtonRight>
      </Controls>
    </Wrapper>
  );
};

export default CustomCarousel;

// ... (Styled components remain the same)
const StyledData = styled.p`
${text.bodyM};
color:${colors.primaryPurple};
`
const BoxContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 45vw;
  height: 30vw;
  position: relative;
  margin: 1.667vw auto;
  overflow: hidden;
  border-radius: 1.667vw;
`;

const Box = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  z-index: 0;
  background-image: ${(props) => props.imgurl && `url(${props.imgurl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 1.667vw;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  gap: 1.389vw;
  background-color: ${colors.grey};
  border-radius: 1.389vw;
  border: 1px groove white;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    border: 1px groove whitesmoke;
    box-shadow: 0px 4px 19px ${colors.grey200};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
