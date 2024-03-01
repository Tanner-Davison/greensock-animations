import React from 'react'
import HomePage from './pages/HomePage'
import Playground from './pages/Playground'
import inProgress from './pages/InProgress'

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
        <Route path='/box-playground' element={<Playground/>}/>,
        <Route path='/in-progress' element={<InProgress/>}/>,
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
