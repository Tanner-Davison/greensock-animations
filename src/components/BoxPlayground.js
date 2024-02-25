import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../styles/colors'
import media from '../styles/media'
import text from '../styles/text'
import getPosition from '../utils/getPosition'

const BoxPlayground = () => {
  const [currentY, setCurrentY] = useState('250')
  const [currentX, setCurrentX] = useState('250')
  const [indicX, setIndicX] = useState('335px')
  const [indicY, setIndicY] = useState('285px')
  const [snapshots, setSnapShots] = useState([])
  const [elements, setElements] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [isHover, setIsHover]= useState(false)

  const handleClick = (e) => {
    setSnapShots((prev) => [...prev, { x: currentX, y: currentY }])
    const newEl = { x: currentX, y: currentY }

    return handleCreateElement(newEl)
  }
  const handleCreateElement = (elPosition) => {
    // Create a new element object
    const newElement = {
      id: elements.length + 1,
      content: {x: elPosition.x, y:elPosition.y},
      position: { 
        x: elPosition.x - 11 / 2, 
        y: elPosition.y - 11 / 2 },
    }

    // Update the state with the new element
    setElements((prevElements) => [...prevElements, newElement])
  }
  const handleOnMouseMove = (e) => {
    if (isActive) {
      return
    }
    const positions = getPosition(e)

    setCurrentY(`${positions.y}`)
    setCurrentX(`${positions.x}`)
    setIndicX(`${positions.y - -80}px`)
    setIndicY(`${positions.x - -35}px`)
   
  }
  const handleOnMouseLeave = () => {
    setCurrentX('250')
    setCurrentY('250')
    setIndicY('285px')
    setIndicX('335px')
  }
  const handleIsHover=(e)=>{
console.log(e.target.attributes.value.value);
setIsHover(true)

  }
  const runHistory = snapshots.map((set, index) => {
    return (
      <ClickedSet key={set + index}>
        <SetBody>{`X : ${set.x} Y : ${set.y}`}</SetBody>
      </ClickedSet>
    )
  })
  const runElements = elements.map((element, index) => (
    <NewElement
      key={index}
      onMouseOver={(e)=>handleIsHover(e)}
      $active={isActive}
      value={[element.content.x , element.content.y]}
      $top={element.position.y}
      $left={element.position.x}
    />
  ))
  return (
    <Wrapper>
      <BoundryWrapper> 
      <Reader>
        {!isActive
          ? `X : ( ${currentX} ) , Y : ( ${currentY} ) `
          : 'In edit mode '}
      </Reader>
      <Boundry
        onMouseMove={(e) => handleOnMouseMove(e)}
        onMouseLeave={(e) => handleOnMouseLeave(e)}
        onMouseDown={(e) => !isActive && handleClick(e)}
        $active={isActive}
      >
        {runElements}
        <XAxis $top={`${currentY}`} />
        <YAxis $left={`${currentX}`} />
      </Boundry>
        <Indicator className='indicX' $topX={`${indicX}`}>
          {'X'}
        </Indicator>
        <Indicator className='indicY' $topY={`${indicY}`}>
          {'Y'}
        </Indicator>
      </BoundryWrapper>

      <DisplayClicks>
        <Controls>
          <Toggle onClick={() => setIsActive(!isActive)}>
            {'edit mode (on/off)'}
          </Toggle>
          <Toggle
            onClick={() => {
              setElements([])
              setSnapShots([])
            }}
          >
            {'reset'}
          </Toggle>
          <Toggle onClick={() => {
           const updatedElements = [...elements];
           updatedElements.pop();
           setElements(updatedElements);
          }}>
            {'back one'}
          </Toggle>
        </Controls>
        {runHistory}
      </DisplayClicks>
    </Wrapper>
  )
}

export default BoxPlayground

const Toggle = styled.button`
  position: relative;
  top: 5px;
  display: flex;
`
const Controls = styled.div`
  position: absolute;
  display: flex;
  top: 0%;
  width: 200px;
`
const NewElement = styled.span.attrs((props) => ({
  style: {
    top: props.$top,
    left: props.$left,
    pointerEvents: props.$active ? 'visible' : 'none',
  },
}))`
  cursor: pointer;
  display: flex;
  align-self: center;
  justify-self: center;
  position: absolute;
  width: 10px;
  margin: unset;
  height: 10px;
  justify-self: center;
  border-radius: 50px;
  border: 2px solid black;
  z-index: -1;
  &:hover {
    background-color: ${(props) => (props.$active ? 'green' : 'black')};
  }
`
const SetBody = styled.p`
  ${text.bodyMBold}
  margin: unset;
  color: black;
`
const ClickedSet = styled.div`
  display: flex;
  gap: 25px;
`
const DisplayClicks = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  width: 300px;
  border: 2px solid blue;
  padding-top: 40px;
`
const Reader = styled.p`
  ${text.bodyMBold}
  
`
const Indicator = styled.h2.attrs((props) => ({
  style: {
    top: props.$topX ? `${props.$topX }` : `82%`,
    left: props.$topY ? `${props.$topY}` : '1%',
  },
}))`
  pointer-events: none;
  position: absolute;
  margin: unset;
 
  ${text.h2}
`

const YAxis = styled.span.attrs((props) => ({
  style: {
    left: props.$left ? `${props.$left}px`:'50%',
  },
}))`
  pointer-events: none;
  position: absolute;
  height: 500px;
  width: 2px;
  background-color: black;
  z-index: 100;
`

const XAxis = styled.span.attrs((props) => ({
  style: {
    top: props.$top ? `${props.$top}px` : '50%',
  },
}))`
  pointer-events: none;
  position: absolute;
  width: 500px;
  height: 2px;
  background-color: black;
  z-index: 100;
`
const BoundryWrapper= styled.div`
position: relative;
display: flex;
flex-direction: column;


padding: 50px;
`
const Boundry = styled.div.attrs((props) => ({
  style: {
    backgroundColor: props.$active ? 'lightgray' : 'transparent',
  },
}))`
  position: relative;
  display: flex;
  overflow: hidden;
  width: 500px;
  height: 500px;
  border: 2px solid red;
  margin-bottom: 80px;
  background-color: transparent;
  z-index: 100;
`
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0px;
  z-index: 1;
`
