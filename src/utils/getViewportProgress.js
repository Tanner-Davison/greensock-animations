export const getProgress = section => {
    const sectionRect = section.getBoundingClientRect()
    let overlap = Math.max(
      0,
      Math.min(sectionRect.bottom, window.innerHeight) - sectionRect.top
    )
    return (overlap / sectionRect.height) * 100
  }