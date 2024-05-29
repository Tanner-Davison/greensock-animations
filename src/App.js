import React, {useEffect} from 'react'
import HomePage from './pages/HomePage'
import CustomTools from './pages/CustomTools'
import NavigationBar from './components/NavigationBar'
import MetaData from './components/MetaData'
import ScrollExample from './pages/ScrollExample'
import InProgress from './pages/InProgress'
import gsap from 'gsap'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'



const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
    })
  }
}

function App() {
 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<HomePage scrollto={scrollToSection} />} />,
        <Route path='/box-playground' element={<CustomTools />} />,
        <Route path='/in-progress' element={<InProgress />} />,
        <Route path='/metaDataTool' element={<MetaData />} />,
        <Route path='/pinned-scroll' element={<ScrollExample />} />,
        <Route path='/meta-lookup' element={<><NavigationBar/><MetaData/></>}/>,
      </>,
    ),
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
