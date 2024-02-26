import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../styles/colors'
import media from '../styles/media'
import text from '../styles/text'
import getPosition from '../utils/getPosition'
import { getDistance } from '../utils/getDistance'
import { getAngle } from '../utils/getAngle'
const BoxPlayground = () => {
  const [currentY, setCurrentY] = useState('250')
  const [currentX, setCurrentX] = useState('250')
  const [indicX, setIndicX] = useState('335px')
  const [indicY, setIndicY] = useState('285px')
  const [elements, setElements] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [currentSelection, setCurrentCollection] = useState([])
  const [activeElementIndex, setIsActiveElementIndex] = useState([])
  const [recentlyDeleted, setRecentlyDeleted] = useState([])
  const [totalIsReady, setTotalIsReady] = useState(false)
  const [setX, setSetX] = useState({
    x1: '',
    x2: '',
  })
  const [setY, setSetY] = useState({
    y1: '',
    y2: '',
  })

  const handleClick = (e) => {
    const newEl = { x: currentX, y: currentY }
    return createElement(newEl)
  }
  const createElement = (elPosition) => {
    const newElement = {
      id: elements.length + 1,
      content: { x: elPosition.x, y: elPosition.y },
      position: {
        x: elPosition.x - 11 / 2,
        y: elPosition.y - 11 / 2,
      },
    }
    setElements((prevElements) => [...prevElements, newElement])
  }
  const handleOnBoundryMove = (e) => {
    if (isActive) {
      return
    }
    const positions = getPosition(e)
    setCurrentY(`${positions.y}`)
    setCurrentX(`${positions.x}`)
    setIndicX(`${positions.y - -80}px`)
    setIndicY(`${positions.x - -35}px`)
  }
  const handleOnBoundryLeave = () => {
    setCurrentX('250')
    setCurrentY('250')
    setIndicY('285px')
    setIndicX('335px')
  }
  const handleIsSelected = (e, index) => {
    if (totalIsReady) {
      setTotalIsReady(false)
      setSetX({ x1: '', x2: '' })
      setSetY({ y1: '', y2: '' })
      setIsHover(false)
      setCurrentCollection([])
      setIsActiveElementIndex([])
      return
    }
    setIsActiveElementIndex((prev) => [...prev, index])
    let x = e.target.attributes.valuex.value
    let y = e.target.attributes.valuey.value
    if (setX.x1 === '' && setY.y1 === '') {
      setSetX((prev) => ({ ...prev, x1: x }))
      setSetY((prev) => ({ ...prev, y1: y }))
    } else {
      setSetX((prev) => ({ ...prev, x2: x }))
      setSetY((prev) => ({ ...prev, y2: y }))
      setTotalIsReady(true)
    }

    setCurrentCollection((prev) => [...prev, { x, y }])
    setIsHover(true)
  }

  const deleteLast = () => {
    let updatedElements = [...elements]
    if (updatedElements.length > 0) {
      setCurrentCollection([])
      let deleted = updatedElements.pop()
      setRecentlyDeleted((prev) => [...prev, deleted])
      setElements(updatedElements)
    }
  }
  const redo = () => {
    let deletedElements = [...recentlyDeleted]
    if (deletedElements.length > 0) {
      let reDoELement = deletedElements.pop()
      setElements((prev) => [...prev, reDoELement])
      setRecentlyDeleted(deletedElements)
    }
  }
  const resetAll = () => {
    setElements([])
    setRecentlyDeleted([])
    setCurrentCollection([])
    setIsActiveElementIndex([])
    setTotalIsReady(false)
    setSetX({ x1: '', x2: '' })
    setSetY({ y1: '', y2: '' })
  }
  // const runHistory = snapshots.map((set, index) => {
  //   return (
  //     <ClickedSet key={set + index}>
  //       <SetBody>{`X : ${set.x} Y : ${set.y}`}</SetBody>
  //     </ClickedSet>
  //   )
  // })
  const runElements = elements.map((element, index) => (
    <NewElement
      key={index}
      onClick={(e) => handleIsSelected(e, index)}
      $active={isActive}
      $isindexed={activeElementIndex.includes(index)}
      valuex={element.content.x}
      valuey={element.content.y}
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
          onMouseMove={(e) => handleOnBoundryMove(e)}
          onMouseLeave={(e) => handleOnBoundryLeave(e)}
          onMouseDown={(e) => !isActive && handleClick(e)}
          $active={isActive}
        >
          {runElements}
          {isHover &&
            currentSelection.map((item, index) => {
              return (
                <ClickedPosition $top={item.x} $left={item.y}>
                  {`( ${index === 0 ? 'A' : 'B'} )`}
                </ClickedPosition>
              )
            })}
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

      <DisplayCalc>
        <Controls>
          <Toggle onClick={() => setIsActive(!isActive)}>
            {'edit mode (on/off)'}
          </Toggle>
          <Toggle onClick={() => resetAll()}>{'reset'}</Toggle>
          <Toggle onClick={() => deleteLast()}>{'Delete last'}</Toggle>
          <Toggle onClick={() => redo()}>{'Redo Delete'}</Toggle>
        </Controls>
        <DistanceCalculater>
          <Equation>
            <NumberSet>
              <Span>Position A:</Span>
              {setX.x1 !== '' && setY.y1 !== ''
                ? ` x:(${setX.x1} px) , y:(${setY.y1} px)`
                : 'select start point'}
            </NumberSet>
            <NumberSet>
              <Span>Position B:</Span>
              {setX.x2 !== '' && setY.y2 !== ''
                ? `x:(${setX.x2} px) , y:(${setY.y2} px)`
                : 'select endpoint'}
            </NumberSet>
            <TotalDistance>
              <Span $result={true}>
                Total{' '}
                <span style={{ color: colors.primaryOrange }}> Distance</span>{' '}
                From A to B ={' '}
              </Span>

              {totalIsReady && (
                <>
                  <Results>
                    {`(${getDistance(setX.x1, setY.y1, setX.x2, setY.y2)} px)`}
                  </Results>
                </>
              )}
              <TotalDistance>
                <Span $result={true}>
                  Total{' '}
                  <span style={{ color: colors.primaryOrange }}> Angle</span>{' '}
                  From A to B ={' '}
                </Span>

                {totalIsReady && (
                  <Results>
                    {`(${getAngle(setX.x1, setY.y1, setX.x2, setY.y2)})`}
                  </Results>
                )}
              </TotalDistance>
            </TotalDistance>
          </Equation>
        </DistanceCalculater>
      </DisplayCalc>
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
  position: relative;
  display: flex;
  top: -25px;
  width: 200px;
`
const NewElement = styled.span.attrs((props) => ({
  style: {
    top: props.$top,
    left: props.$left,
    pointerEvents: props.$active ? 'visible' : 'none',
    backgroundColor: props.$isindexed
      ? `${colors.primaryOrange}`
      : 'transparent',
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
  background-color: ${(props) =>
    props.$isHover ? `${colors.primaryOrange}` : 'transparent'};
  &:hover {
    background-color: green;
  }
`
const ClickedPosition = styled.p.attrs((props) => ({
  style: {
    top: `${props.$left - -8}px`,
    left: `${props.$top - 10}px`,
  },
}))`
  pointer-events: none;
  ${text.bodyMBold}
  position: absolute;
  margin: unset;
  color: black;
`
const Results = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${text.h4};
`
const TotalDistance = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  gap: 10px;
  ${text.bodyMBold};
  color: ${colors.primaryTeal};
`
const Span = styled.h4.attrs((props) => ({
  style: {
    color: props.$result ? `${colors.darkPurple}` : `${colors.primaryPurple}`,
  },
}))`
  ${text.h4}
  margin:unset;
  color: ${colors.primaryPurple};
  align-self: center;
  justify-self: center;
`
const NumberSet = styled.p`
  ${text.bodyMBold}
  margin:unset;
  color: black;
`
const Equation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 25px;
  justify-content: start;
  ${text.bodyMBold};
  color: black;
`
const DistanceCalculater = styled.div`
  display: flex;
  flex-direction: column;
`
const DisplayCalc = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
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
    top: props.$topX ? `${props.$topX}` : `82%`,
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
    left: props.$left ? `${props.$left}px` : '50%',
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
const BoundryWrapper = styled.div`
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
