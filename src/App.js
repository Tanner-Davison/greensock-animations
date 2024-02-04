import React from 'react'
import CustomCarousel from './components/CustomCarousel'
import LogosContainer from './components/LogosContainer'

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
      <LogosContainer scrollto={scrollToSection} />
    </>
  )
}

export default App
