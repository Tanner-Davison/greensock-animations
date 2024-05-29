import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import media from '../styles/media'
import text from '../styles/text'

const NavigationBar = () => {
  const container = useRef()
  const linkItem = useRef()
  const { contextSafe } = useGSAP({ scope: container })
  const navigate = useNavigate()

  const links = [
    { name: 'Home', link: '/' },
    { name: 'My Custom Tools', link: '/box-playground' },
    { name: 'Meta-Lookup', link: '/meta-lookup' },
  ]

  const tweenOn = contextSafe((index) => {
    const targetElement = container.current.querySelector(`.linkItem${index}`)
    const dotTarget = container.current.querySelector(`.dot${index}`)
    gsap.to(targetElement, { color: 'green' })
    gsap.to(dotTarget, {
      scale: 1.8,
      rotate: 360,
      transformOrigin: '120% 60%',
      borderRadius: '25%',
      backgroundColor: 'green',
      ease: 'back.inOut',
    })
  })
  const tweenOff = contextSafe((index) => {
    gsap.to(`.linkItem${index}`, { color: 'black' })
    gsap.to(`.dot${index}`, {
      scale: 1,
      rotate: 0,
      transformOrigin: '120% 60%',
      borderRadius: '50%',
      backgroundColor: 'black',
      ease: 'back.inOut',
    })
  })

  const NavLinks = links.map((link, index) => {
    return (
      <LinkItem
        key={index}
        className={`linkItem linkItem${index}`}
        onMouseOver={() => tweenOn(index)}
        onMouseLeave={() => tweenOff(index)}
        onClick={() => navigate(link.link)}
        ref={linkItem}
      >
        <Dot className={`dot dot${index}`} />
        <LinkName> {link.name}</LinkName>
      </LinkItem>
    )
  })
  useGSAP(
    () => {
      gsap.config({
        nullTargetWarn: false,
      })
      gsap.to('.nav-bar', {
        scrollTrigger: {
          trigger: '.nav-bar',
          start: 'top top',
          endTrigger: '.end-home-trigger',
          pin: true,
          pinSpacing: false,
          pinSpacer: false,
        },
      })
    },
    { scope: container, revertOnUpdate: false },
  )
  return (
    <Wrapper className='nav-bar' ref={container}>
      {NavLinks}
    </Wrapper>
  )
}

export default NavigationBar
const Dot = styled.div`
  display: flex;
  width: 0.6vw;
  height: 0.4vw;
  background-color: black;
  border-radius: 50px;
  border: 1px solid transparent;
`
const LinkName = styled.h4`
  ${text.h4}
  margin:unset;
  cursor: pointer;
`
const LinkItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vw;
  color: black;
  align-items: center;
`
const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  justify-self: center;
  height: 5vw;
  width: 99%;
  padding-left: 10px;
  gap: 5.083vw;
  z-index: 1000;
  ${media.fullWidth} {
    gap: 73px;
    height: 72px;
    justify-self: center;
  }

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`
