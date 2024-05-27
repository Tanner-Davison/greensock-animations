import React from "react"
import styled from "styled-components"
import media from "../styles/media"
import text from "../styles/text"
import { scrollToElement } from "../utils/scrollTo"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getProgress } from "../utils/getViewportProgress"

gsap.registerPlugin(ScrollTrigger)

const ProgressNav = ({ layout }) => {
  useGSAP(()=>{
      const sections = gsap.utils.toArray(`.slider-section-test`)

      sections.forEach((section, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            end: "bottom bottom",
            scrub: true,
            onUpdate: () => {
              gsap.set(`#slide-${index}`, { width: `${getProgress(section)}%` })
            },
            onRefresh:()=>{
              gsap.set(`#slide-${index}`, { width: `${getProgress(section)}%` })
            }
          },
        })
      })
    },
    { scope: layout, revertOnUpdate: false }
  )
  
  useGSAP(
    () => {
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: layout,
          start: "top top",
          end: "bottom bottom",
          pin: ".pinned-loaders",
          pinSpacing: false,
          pinSpacer:false,
        },
      });
    },
    { scope: layout, revertOnUpdate:true }
  )

  return (
    <ProgressBarContainer className="pinned-loaders">
      <ProgressBarDiv
        className="progress"
        onClick={() => scrollToElement(`.slider-section-test.one`)}
      >
        <ProgressSlider id="slide-0" className={`allBg-slide`} />
        <GuideCount>1</GuideCount>
        Acknowledge the problem
      </ProgressBarDiv>

      <ProgressBarDiv
        className="progress"
        onClick={() => scrollToElement(`.slider-section-test.two`)}
      >
        <ProgressSlider id="slide-1" className={`allBg-slide`} />
        <GuideCount>2</GuideCount>
        Justify the value{" "}
      </ProgressBarDiv>

      <ProgressBarDiv
        className="progress"
        onClick={() => scrollToElement(`.slider-section-test.three`)}
      >
        <ProgressSlider id="slide-2" className={`allBg-slide`} />
        <GuideCount>3</GuideCount>
        Find a solution{" "}
      </ProgressBarDiv>

      <ProgressBarDiv
        className="progress"
        onClick={() => scrollToElement(`.slider-section-test.four`)}
      >
        <ProgressSlider id="slide-3" className={`allBg-slide`} />
        <GuideCount>4</GuideCount>
        Start a free 30-day trial
      </ProgressBarDiv>
    </ProgressBarContainer>
  )
}

export default ProgressNav
const GuideCount = styled.div`
  ${text.bodyXSBold}
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #7e5fdd;
  color: white;
  width: 1.458vw;
  height: 1.458vw;
  border-radius: 0.278vw;

  ${media.fullWidth} {
    width: 21px;
    height: 21px;
    border-radius: 4px;
  }

  ${media.tablet} {
    width: 2.051vw;
    height: 2.051vw;
    border-radius: 0.391vw;
  }

  ${media.mobile} {
    width: 4.907vw;
    height: 4.907vw;
    border-radius: 0.935vw;
  }
`
const ProgressSlider = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0%;
  background: rgba(126, 95, 221, 0.3);
  border-radius: 0.278vw;

  ${media.fullWidth} {
    border-radius: 4px;
  }

  ${media.tablet} {
    border-radius: 0.391vw;
  }

  ${media.mobile} {
    border-radius: 0.935vw;
  }
`

const ProgressBarDiv = styled.div`
  position: relative;
  ${text.bodySBold}
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: #f5f4f7;
  text-wrap: nowrap;
  padding: 0.556vw;
  width: 15.139vw;
  height: 3.889vw;
  border-radius: 0.278vw;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  ${media.fullWidth} {
    padding: 8px;
    width: 218px;
    height: 56px;
    border-radius: 4px;
  }

  ${media.tablet} {
    padding: 0.781vw;
    width: 21.289vw;
    height: 5.469vw;
    border-radius: 0.391vw;
  }

  ${media.mobile} {
    padding: 1.869vw;
    width: 50.935vw;
    height: 13.084vw;
    border-radius: 0.935vw;
  }
`

const ProgressBarContainer = styled.div`
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  margin: 20px 20%;
  gap: 0.833vw;
  z-index: 150;
`
