import { useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";


function App() {
 
  const play = ()=>{
    gsap.to('#headline',{duration:3, x:200, ease:"linear"})
  }
  const reverse = ()=>{
    gsap.to('#headline',{duration:3, x:-200, ease:"linear" })
  }
  const restart = () =>{
    gsap.to('#headline', {restart:true})
  }
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

        <Wrapper>
       
          <Headline className={"allBalls"} id="headline3">
            Balls
          </Headline>
          <Headline className={"allBalls"} id="headline3">
            Balls
          </Headline>
          <Headline className={"allBalls"} id="headline3">
            Balls
          </Headline>
        </Wrapper>
      </Wrapper>
    );
}

export default App;
const Controls = styled.div`
display:flex;
width:100px;
height: 100px;
outline:3px solid black;
align-items: center;
justify-content: center;
`
const ControlWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap:10px;
`
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
  flex-direction: column;
  gap:100px;
  width: 100vw;
  
`;
