import { gsap } from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { codeLogosArray } from '../images/codeLogos/codeLogosObj'
import colors from '../styles/colors'
import media from '../styles/media'
import text from '../styles/text'
import {
  CarouselButtonLeft,
  CarouselButtonRight,
  GlobalLinkButton,
} from './Buttons/Buttons'

const CustomCarousel = ({scrollto}) => {
  const [isHover, setHover] = useState(false)
  const count = useRef(0)
  const [displayName, setDisplayName] = useState(
    codeLogosArray[count.current].language,
  )
  const targets = useRef([])

  useEffect(() => {
    targets.current = document.querySelectorAll('.box')
    gsap.set(targets.current, { xPercent: 100, opacity: 0 })
    gsap.set(targets.current[0], { xPercent: 0, opacity: 1 })
    // button Elements
    const moveRight = document.getElementById('rightArrow')
    const moveLeft = document.getElementById('leftArrow')
    const controls = document.getElementById('controls')
    gsap.set(moveRight, { xPercent: 0 })
    gsap.set(moveLeft, { xPercent: 0 })
    gsap.set(controls, { xPercent: 0 })
  }, [])
  function slideOneNext() {
    gsap.to(targets.current[count.current], {
      duration: 1.3,
      xPercent: -125,
      opacity: 0,
      zIndex: -10,
      ease: 'circ.out',
    })

    count.current =
      count.current < targets.current.length - 1 ? count.current + 1 : 0

    setDisplayName(codeLogosArray[count.current].language)
    gsap.fromTo(
      targets.current[count.current],
      { xPercent: 100, opacity: 1, zIndex: -10 },
      { duration: 0.8, xPercent: 0, opacity: 1, zIndex: 0, ease: 'smooth' },
    )
  }

  function slideOnePrev() {
    gsap.to(targets.current[count.current], {
      duration: 1.3,
      xPercent: 100,
      opacity: 0,
      zIndex: -10,
      ease: 'circ.out',
    })

    count.current =
      count.current > 0 ? count.current - 1 : targets.current.length - 1

    setDisplayName(codeLogosArray[count.current].language)
    gsap.fromTo(
      targets.current[count.current],
      { xPercent: -100, opacity: 1, zIndex: -10 },
      { duration: 0.8, xPercent: 0, opacity: 1, zIndex: 0, ease: 'circ.Out' },
    )
  }

  const handleClickLeft = () => {
    const moveLeft = document.getElementById('leftArrow')
    const controls = document.getElementById('controls')
    gsap.fromTo(
      controls,
      { xPercent: 0 },
      {
        xPercent: -15,
        duration: 0.3,
        onComplete: () => {
          gsap.to(controls, { xPercent: 0, duration: 0.3 })
        },
      },
    )
    gsap.fromTo(
      moveLeft,
      {
        xPercent: 0,
        y: 0,
        rotation: 0,
        fill: `${colors.orange200}`,
        strokeWidth: '2',
      },
      {
        xPercent: -35,
        ease: 'power1.out',
        duration: 0.2,
        strokeWidth: '2',
        onComplete: () => {
          gsap.to(moveLeft, {
            xPercent: 0,
            yPercent: 0,
            ease: 'smooth',
            fill: 'transparent',
          })
        },
      },
    )
    slideOnePrev()
  }

  const handleClickRight = () => {
    const moveRight = document.getElementById('rightArrow')
    const controls = document.getElementById('controls')
    gsap.fromTo(
      controls,
      { xPercent: 0 },
      {
        xPercent: 15,
        duration: 0.3,
        onComplete: () => {
          gsap.to(controls, { xPercent: 0, duration: 0.3 })
        },
      },
    )
    gsap.fromTo(
      moveRight,
      {
        xPercent: 0,
        y: 0,
        rotation: 0,
      },
      {
        xPercent: 34,
        fill: `${colors.orange200}`,
        duration: 0.2,
        ease: 'smooth',

        onComplete: () => {
          gsap.to(moveRight, {
            xPercent: 0,
            yPercent: 0,
            fill: 'transparent',
            ease: 'smooth',
          })
        },
      },
    )
    slideOneNext()
  }
  const runImgs = codeLogosArray.map((imgObj, index) => {
    return (
      <BoxItem
        key={imgObj.id}
        className={`box box${index < 9 ? '0' : ''}${index + 1}`}
      >
        <Image $srcurl={imgObj.img} $altTag={imgObj.img} />
        <ContentDiv>
          <ContentHeadline>{imgObj.Header}</ContentHeadline>
          <ContentBody>{imgObj.Body}</ContentBody>
          <GlobalLinkButton
            isHover={isHover}
            onMouseLeave={() => {
              setHover(false)
            }}
            onClick={() => scrollto('imageBoxUnique')}
            onMouseOver={() => setHover(true)}
            size={text.mediaMBold}
            color={colors.primaryOrange}
          >
            Learn More
          </GlobalLinkButton>
        </ContentDiv>
      </BoxItem>
    )
  })

  return (
    <Wrapper className={'wrapper'}>
      <BoxContainer>
        <DisplayDataDiv >{runImgs}</DisplayDataDiv>
      </BoxContainer>
      <Controls id={'controls'}>
        <CarouselButtonLeft id={'arrowLeft'} onClick={() => handleClickLeft()}>
          Prev
        </CarouselButtonLeft>
        <StyledData>{displayName}</StyledData>
        <CarouselButtonRight
          id={'arrowRight'}
          onClick={() => handleClickRight()}
        >
          Next
        </CarouselButtonRight>
      </Controls>
    </Wrapper>
  )
}

export default CustomCarousel

const StyledData = styled.p`
  ${text.bodyMBold};
  color: ${colors.black};
`
const ContentBody = styled.p`
  ${text.bodyM}
  color:black;
  margin: unset;
`
const ContentHeadline = styled.h1`
  ${text.h1}
  margin:unset;
`
const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 1.736vw;
  width: 75%;
`
const Image = styled.div`
  display: flex;
  background-image: ${(props) =>
    props.$srcurl ? `url(${props.$srcurl})` : `unset`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 25.833vw;
  height: 25.833vw;
`
const BoxItem = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 25px;
  gap: 50px;
`
const DisplayDataDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 900px;
  height: 500px;
  z-index: 0;
  border-radius: 1.667vw;
  gap: 1.389vw;
`
const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1.667vw;
`
const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px groove white;
  background-color: ${colors.grey};
  transition: box-shadow 0.3s ease-in-out;
  box-shadow: 0px 4px 19px ${colors.grey200};
  gap: 1.389vw;
  border-radius: 1.389vw;
  &:hover {
    border: 1px groove whitesmoke;
    box-shadow: 0px 4px 19px ${colors.grey200};
  }
  ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
    gap: 1.402vw;
    border-radius: 3.505vw;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3.472vw 5.556vw;
  ${media.fullWidth} {
    padding: 50px 0px;
  }

  ${media.tablet} {
    padding: 3.906vw 0vw;
  }

  ${media.mobile} {
    padding: 14.019vw 0vw;
  }
`
