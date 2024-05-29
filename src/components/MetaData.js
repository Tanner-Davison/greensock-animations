import axios from 'axios'
import cheerio from 'cheerio'
import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import downloadIcon from '../images/downloadIcon.png'
import preDownload from '../images/preDownload.png'
import saveFill from '../images/saveFill.png'
import saveNoFill from '../images/saveNoFill.png'
import media from '../styles/media'
import text from '../styles/text'
import gsap from 'gsap'
import colors from '../styles/colors'
import TypingComp from '../utils/TypingComp'
import truncateText from '../utils/truncateText'
import { useGSAP } from '@gsap/react'
const MetaData = () => {
  const [searchUrl, setSearchUrl] = useState('')
  const [searchPath, setSearchPath] = useState('')
  const [domain, setDomain] = useState('.com')
  const [isLoading, setIsLoading] = useState(false)
  const [isError,setIsError]= useState(false)
  const [metaImages, setMetaImages] = useState([])
  const [isHover, setIsHover] = useState('')
  const [saveIconHover, setSaveIconHover] = useState(false)
  const [downloadIsHover, setDownloadIsHover] = useState(false)
  const [metaData, setMetaData] = useState({
    title: 'Look up any site',
    description: 'All public Images will display below!',
  })
  const shapesRef = useRef(null)
  const runShapes = new Array(5).fill().map((num) => {
    return (
      <>
        <Triangle className='geo-item' />
        <TriangleTwo className='geo-item' />
        <Circle className='geo-item' />
      </>
    )
  })
  const fetchMetaData = async (searchUrl, searchExtendedUrl, domain) => {
    setMetaData({ title: '', description: '', alt: '' })
    setIsLoading(true)
    setMetaImages([])

    try {
      const response = await axios.get('http://localhost:5002/proxy', {
        params: { searchUrl, searchExtendedUrl, domain },
      })
      const $ = cheerio.load(response.data)
      const title = $('title').text()
      const description = $('meta[name="description"]').attr('content') || ''

      setMetaData((prevData) => ({
        ...prevData,
        title: title || 'No Data Found',
        description:
          description ||
          'Some websites may restrict access to their metadata to protect user privacy. Metadata can sometimes contain personally identifiable information or other sensitive data that the website owner wants to keep private.',
      }))
      $('img').each((index, element) => {
        let src = $(element).attr('src')
        let delayedUrl = $(element).attr('data-delayed-url')
        let delayedSrc = $(element).attr('data-src')
        let altTag = $(element).attr('alt')

        if (delayedSrc && delayedSrc.trim() !== '') {
          setMetaImages((prev) => [
            ...prev,
            { dataSource: delayedSrc, alt: altTag },
          ])
        } else if (src && src.trim() !== '') {
          setMetaImages((prev) => [...prev, { dataSource: src, alt: altTag }])
        } else if (delayedUrl && delayedUrl.trim() !== '') {
          setMetaImages((prev) => [
            ...prev,
            { dataSource: delayedUrl, alt: altTag },
          ])
        }
        
      })
    } catch (error) {
      console.error('Error fetching meta data:', error)
      setIsError(true)
      setMetaData({
        title: 'Request-Denied',
        description:
          'Some websites may restrict access to their metadata to protect user privacy. Metadata can sometimes contain personally identifiable information or other sensitive data that the website owner wants to keep private.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageSave = async (imgSrc, imageAlt) => {
    const imageUrl = imgSrc
    const removedSpaces = [...imageAlt].reduce(
      (acc, char) => (char === ' ' ? acc : acc + char),
      '',
    )
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = removedSpaces.substring(0, 12) + '...'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    } catch (error) {
      console.log('error downloading image, : ', error)
    }
  }

  const chunkArray = (array, maxSize) => {
    const chunks = []
    for (let i = 0; i < array.length; i += maxSize) {
      chunks.push(array.slice(i, i + maxSize))
    }
    return chunks
  }
  const chunky = chunkArray(metaImages, metaImages.length)

  const webImages = chunky.map((chunk, index) => {
    const sortedChunk = chunk?.slice().sort((a, b) => {
      const altA = a.alt?.toLowerCase()
      const altB = b.alt?.toLowerCase()
      if (altA < altB) return -1
      if (altA > altB) return 1
      return 0
    })
    return (
      <ChunkDiv key={index} className='chunk-div'>
        {sortedChunk.map((img, innerIndex) => {
          return (
            <ImageWrapper
              key={innerIndex}
              onMouseEnter={() => setIsHover(innerIndex)}
              onMouseLeave={() => setIsHover(false)}
            >
              <Img
                src={img.dataSource}
                data-source={img.dataSource}
                alt={img.alt}
              />
              <AltAndButtonsWrapper>
                <DisplayAlt>
                  {img?.alt !== ''
                    ? truncateText(img.alt, 35)
                    : 'Description: Not Found'}
                </DisplayAlt>
                <ImgIconsWrapper $isHover={isHover === innerIndex}>
                  <AddToCollection
                    value={img?.dataSource}
                    src={saveIconHover ? saveFill : saveNoFill}
                    onMouseOver={(e) => setSaveIconHover(true)}
                    onMouseLeave={() => setSaveIconHover(false)}
                    alt={'moreIcon'}
                  />
                  <Save
                    value={img?.dataSource}
                    src={downloadIsHover ? downloadIcon : preDownload}
                    onMouseOver={() => setDownloadIsHover(true)}
                    onMouseLeave={() => setDownloadIsHover(false)}
                    alt={'saveIcon'}
                    onClick={() => handleImageSave(img.dataSource, img.alt)}
                  />
                </ImgIconsWrapper>
              </AltAndButtonsWrapper>
            </ImageWrapper>
          )
        })}
      </ChunkDiv>
    )
  })
  useGSAP(
    () => {
      const elTarget = document.querySelector('.meta-search-container')
      const endTarget = document.querySelector('.chunk-div')
      if(metaImages.length<1){
        return
      }
      const enteredTl = gsap.timeline({ paused: true })
      enteredTl
        .to(elTarget, {
          height: '62px',
          overflow: 'hidden',
          padding: '0px',
          top: '73px',
        })
        .to('.meta-search-bar', { padding: '0px', left: '0px' }, 0)

      if (metaImages.length > 5) {
        elTarget.addEventListener('mouseover', () => enteredTl.reverse())
        elTarget.addEventListener('mouseleave', () => enteredTl.play())
      }

      const pinnedTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: elTarget,
          start: 'top top',
          endTrigger: endTarget,
          end: 'bottom bottom',
          onEnter: () => enteredTl.play(),
          onLeaveBack: () => enteredTl.reverse(),
          onEnterBack: () => enteredTl.reverse(),
        },
      })

      pinnedTimeline.play()
    },
    {
      scope: '.meta-data-wrapper',
      dependencies: [metaImages],
      revertOnUpdate: true,
    },
  )

  useGSAP(
    () => {
      const geoItems = gsap.utils.toArray('.geo-item')
     
      const animationDuration = 0.5
      const geoTimeline = gsap
        .timeline({
          paused: false,
          defaults: {
            yoyo: true,
            ease: 'sine.inOut',
            duration: animationDuration,
          },
        })
        .to(geoItems, { y: '8px', scale: 0.9, rotate: 90, stagger: 0.05 })
        .to(geoItems, { y: '0px', scale: 1, rotate: 0, stagger: 0.05 })
        .repeat(-1)
        if(isError && !isLoading){
          geoTimeline.pause()
        }else{
          geoTimeline.play()
        }
    },
    { scope: '.meta-data-wrapper', revertOnUpdate:true , dependencies:[isLoading, isError]},
  )

  return (
    <Wrapper className='meta-data-wrapper'>
      <SearchContainer
        htmlFor={'metaUrlInput'}
        className='meta-search-container'
      >
        <SearchBar className='meta-search-bar'>
          www.
          <UrlInput
            id={'metaUrlInput'}
            type='text'
            value={searchUrl}
            placeholder='website'
            onChange={(e) => setSearchUrl(e.target.value)}
          />
          <Select value={domain} onChange={(e) => setDomain(e.target.value)}>
            <DomainOption value={'.com'}>.com</DomainOption>
            <DomainOption value={'.io'}>.io</DomainOption>
            <DomainOption value={'.org'}>.org</DomainOption>
            <DomainOption value={'.edu'}>.edu</DomainOption>
            <DomainOption value={'.tv'}>.tv</DomainOption>
          </Select>
          <UrlInput
            id={'metaUrlInputSecond'}
            type='text'
            value={searchPath}
            placeholder='path extension'
            onChange={(e) => setSearchPath(e.target.value)}
          />
          <SubmitUrl
            type='button'
            onClick={() => fetchMetaData(searchUrl, searchPath, domain)}
          >
            {' '}
            Get Meta Data
          </SubmitUrl>
        </SearchBar>
        <MetaHeaderWrapper>
          {isLoading && <TypingComp>{searchUrl}</TypingComp>}
          {!isLoading && (
            <>
              <MetaTitle className='metadata-title'>{metaData.title}</MetaTitle>
              <MetaDescription className='metadata-body'>
                {metaData.description}
              </MetaDescription>
            </>
          )}
          {metaImages.length === 0 && (
            <TrianglesWrapper ref={shapesRef}>{runShapes}</TrianglesWrapper>
          )}
        </MetaHeaderWrapper>
      </SearchContainer>

      <AllImagesWrapper>{webImages}</AllImagesWrapper>
    </Wrapper>
  )
}

