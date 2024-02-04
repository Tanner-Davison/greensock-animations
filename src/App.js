import React from 'react'
import CustomCarousel from './components/CustomCarousel'
import LogosContainer from './components/LogosContainer'
import ScrollToDemo from './components/ScrollToDemo'

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
    })
  }
}

function App() {
  return (
    <>
      <CustomCarousel scrollto={scrollToSection} />
      <ScrollToDemo scrollto={scrollToSection} />
      <LogosContainer scrollto={scrollToSection} />
    </>
  )
}

export default App
