import React from 'react'
import CustomCarousel from '../components/CustomCarousel'
import LogosContainer from '../components/LogosContainer'
import NavigationBar from '../components/NavigationBar'
import GridLayout from '../components/GridLayout'
import IphoneCTA from '../components/IphoneCTA'
import styled from 'styled-components'


const HomePage = ({ scrollto }) => {

  return (
    <Wrapper>
      <NavigationBar />
      <CustomCarousel scrollto={scrollto} />
      <IphoneCTA />
      <LogosContainer scrollto={scrollto} />
      <GridLayout />
    </Wrapper>
  )
}

export default HomePage

const Wrapper = styled.div`
display: flex;
flex-direction: column;
width:100%;

`