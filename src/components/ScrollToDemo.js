import React from 'react'

const ScrollToDemo = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={() => scrollToSection('section1')}>
              Section 1
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('section2')}>
              Section 2
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('section3')}>
              Section 3
            </button>
          </li>
        </ul>
      </nav>

      <section id='section1'>Section 1 Content</section>
      <section id='section2'>Section 2 Content</section>
      <section id='section3'>Section 3 Content</section>
    </div>
  )
}

export default ScrollToDemo
