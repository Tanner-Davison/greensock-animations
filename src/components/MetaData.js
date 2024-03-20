import React, { useState, useEffect } from 'react'
import axios from 'axios'
import cheerio from 'cheerio'
import styled from 'styled-components'
import media from '../styles/media'
import colors from '../styles/colors'
import text from '../styles/text'
import TypingComp from '../utils/TypingComp'

const MetaData = () => {
  const [metaData, setMetaData] = useState({
    title: 'Look up any site',
    description: 'All public Images will display below!',
  })
  const [searchUrl, setSearchUrl] = useState('')
  const [searchExtendedUrl, setSearchExtendedUrl] = useState('')
  const [domain, setDomain] = useState('.com')
  const [imgArr, setImgArr] = useState([])
  const [altTags, setAltTags] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMetaData = async (searchUrl, searchExtendedUrl, domain) => {
    setIsLoading(true)
    setMetaData({ title: '', description: '', alt: '' })
    setImgArr([])
    try {
      const response = await axios.get('http://localhost:5000/proxy', {
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
        const dataSrc = $(element).attr('data-src')
        const altTag = $(element).attr('alt')

        if (dataSrc && dataSrc.trim() !== '') {
          setImgArr((prev) => [...prev, { dataSource: dataSrc, alt: altTag }])
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
  const handleImageSave = async (imgSrc) => {
    const imageUrl = imgSrc
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'image.jpg'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    } catch (error) {
      console.log('error downloading image, : ', error)
    }
  }
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text
    } else {
      return text.substring(0, maxLength - 3) + '...'
    }
  }
  const chunky = chunkArray(imgArr, imgArr.length)
  const webImages = chunky.map((chunk, index) => {
    console.log(chunk)
    return (
      <ChunkDiv key={index}>
        {chunk.map((img, innerIndex) => {
          console.log('HERE', img)
          return (
            <ImageWrapper key={innerIndex}>
              <Img
                key={innerIndex}
                src={img.dataSource}
                data-source={img.dataSource}
                alt={img.altTag}
              />
              <DisplayAlt>{img?.alt && truncateText(img.alt, 35)}</DisplayAlt>
              <Save
                value={img.dataSource}
                onClick={() => handleImageSave(img.dataSource)}
              >
                Save Image
              </Save>
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
    </Wrapper>
  )
}

export default MetaData
const DisplayAlt = styled.p`
  ${text.bodyMBold}
  text-align: center;
`
const Save = styled.button``
const Img = styled.img`
  position: relative;
  width: 100%;
  max-width: 400px;
  min-width: 50px;
`
const ImageWrapper = styled.div`
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
  border: 4px solid red;
  height: fit-content;
  gap: 50px 10px;
`
const AllImagesWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 98vw;
  max-height: 700px;
  background-color: transparent;
  overflow-y: scroll;
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
