import React, {useEffect} from 'react'
import NavigationBar from './NavigationBar'
import styled from 'styled-components';
import media from '../styles/media';
import colors from '../styles/colors';
import text from '../styles/text';
import {gsap} from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
const AnimationTest = () => {
const boxes = new Array(6).fill('')
const runBoxes = boxes.map((box, index)=>{
  return(
  <Box key={index}id={`boxes`} className='boxClass'></Box>
  )
})
useEffect(() => {
    const elements = gsap.utils.toArray('.boxClass')
    const oddElements = elements.filter((item,index)=> index % 2 === 1)
    const evenElements = elements.filter((item, index)=> index %2 ===0)
    const groupOne = [oddElements[0],evenElements[0]]
    const groupTwo = [oddElements[1],evenElements[1]]
    const groupThree = [oddElements[2],evenElements[2]]
    const boxesDiv = document.querySelector('.boxesDiv')
    gsap.set(elements,{xPercent:-1200,scale:.8, yPercent:0})
    const boxTl = gsap.timeline({
      paused:false,
      scrollTrigger:{
        markers:true,
        start: 'top top'}
      })
    boxTl.to(elements,{ xPercent:0, duration: 1, stagger: .3, ease:'back.inOut' })
          .to(boxesDiv, {gap:'0px 20px'},'<')
          .to(oddElements,{yPercent: -105, duration:1},'-=.5')
          .to(evenElements, {xPercent:100, duration:1},'-=.4')
          .to(boxesDiv,{gap:'20px 0px'},'<')
          .to(elements,{duration:2, rotation:360, borderRadius:'50px', transformOrigin:"50% 50% -400px"})
          .to(groupOne, {yPercent: 150,borderColor:'blue', ease: 'back.inOut'},'-=.5')
          .to(groupTwo, {yPercent: 150,borderColor:'red', ease: 'back.inOut'})
          .to(groupThree, {yPercent: 150,borderColor:'purple', ease: 'back.in'})
          .to(elements,{xPercent:0, duration:.2, stagger:.2},'<+=.5')
          .to(groupThree[0],{xPercent:200, duration:.2})
          .to(groupThree[1],{xPercent:300,duration:.2})
          .to(groupTwo[0],{xPercent:400,duration:.2})
          .to(groupTwo[1],{xPercent:500,duration:.2})
          .to(groupOne[0],{xPercent:600,duration:.2})
          .to(groupOne[1],{xPercent:650, duration:.4, ease:'back.in'})
          .to(groupOne[1],{yPercent:0, xPercent:0,duration:.3,stagger:.3, scale:1})
          .to([groupOne[0], groupTwo,groupThree],{x:-500, duration:.3})
          // .add('test')
          .to(groupOne[0],{yPercent:-45, scale:1, ease:'back.inOut',rotate:270,transformOrigin:'50% 50%', borderRadius:'0px' ,duration:.3})
          .to([groupTwo,groupThree],{x:-400, duration:.3,ease:'back.inOut'},'<')
          .to(groupTwo[0],{yPercent:30, scale:1, ease:'back.inOut',rotate:270,transformOrigin:'50% 50%', borderRadius:'50px',duration:.3})
          .to([groupTwo[1],groupThree],{x:-300, duration:.3,ease:'back.inOut'},'<')
          .to(groupTwo[1],{yPercent:-45, scale:1, ease:'back.inOut',rotate:270,transformOrigin:'50% 50%', borderRadius:'0px',duration:.3})
          .to([groupThree],{x:-200, duration:.3,ease:'back.inOut'},'<')
          .to(groupThree[0],{yPercent:30, scale:1, ease:'back.inOut',rotate:270,transformOrigin:'50% 50%', borderRadius:'50px',duration:.3})
          .to(groupThree[1],{x:-100, duration:.3,ease:'back.inOut'},'<')
          .to(groupThree[1],{yPercent:-45, scale:1, ease:'back.inOut',rotate:270,transformOrigin:'50% 50%', borderRadius:'0px',duration:.3})
          .to(elements,{xPercent:0, yPercent:0,x:0,y:0, duration:2,borderRadius:15, ease:'back.in'})
          // boxTl.play('test')
}, []);
  return (
    <>
    <NavigationBar />
    <Wrapper>
      <BoxesWrapper className={'boxesDiv'}>
    {runBoxes}
    </BoxesWrapper>
    </Wrapper>

    </>
  )
}

export default AnimationTest

const Box = styled.div`
position: relative;
display: flex;
width: 6.944vw;
height: 6.944vw;
border:2px solid black;
`
const BoxesWrapper= styled.div`
position: relative;
display: flex;
justify-content: center;
width:100%;
height:600px;
overflow: hidden;
padding:100px 0px;
`
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
max-width:100vw;
`