import React from 'react'
import styled from 'styled-components';
import media from '../styles/media';
import colors from '../styles/colors';
import text from '../styles/text';
import Content1 from './GridContent/Content1'
import Content2 from './GridContent/Content2'
import Content3 from './GridContent/Content3'
import Content4 from './GridContent/Content4'
import Content5 from './GridContent/Content5'

const GridLayout = () => {
  return (
    <Wrapper>
        <Layout>
            <Content className={'content1'}>content1</Content>
            <Content className={'content2'}>content2</Content>
            <Content className={'content3'}>content3</Content>
            <Content className={'content4'}>content4</Content>
            <Content className={'content5'}>content5</Content>
            <Content className={'content6'}>content6</Content>
            <Content className={'content7'}>content7</Content>
            <Content className={'content8'}>content8</Content>
        </Layout>
    </Wrapper>
  )
}

export default GridLayout
const Content = styled.div`
`
const Layout = styled.div`
display: grid;
width:100%;
height: 100vh;
grid-template-columns: repeat(4, 1fr);
grid-template-rows: 2fr 5fr 2fr 2fr 2fr 2fr 1fr;
grid-template-areas:'content1 content1 content1 content1'
                    'content8 content2 content2 content2' 
                    'content8 content2 content2 content2' 
                    'content8 content2 content2 content2' 
                    'content8 content3 content4 content5' 
                    'content8 content3 content4 content6' 
                    'content7 content7 content7 content7';
.content1{
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: content1;
  background-color: aquamarine;
}
.content2{
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: content2;
  background-color:${colors.primaryBlue} ;
}
.content3{
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: content3;
  background-color:${colors.primaryOrange} ;
}
.content4{
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: content4;
  background-color:green ;
}
.content5{
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: content5;
  background-color:${colors.grey200} ;
}
.content6{
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: content6;
  background-color:${colors.teal300} ;
}
.content7{
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: content7;
  background-color:${colors.primaryPurple} ;
}
.content8{
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: content8;
  background-color:${colors.darkYellow} ;
}
`
const Wrapper = styled.div`
    display: flex;
`