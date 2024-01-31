import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

function App() {
  console.clear();
  let count = 0;
  const targets = useRef([]);

  useEffect(() => {
    targets.current = document.querySelectorAll(".box");
    gsap.set(targets.current, { xPercent: 100 });
    gsap.set(targets.current[0], { xPercent: 0 });
  }, []);

  // Next button
  function slideOneNext() {
    gsap.fromTo(
      targets.current[count],
      { xPercent: 0, zIndex: 0 },
      { delay: 0.2, duration: 1.2, xPercent: 0, zIndex: -10 }
    );
    count = count < targets.current.length - 1 ? ++count : 0;
    gsap.fromTo(
      targets.current[count],
      { xPercent: 100, zIndex: 10 },
      { duration: 1.2, xPercent: 0, zIndex: 0 }
    );
  }

  // Previous button
  function slideOnePrev() {
    gsap.fromTo(
      targets.current[count],
      { xPercent: 0, zIndex: 10 },
      { xPercent: 0, zIndex: 0 }
    );
    gsap.fromTo(
      targets.current[count],
      { xPercent: 0, zIndex: 0 },
      { delay: 0, duration: 1.2, xPercent: 100, zIndex: -10 }
    );
    count = count < targets.current.length ? --count : 0;
  }

  return (
    <>
      <BoxContainer>
        <Box className="box box01">SLIDE-01</Box>
        <Box className="box box02">SLIDE-02</Box>
        <Box className="box box03">SLIDE-03</Box>
        <Box className="box box04">SLIDE-04</Box>
      </BoxContainer>

      <Controls>
        <button id="prevButton" onClick={() => slideOnePrev()}>
          Prev
        </button>
        <button id="nextButton" onClick={() => slideOneNext()}>
          Next
        </button>
      </Controls>
    </>
  );
}

export default App;

const BoxContainer = styled.div`
  width: 60rem;
  height: 30rem;
  position: relative;
  margin: 24px auto;
  overflow: hidden;
`;

const Box = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  z-index: 0;

  &.box01 {
    background-color: mediumturquoise;
    left: 0%;
  }
  &.box02 {
    background-color: mediumseagreen;
  }
  &.box03 {
    background-color: royalblue;
  }
  &.box04 {
    background-color: mediumorchid;
  }
`;

const Controls = styled.div`
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  min-height: 40px;
  button {
    margin: 0 8px;
    padding: 12px 24px;
  }
`;
