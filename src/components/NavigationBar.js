import React from 'react'
import styled from 'styled-components'
import media from '../styles/media'
import colors from '../styles/colors'
import text from '../styles/text'
import { useNavigate } from "react-router-dom";
const NavigationBar = () => {
    const navigate = useNavigate();
  const links = [
    { name: 'Home',link:'/' },
    { name: 'Box-Playground', link: '/box-playground'},
  {name: 'In progress', link: '/in-progress'}
  ]

  const displayNavNames = links.map((link, index) =>{
    return (
        <LinkName key={index} onClick={()=>navigate(link.link)}> {link.name}</LinkName>
    )
  })
  return <Wrapper>{displayNavNames}</Wrapper>
}

export default NavigationBar
const LinkName= styled.h4`
${text.h4}
margin:unset;
color:black;
cursor: pointer;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap:30px;
  max-width: 100vw;
  height: 10vw;
  border: 1px solid red;

`

