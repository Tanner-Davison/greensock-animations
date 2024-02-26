export const getSlope = (x1, y1, x2, y2) => {
    let xStart, xEnd, yStart, yEnd;
  
    // Determine which point has the higher x-coordinate
    if (x1 <= x2) {
      xStart = x1;
      xEnd = x2;
      yStart = y1;
      yEnd = y2;
    } else {
      xStart = x2;
      xEnd = x1;
      yStart = y2;
      yEnd = y1;
    }
  
    if (xEnd - xStart === 0) {
      console.error("Vertical line, slope is undefined");
      return undefined;
    }
  
    // Adjust the numerator to reflect y-increasing downward
    const slope = (yStart - yEnd) / (xEnd - xStart);
    const slopeAsPercentage = (slope * 100).toPrecision(3);
    return slopeAsPercentage;
  };