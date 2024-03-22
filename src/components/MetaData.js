import React, { useState, useEffect } from 'react'
import axios from 'axios'
import cheerio from 'cheerio'
import styled from 'styled-components'
import media from '../styles/media'
import colors from '../styles/colors'
import text from '../styles/text'
import TypingComp from '../utils/TypingComp'
import diskette from '../images/diskette.png'
import downloadIcon from '../images/downloadIcon.png'
import moreIcon from '../images/more.png'
import saveFill from '../images/saveFill.png'
import saveNoFill from '../images/saveNoFill.png'
import preDownload from '../images/preDownload.png'
const MetaData = () => {
  const [metaData, setMetaData] = useState({
    title: 'Look up any site',
    description: 'All public Images will display below!',
  })
  const [searchUrl, setSearchUrl] = useState('')
  const [searchExtendedUrl, setSearchExtendedUrl] = useState('')
  const [domain, setDomain] = useState('.com')
  const [imgArr, setImgArr] = useState([])
  const [isHover, setIsHover] = useState('')
  const [iconHover, setIconHover] = useState(false)
  const [downloadIsHover, setDownloadIsHover] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const runShapes = new Array(5).fill().map((num) => {
    return (
      <>
        <Triangle />
        <TriangleTwo />
        <Circle />
      </>
    )
  })
  const fetchMetaData = async (searchUrl, searchExtendedUrl, domain) => {
    setIsLoading(true)
    setMetaData({ title: '', description: '', alt: '' })
    setImgArr([])
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
        const src = $(element).attr('src')
        const delayedUrl = $(element).attr('data-delayed-url')
        const delayedSrc = $(element).attr('data-src')
        const altTag = $(element).attr('alt')

        if (delayedSrc && delayedSrc.trim() !== '') {
          setImgArr((prev) => [
            ...prev,
            { dataSource: delayedSrc, alt: altTag },
          ])
        } else if (src && src.trim() !== '') {
          setImgArr((prev) => [...prev, { dataSource: src, alt: altTag }])
        } else if (delayedUrl && delayedUrl.trim() !== '') {
          setImgArr((prev) => [
            ...prev,
            { dataSource: delayedUrl, alt: altTag },
          ])
        }
      })
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching meta data:', error)
      setMetaData({
        title: 'Oops.. Invalid Request',
        description:
          'Some websites may restrict access to their metadata to protect user privacy. Metadata can sometimes contain personally identifiable information or other sensitive data that the website owner wants to keep private.',
      })
      setIsLoading(false)
    }
  }

  const chunkArray = (array, chunkSize) => {
    const chunks = []
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize))
    }
    return chunks
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
  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text
    } else {
      return text?.substring(0, maxLength - 3) + '...'
    }
  }
  const chunky = chunkArray(imgArr, imgArr.length)
  const webImages = chunky.map((chunk, index) => {
    console.log(chunk)
    const sortedChunk = chunk?.slice().sort((a, b) => {
      const altA = a.alt?.toLowerCase();
      const altB = b.alt?.toLowerCase();
      if (altA < altB) return -1;
      if (altA > altB) return 1;
      return 0;
  });
    return (
      <ChunkDiv key={index}>
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
                    src={iconHover ? saveFill : saveNoFill}
                    onMouseOver={(e) => setIconHover(true)}
                    onMouseLeave={() => setIconHover(false)}
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

  useEffect(() => {
    console.log(metaData)
    console.log(imgArr)
    console.log(isLoading)
  }, [metaData])
  return (
    <Wrapper>
      <Label htmlFor={'metaUrlInput'}>
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
          value={searchExtendedUrl}
          placeholder='path extension'
          onChange={(e) => setSearchExtendedUrl(e.target.value)}
        />
        <SubmitUrl
          type='button'
          onClick={() => fetchMetaData(searchUrl, searchExtendedUrl, domain)}
        >
          {' '}
          Get Meta Data
        </SubmitUrl>
      </Label>
      <AllImagesWrapper>
        <MetaHeaderWrapper>
          {isLoading && <TypingComp>{searchUrl}</TypingComp>}
          {!isLoading && (
            <>
              <MetaTitle>{metaData.title}</MetaTitle>
              <MetaDescription>{metaData.description}</MetaDescription>
            </>
          )}
        </MetaHeaderWrapper>

        {webImages}
      </AllImagesWrapper>
      {imgArr.length === 0 && <TrianglesWrapper>{runShapes}</TrianglesWrapper>}
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
  padding-top: 25px;
  width: 40vw;
`
const ChunkDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
  flex-wrap: wrap;
  overflow-y: scroll;
  border: 4px solid red;
  height: 47.569vw;
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
  width: 98vw;
  
  background-color: transparent;
`
const SubmitUrl = styled.button`
  ${text.bodyM}
  background-color: transparent;
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
const Label = styled.label`
  ${text.bodyM}
  display: flex;
  align-items: center;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 5vw;
  width: 100vw;
`