export default MetaData
const Circle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 6px;
  background-color: lightblue;
`
const TriangleTwo = styled.div`
  width: 2px;
  height: 0;
  border-top: 15px solid black;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-radius: 5px;
`

const Triangle = styled.div`
  width: 2px;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid red;
  border-radius: 5px;
`

const TrianglesWrapper = styled.div`
  display: flex;
`

const DisplayAlt = styled.p`
  ${text.bodyMBold}
  text-align: center;
`

const AddToCollection = styled.img`
  cursor: pointer;
  width: 25px;
  transition: transform 0.1s ease-in;
  &:hover {
    transform: scale(1.1);
  }
`

const Save = styled.img`
  cursor: pointer;
  width: 25px;
  transition: transform 0.1s ease-in;
  &:hover {
    transform: scale(1.1);
  }
`

const AltAndButtonsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const ImgIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  transition: opacity 0.2s ease-in-out;
  opacity: ${(props) => (props.$isHover ? '100' : '0')};
  padding-bottom: 10px;
  padding-right: 10px;
`

const Img = styled.img`
  position: relative;
  width: 100%;
  max-width: 400px;
  min-width: 50px;
  height: auto;
  ${media.fullWidth} {
    max-width: 400px;
    min-width: 50px;
  }

  ${media.tablet} {
    max-width: 15.766vw;
    min-width: 4.883vw;
  }

  ${media.mobile} {
  }
`

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const MetaDescription = styled.p`
  ${text.bodyM}
`

