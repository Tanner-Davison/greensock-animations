export const getAngle = (x1, y1, x2, y2)=>{
    const deltaY = y2 - y1;
    const deltaX = x2 - x1;
  
    // Calculate the angle in radians
    let angleRad = Math.atan2(deltaY, deltaX);
  
    // Convert radians to degrees
    let angleDeg = (angleRad * 180) / Math.PI;
  
    if (angleDeg < 0) {
      angleDeg += 360;
    }
  
    console.log("Angle between the points:", angleDeg);
    return angleDeg.toFixed(2);
  }
  