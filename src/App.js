import { useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

function App() {
  useEffect(() => {
    gsap.to('.allBalls',{y:-100, stagger:{
      amount:0.2,
      from:"edges"
    }})
    gsap.to("#headline",{x: -200, y:100, duration: 1, repeat:-1, yoyo:true, ease:'elastic.inOut'});
    gsap.to("#headline2",{x:200,y:100, duration:1 ,delay:1, repeat:-1, yoyo:true,ease:'elastic.inOut',});
     gsap.to("#headline3",{x:200, y:100, duration:1 ,delay:2, repeat:-1, yoyo:true,ease:'elastic.inOut',});
    },[]);
    
    return (
      <Wrapper>
        <Headline className={"allBalls"} id="headline">
          Bouncy{" "}
        </Headline>
        <Headline className={"allBalls"} id="headline2">
          Balls
        </Headline>
        <Headline className={"allBalls"} id="headline3">
          Balls
        </Headline>
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
