import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { CarouselButtonRight, CarouselButtonLeft } from "./Buttons/Buttons";
import media from "../styles/media";
import colors from "../styles/colors";
import text from "../styles/text";
import HeroImage from "../images/HeroImage.webp";
import PictureLeft from "../images/PictureLeft.webp";
import PictureRightAgain from "../images/PictureRightAgain.webp";
import PictureLeftAgain from "../images/PictureLeftAgain.webp";

const CustomCarousel = () => {
  const imgArray = [
    HeroImage,
    PictureLeft,
    PictureRightAgain,
    PictureLeftAgain,
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
     gsap.set(moveRight, { xPercent: 0 }); 
     gsap.set(moveLeft, { xPercent: 0 }); 
  }, []);
  
  // Next button
  function slideOneNext() {
    gsap.to(targets.current[count], {
      duration: 1,
      xPercent: -125,
      opacity: 0,
      zIndex: -10,
    });

    count = count < targets.current.length - 1 ? count + 1 : 0; // Reset to 0 if at the last image

    gsap.fromTo(
      targets.current[count],
      { xPercent: 100, opacity: 1, zIndex: -10 },
      { duration: 1, xPercent: 0, opacity: 1, zIndex: 0, ease:'smooth', }
    );
  }

  // Previous button
  function slideOnePrev() {
    gsap.to(targets.current[count], {
      duration: 1,
      xPercent: 100,
      opacity: 0,
      zIndex: -10,
    });

    count = count > 0 ? count - 1 : targets.current.length - 1; // Go to the last image if at the first image

    gsap.fromTo(
      targets.current[count],
      { xPercent: -100, opacity: 0, zIndex: -10 },
      { duration: 1, xPercent: 0, opacity: 1, zIndex: 0 }
    );
  }
  
const handleClickLeft = (id) => {
  const moveLeft = document.getElementById("leftArrow");
  gsap.fromTo(
    moveLeft,
    {
      x: 0,
      y: 0,
      rotation: 0,
    },
    {
      x: -50,
      duration: 0.5,
      rotation: -180,
      ease: "power1.out",

      onComplete: () => {
        gsap.to(moveLeft, {
          x: 0,
          yPercent: 0,
          rotation: -360,
          duration: 0.5,
          ease: "slow",
        });
      },
    }
  );
  slideOneNext();
};

const handleClickRight = async () => {
const moveRight = document.getElementById("rightArrow");
gsap.fromTo(
  moveRight,
  {
    x: 0,
    y: 0,
    rotation: 0,
    
  },
  {
    x: 50,
    duration: 0.5,
    rotation: -180,
    ease: "power1.out",

    onComplete: () => {
      gsap.to(moveRight, {
        x: 0,
        yPercent: 0,
        rotation: -360,
        duration: 0.5,
        ease: "slow",
      });
    },
  }
);
 slideOneNext();
};
  return (
    <Wrapper>
      <BoxContainer>
        {imgArray.map((img, index) => (
          <Box
            key={index}
            imgurl={img}
            className={`box box${index < 9 ? "0" : ""}${index + 1}`}></Box>
        ))}
      </BoxContainer>
      <Controls>
        <CarouselButtonLeft
          id={"arrowLeft"}
          onClick={() => handleClickLeft()}>
          Prev
        </CarouselButtonLeft>
        <CarouselButtonRight
          id={"arrowRight"}
          onClick={()=>handleClickRight()}>
          Next
        </CarouselButtonRight>
      </Controls>
    </Wrapper>
  );
};

export default CustomCarousel;

// ... (Styled components remain the same)

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 60vw;
  height: 30rem;
  position: relative;
  margin: 24px auto;
  overflow: hidden;
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
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.389vw;
  background-color: ${colors.grey100};
  border-radius: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
