import { useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

function App() {
  useEffect(() => {
    gsap.to(
      "#headline",
      {
        x: -200,duration: 1, repeat:-1, yoyo:true,
      });
    gsap.fromTo("#headline2",{
      x:200, duration:1 , repeat:-1, yoyo:true,
    })
  
    }, []);
    
    return (
    <Wrapper>
      <Headline id="headline">Bouncy </Headline>
      <Headline id="headline2">Balls</Headline>
     
    </Wrapper>
  );
}

export default App;

const Headline = styled.h2`
  color: black;
  font-family: "Archivo", sans-serif;
  border: 2px solid gray;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;
