import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import media from '../styles/media'
import colors from '../styles/colors'
import text from '../styles/text'

export const Line = ({ start, end }) => {
  const lineRef = useRef()

  useEffect(() => {
    const lineElement = lineRef.current
    const deltaX = end.x - start.x
    const deltaY = end.y - start.y
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
    console.log(angle)
    lineElement.style.width = `${length}px`
    lineElement.style.transform = `rotate(${angle}deg)`
    lineElement.style.left = `${start.x}px`
    lineElement.style.top = `${start.y}px`
    lineElement.style.transformOrigin = 'top left'
  }, [start, end])

  return <LineEl ref={lineRef} className='line'></LineEl>
}
const LineEl = styled.span`
  pointer-events: none;
  position: relative;
  height: 5px;
  border-radius: 50px;
  background-color: ${colors.primaryOrange};
  
`
