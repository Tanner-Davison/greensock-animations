import React from 'react'
import HomePage from './pages/HomePage'
import CustomTools from './pages/CustomTools'

import MetaData from './components/MetaData'
import ScrollExample from './pages/ScrollExample'
import InProgress from './pages/InProgress'
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
