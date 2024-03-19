import React, { useState, useEffect } from 'react'
import axios from 'axios'
import cheerio from 'cheerio'
import styled from 'styled-components'
import media from '../styles/media'
import colors from '../styles/colors'
import text from '../styles/text'

const MetaData = () => {
  const [metaData, setMetaData] = useState({ title: '', description: '' })
  const [searchUrl, setSearchUrl] = useState('')
  const [imgArr, setImgArr] = useState([])
  const fetchMetaData = async (searchUrl) => {
    try {
      const response = await axios.get('http://localhost:5000/proxy', {
        params: { searchUrl },
      })
      const $ = cheerio.load(response.data)
      const title = $('title').text()
      const description = $('meta[name="description"]').attr('content')
      $('img').each((index, element) => {
        const src = $(element).attr('src')
        const delayedUrl = $(element).attr('data-delayed-url')
        const dataSrc = $(element).attr('data-src')
        if (dataSrc && dataSrc.trim() !== '') {
          setImgArr((prev) => [...prev, { dataSource: dataSrc }])
        }
        if (src && src.trim() !== '') {
          setImgArr((prev) => [...prev, { dataSource: src }])
        }

        if (delayedUrl && delayedUrl.trim() !== '') {
          setImgArr((prev) => [...prev, { dataSource: delayedUrl }])
        }
      })

      setMetaData({ title, description })

    } catch (error) {
      console.error('Error fetching meta data:', error)
    }
  }
  const chunkArray= (array, chunkSize)=>{
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
  const chunky = chunkArray(imgArr, imgArr.length);
  const webImages = chunky.map((chunk, index) => {
      console.log(chunk);
      return (
          <ChunkDiv key={index}>
              {chunk.map((img, innerIndex) => ( // Use parentheses to evaluate the result of the inner map
                  <ImageWrapper>
                  <Img
                      key={innerIndex}
                      src={img.dataSource}
                      data-source={img.dataSource}
                      alt={'logos'}
                  />
                  <Save>Save Image</Save>
                  </ImageWrapper>
              ))}
          </ChunkDiv>
      );
  });

  useEffect(() => {
    console.log(metaData)
    console.log(imgArr)
  }, [metaData])
  return (
    <Wrapper>
      <Label htmlFor={'metaUrlInput'}>
        Website Url:
        <UrlInput
          id={'metaUrlInput'}
          type='text'
          value={searchUrl}
          placeholder='paste Url'
          onChange={(e) => setSearchUrl(e.target.value)}
        />
        <SubmitUrl type='button' onClick={() => fetchMetaData(searchUrl)}>
          {' '}
          Get Meta Data
        </SubmitUrl>
      </Label>
      <AllImagesWrapper>
      <MetaHeaderWrapper>
            <MetaTitle>{metaData.title}</MetaTitle>
            <MetaDescription>{metaData.description}</MetaDescription>
            </MetaHeaderWrapper>
          {webImages}
        </AllImagesWrapper>
    </Wrapper>
  )
}

export default MetaData
const Save = styled.button`

`
const Img = styled.img`
position: relative;
  width: 100%;
  max-width:400px;
  min-width: 50px;

`
const ImageWrapper = styled.div`
display: flex;
flex-direction: column;
`
const MetaDescription= styled.p`
${text.bodyM}
`
const MetaTitle= styled.h3`
${text.h3}
margin:unset;
`
const MetaHeaderWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
padding-top:25px;
width:40vw;
`
const ChunkDiv= styled.div`
position: relative;
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: flex-end;
flex-wrap: wrap;
border:4px solid red;
height: fit-content;
gap: 50px 10px;
`
const AllImagesWrapper = styled.div`
position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width:98vw;
  max-height: 700px;
  background-color: transparent;
  overflow-y: scroll;
  
`
const SubmitUrl = styled.button`
  ${text.bodyM}
  background-color: transparent;
`
const UrlInput = styled.input`
  ${text.bodyM}
  padding-left:.5vw;
  margin: 10px;
  border: 2px solid black;
`
const Label = styled.label`
  ${text.bodyM}
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 5vw;
  width: 100vw;
`
