import React from 'react'
import styled from 'styled-components';
import text from '../styles/text';
import ProgressNav from '../components/ProgressNav';

const ScrollExample = () => {

    const layout = '.testing-layout-ref'
    const targets = [
        `.slider-section-test-${0}`,
        `.slider-section-test-${1}`,
        `.slider-section-test-${2}`,
        `.slider-section-test-${3}`,
      ]
  return (
    <Layout slug="index">
    <Wrapper className="testing-layout-ref">
      <ProgressNav layout={layout} targets={targets} />
  

      <SectionWrapper className={`slider-section-test one`}>
      <Text>Testing Section One</Text>
      </SectionWrapper>

      <SectionWrapper className={`slider-section-test two`}>
      <Text>Testing Section Two</Text>
      </SectionWrapper>

      <SectionWrapper className={`slider-section-test three`}>
      <Text>Testing Section Three</Text>
      </SectionWrapper>

      <SectionWrapper className={`slider-section-test four`}>
      <Text>Testing Section Four</Text>
      </SectionWrapper>
    </Wrapper>
  </Layout>
  )
}

export default ScrollExample
const Text = styled.p`
${text.bodyMBold}
`

const SectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    outline: 4px solid red;
    height: 100vh;
    padding:25px ;
`
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`
const Layout = styled.div`

`