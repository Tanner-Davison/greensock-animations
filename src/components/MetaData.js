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
  const fetchMetaData = async (searchUrl) => {
    try {
      const response = await axios.get(searchUrl);
      const $ = cheerio.load(response.data);
      const parsedHTML = $.parseHTML(response.data); 
      const title = $(parsedHTML).find('title').text(); 
      const description = $(parsedHTML).find('meta[name="description"]').attr('content');
      setMetaData({ title, description });
    } catch (error) {
      console.error('Error fetching meta data:', error);
    }
  };
  console.log('hello world ');
  
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
    </Wrapper>
  )
}

export default MetaData
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
