import React from 'react'
import HomePage from './pages/HomePage'
import CustomTools from './pages/CustomTools'
import inProgress from './pages/InProgress'
import MetaData from './components/MetaData'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import InProgress from './pages/InProgress'

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
