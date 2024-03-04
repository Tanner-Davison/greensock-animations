import React, { useEffect,useRef } from "react";
import NavigationBar from "./NavigationBar";
import styled from "styled-components";
import media from "../styles/media";
import colors from "../styles/colors";
import text from "../styles/text";
import getMedia from "../utils/getMedia";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
const AnimationTest = () => {
  const container = useRef()

  const boxes = new Array(6).fill("");
  const runBoxes = boxes.map((box, index) => {
    return <Box key={index} id={`boxes`} className="boxClass"></Box>;
  });

  useGSAP(() => {
    const xValue = getMedia(-620, -500, -340, -170);
    const additionOne = getMedia(120, 100, 80, 40);
    const additionTwo = getMedia(240, 200, 150, 75);
    const additionThree = getMedia(360, 300, 250, 110);
    const additionFour = getMedia(485, 400, 325, 140);
    const elements = gsap.utils.toArray(".boxClass");
    const oddElements = elements.filter((item, index) => index % 2 === 1);
    const evenElements = elements.filter((item, index) => index % 2 === 0);
    const groupOne = [oddElements[0], evenElements[0]];
    const groupTwo = [oddElements[1], evenElements[1]];
    const groupThree = [oddElements[2], evenElements[2]];
    const boxesDiv = document.querySelector(".boxesDiv");
    gsap.set(elements, { xPercent: -1200, scale: 0.8, yPercent: 0 });
    const boxTl = gsap.timeline();
    boxTl
      .to(elements, {
        xPercent: 0,
        duration: 1,
        stagger: 0.3,
        ease: "back.inOut",
      })
      .to(boxesDiv, { gap: "0px 20px" }, "<")
      .to(oddElements, { yPercent: -105, duration: 1 }, "-=.5")
      .to(evenElements, { xPercent: 100, duration: 1 }, "-=.4")
      .to(boxesDiv, { gap: "20px 0px" }, "<")
      .to(elements, {
        duration: 2,
        rotation: 360,
        borderRadius: "50px",
        transformOrigin: "50% 50% -400px",
      })
      .to(
        groupOne,
        { yPercent: 150, borderColor: "blue", ease: "back.in" },
        "<"
      )
      .to(groupTwo, { yPercent: 150, borderColor: "red", ease: "back.in" }, "<")
      .to(
        groupThree,
        { yPercent: 150, borderColor: "purple", ease: "back.in" },
        "<"
      )
      .to(elements, { xPercent: 0, duration: 0.2, stagger: 0.2 }, "<+=.8")
      .to(groupThree[0], { xPercent: 200, duration: 0.2 })
      .to(groupThree[1], { xPercent: 300, duration: 0.2 })
      .to(groupTwo[0], { xPercent: 400, duration: 0.2 })
      .to(groupTwo[1], { xPercent: 500, duration: 0.2 })
      .to(groupOne[0], { xPercent: 600, duration: 0.2 })
      .to(groupOne[1], { xPercent: 650, duration: 0.4, ease: "back.in" })
      .to(groupOne[1], {
        yPercent: 0,
        xPercent: 0,
        duration: 0.3,
        stagger: 0.3,
        scale: 1,
      })
      .add("test")
      .to([groupOne[0], groupTwo, groupThree], { x: xValue, duration: 0.3 })
      .to(groupOne[0], {
        yPercent: -45,
        scale: 1,
        ease: "back.inOut",
        rotate: 270,
        transformOrigin: "50% 50%",
        borderRadius: "0px",
        duration: 0.3,
      })
      .to(
        [groupTwo, groupThree],
        { x: xValue + additionOne, duration: 0.3, ease: "back.inOut" },
        "<"
      )
      .to(groupTwo[0], {
        yPercent: 30,
        scale: 1,
        ease: "back.inOut",
        rotate: 270,
        transformOrigin: "50% 50%",
        borderRadius: "50px",
        duration: 0.3,
      })
      .to(
        [groupTwo[1], groupThree],
        { x: xValue + additionTwo, duration: 0.3, ease: "back.inOut" },
        "<"
      )
      .to(groupTwo[1], {
        yPercent: -45,
        scale: 1,
        ease: "back.inOut",
        rotate: 270,
        transformOrigin: "50% 50%",
        borderRadius: "0px",
        duration: 0.3,
      })
      .to(
        [groupThree],
        { x: xValue + additionThree, duration: 0.3, ease: "back.inOut" },
        "<"
      )
      .to(groupThree[0], {
        yPercent: 30,
        scale: 1,
        ease: "back.inOut",
        rotate: 270,
        transformOrigin: "50% 50%",
        borderRadius: "50px",
        duration: 0.3,
      })
      .to(
        groupThree[1],
        { x: xValue + additionFour, duration: 0.3, ease: "back.inOut" },
        "<"
      )
      .to(groupThree[1], {
        yPercent: -45,
        scale: 1,
        ease: "back.inOut",
        rotate: 270,
        transformOrigin: "50% 50%",
        borderRadius: "0px",
        duration: 0.3,
      })
      .to(elements, {
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 0,
        duration: 1,
        borderRadius: 15,
        ease: "back.in",
      })
      .to(
        boxesDiv,
        {
          gap: "20px",
          duration: 0.8,
          borderRadius: 15,
          ease: "back.inOut",
        },
        "<+=.7"
      )
      // .add('test')
      .to(elements, {
        yPercent: -10,
        duration: 0.5,
        rotate: 345,
        transformOrgin: "50% 50%",
        borderColor: "rose",
        ease: "back.inOut",
        stagger: 0.05,
      })
      .to(
        elements,
        {
          yPercent: 0,
          ease: "back.inOut",
          rotate: -220,
          borderColor: "black",
          transformOrigin: "50% 50%",
          duration: 0.5,
          stagger: 0.06,
        },
        "<+=.5"
      )
      .to(
        elements,
        {
          ease: "back.inOut",
          rotateX: -130,
          scale: 1.3,
          borderColor: "black",
          transformOrigin: "50% 50%",
          duration: 0.5,
          stagger: 0.06,
        },
        "<+=.5"
      )
      .to(
        elements,
        {
          ease: "back.inOut",
          rotateY: -130,
          rotateX: 0,
          rotate:0,
          scale: 1,
          transformOrigin: "50% 50%",
          duration: 0.5,
          stagger: 0.06,
        },
        "<+=.5"
      )
      .to(
        elements,
        {
          ease: "back.inOut",
          rotateY: 0,
          rotateX: 0,
          rotate:0,
          transformOrigin: "50% 50%",
          duration: 0.5,
          stagger: 0.06,
        },
        "<"
      );
    // boxTl.play("test");
  }, {scope:container});
  return (
    <>
      <NavigationBar />
      <Wrapper ref={container}>
        <BoxesWrapper className={"boxesDiv"}>{runBoxes}</BoxesWrapper>
      </Wrapper>
    </>
  );
};

export default AnimationTest;

const Box = styled.div`
  position: relative;
  display: flex;
  width: 6.944vw;
  height: 6.944vw;
  border: 2px solid black;
`;
const BoxesWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 600px;
  overflow: hidden;
  padding: 100px 0px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  max-width: 100vw;
`;