const MetaTitle = styled.h3`
  ${text.h3}
  margin:unset;
`

const MetaHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.736vw;
  width: 50vw;
  border: 2px inset #71706e;
  color: ${colors.white};
  background-color: hsla(224, 3%, 19%, 1);
  border-radius: 1.25vw;
  -webkit-box-shadow: 5px 5px 5px 0px #000000, inset 4px 4px 15px 0px #000000,
    inset 5px 5px 15px 5px rgba(255, 255, 255, 0);
  box-shadow: 5px 5px 5px 0px #fffefe, inset 4px 4px 15px 0px #000000,
    inset 5px 5px 15px 5px rgba(255, 255, 255, 0);
  ${media.fullWidth} {
    padding: 25px;
    width: 720px;
    border-radius: 25px;
  }

  ${media.tablet} {
    padding: 2.441vw;
    width: 70.313vw;
    border-radius: 2.441vw;
  }

  ${media.mobile} {
    padding: 5.841vw;
    width: 105.14vw;
    border-radius: 5.841vw;
  }
`

const ChunkDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
  flex-wrap: wrap;
  height: auto;
  gap: 50px 10px;
  ${media.fullWidth} {
    height: 685px;
  }

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`

const AllImagesWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: white;
  max-width: 100%;
  margin-top: 300px;
