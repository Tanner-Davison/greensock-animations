import { useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

function App() {
  useEffect(() => {
    gsap.to("#headline",{x: -200,duration: 1, repeat:-1, yoyo:true, ease:'linear'});
    gsap.to("#headline2",{x:200, duration:1 ,delay:1, repeat:-1, yoyo:true,ease:'elastic.inOut',});
     gsap.to("#headline3",{x:200, y:100, duration:1 ,delay:2, repeat:-1, yoyo:true,ease:'elastic.inOut',});
    },[]);
    
    return (
      <Wrapper>
        <Headline id="headline">Bouncy </Headline>
        <Headline id="headline2">Balls</Headline>
        <Headline id="headline3">Balls</Headline>
      </Wrapper>
    );
}

export default App;

const Headline = styled.h2`
  color: black;
  font-family: "Archivo", sans-serif;
  border: 2px solid gray;
  padding:20px;
  border-radius: 50%;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 500px;
`;
