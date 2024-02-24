import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import colors from '../styles/colors'
import media from '../styles/media'
import text from '../styles/text'
import getPosition from '../utils/getPosition'

const BoxPlayground = () => {
  const [currentY, setCurrentY] = useState('50%')
  const [currentX, setCurrentX] = useState('50%')
  const [indicX, setIndicX] = useState(`${250 - 25}px`)
  const [indicY, setIndicY] = useState(`${250 - 13}px`)
  const [snapshots, setSnapShots] = useState([])
  const [elements, setElements]= useState([])
  
  

  
  const handleClick = (e) => {
    setSnapShots((prev) => [...prev, { x: currentX, y: currentY }])
    const newEl = {x: currentX, y: currentY};

    return handleCreateElement(newEl);
  }
  const handleCreateElement = (elPosition) => {
    // Create a new element object
    const newElement = {
      id: elements.length + 1,
      content: `New Element ${elements.length + 1}`,
      position: {x: elPosition.x , y:elPosition.y}
    };

    // Update the state with the new element
    setElements(prevElements => [...prevElements, newElement]);
  };
  const handleOnMouseMove = (e) => {
    const positions = getPosition(e)
    setCurrentY(`${positions.y}px`)
    setCurrentX(`${positions.x}px`)
    setIndicX(`${positions.y - 25}px`)
    setIndicY(`${positions.x - 13}px`)
    return
  }
  const handleOnMouseLeave = () => {
    setCurrentX('50%')
    setCurrentY('50%')
    setIndicY(`${250 - 13}px`)
    return setIndicX(`${250 - 22}px`)
  }

  const runHistory = snapshots.map((set, index) => {
    return (
      <ClickedSet key={set+index}>
        <SetBody>{`X : ${set.x} Y : ${set.y}`}</SetBody>
      </ClickedSet>
    )
  })
  const runElements = elements.map((element, index)=>{
    return(
        <NewElement
        key={element.id}
        $top={element.position.y} $left={element.position.x}/>
    )
  })
  return (
    <Wrapper>
      <Reader>{`X : ( ${currentX} ) , Y : ( ${currentY} ) `}</Reader>
      <Boundry
        onMouseMove={(e) => handleOnMouseMove(e)}
        onMouseLeave={() => handleOnMouseLeave()}
        onMouseDown={() => handleClick()}
      >
        <XAxis $top={`${currentY}`} />
        <Indicator className='indicX' $topX={`${indicX}`}>
          {'X'}
        </Indicator>
        <Indicator className='indicY' $topY={`${indicY}`}>
          {'Y'}
        </Indicator>
        <YAxis $left={`${currentX}`} />
        {runElements}
      </Boundry>
      <DisplayClicks>{runHistory}</DisplayClicks>
    </Wrapper>
  )
}

export default BoxPlayground
const NewElement = styled.span.attrs((props)=>({
style:{
top: props.$top,
left: props.$left,
},
}))`
pointer-events: none;
position: absolute;
width:10px;
margin:unset;
height: 10px;
justify-self:center;
background-color: black;
border-radius: 50px;
z-index:5;
`
const SetBody = styled.p`
  ${text.bodyLBold}
  margin: unset;
  color: black;
`
const ClickedSet = styled.div`
  display: flex;
  gap: 25px;
`
const DisplayClicks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  border: 2px solid blue;
`
const Reader = styled.p`
  ${text.bodyMBold}
`
const Indicator = styled.h2.attrs((props) => ({
  style: {
    top: props.$topX ? `${props.$topX}` : `510px`,
    left: props.$topY ? `${props.$topY}` : '-50px',
  },
}))`
  pointer-events: none;
  position: absolute;
  margin: unset;
  align-self: center;
  ${text.h2}
`

const YAxis = styled.span.attrs((props) => ({
  style: {
    left: props.$left && `${props.$left}`,
  },
}))`
  pointer-events: none;
  position: absolute;
  height: 500px;
  width: 3px;
  background-color: black;
  z-index: 100;
`

const XAxis = styled.span.attrs((props) => ({
  style: {
    top: props.$top ? `${props.$top}` : '50%',
  },
}))`
  pointer-events: none;
  position: absolute;
  width: 500px;
  height: 3px;
  background-color: black;
  z-index: 100;
`
const Boundry = styled.div`
  position: relative;
  display: flex;
  width: 500px;
  height: 500px;
  border: 2px solid red;
  margin-bottom: 80px;
  z-index: 1;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0px;
`