`

const SubmitUrl = styled.button`
  ${text.bodyMBold}
  cursor: pointer;
  border-radius: 10px;
  border: 1px outset gray;
  padding: 2px 8px;
  color: black;
  box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.5),
    0px 1px 3px rgba(0, 0, 0, 0.3);

  background: linear-gradient(
    top,
    rgba(38, 38, 38, 0.8),
    #e6e6e6 25%,
    #ffffff 38%,
    #c5c5c5 63%,
    #f7f7f7 87%,
    rgba(38, 38, 38, 0.8)
  );
  background: -webkit-linear-gradient(
    top,
    rgba(38, 38, 38, 0.5),
    #e6e6e6 45%,
    #ffffff 48%,
    rgba(0, 0, 0, 0.25) 63%,
    #e6e6e6 87%,
    rgba(38, 38, 38, 0.4)
  );
  transition: transform 0.3s ease-in-out;
  &:hover {
    border: 1px inset gray;
    transform: scale(0.95);
  }
`

const DomainOption = styled.option`
  ${text.bodyMBold};
`

const Select = styled.select`
  ${text.bodyMBold};
`

const UrlInput = styled.input`
  ${text.bodyM}
  padding-left:.5vw;
  margin: 20px 3px 20px 3px;
  border: 2px solid black;
  border-radius: 10px;
`

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const SearchContainer = styled.div`
  ${text.bodyMBold}
  position:fixed;
  display: flex;
  height: fit-content;
  flex-direction: column;
  align-items: center;
  background-color: hsla(224, 10%, 10%, 1);
  color: black;
  border: 1px ridge silver;
  top: 9%;
  border-radius: 12px;
  padding: 2.014vw 5vw;
  z-index: 500;
  background-size: 75px 420px;

  background-image: -webkit-repeating-linear-gradient(
      left,
      hsla(0, 0%, 100%, 0) 0%,
      hsla(0, 0%, 100%, 0) 6%,
      hsla(0, 0%, 100%, 0.1) 7.5%,
      hsla(0, 0%, 100%, 0) 9%
    ),
    -webkit-repeating-linear-gradient(left, hsla(0, 0%, 0%, 0) 0%, hsla(
            0,
            0%,
            0%,
            0
          )
          4%, hsla(0, 0%, 0%, 0.03) 4.5%, hsla(0, 0%, 0%, 0) 6%),
    -webkit-repeating-linear-gradient(left, hsla(0, 0%, 100%, 0) 0%, hsla(
            0,
            0%,
            100%,
            0
          )
          1.2%, hsla(0, 0%, 100%, 0.15) 2.2%, hsla(0, 0%, 100%, 0) 4%),
    -webkit-linear-gradient(-90deg, hsl(0, 0%, 78%) 0%, hsl(0, 0%, 90%) 47%, hsl(
            0,
            0%,
            78%
          )
          53%, hsl(0, 0%, 70%) 100%);

  -webkit-box-shadow: 5px 5px 8px 1px rgba(0, 0, 0, 0.41);
  box-shadow: 5px 5px 8px 1px rgba(0, 0, 0, 0.41);
  ${media.fullWidth} {
    padding: 29px 72px;
  }

  ${media.tablet} {
    padding: 2.832vw 7.031vw;
  }

  ${media.mobile} {
    padding: 6.776vw 16.822vw;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6.944vw 0vw;

  ${media.fullWidth} {
    padding: 100px 0px;
  }

  ${media.tablet} {
    padding: 100px 0px;
  }

  ${media.mobile} {
    padding: 80px 0px;
  }
`
