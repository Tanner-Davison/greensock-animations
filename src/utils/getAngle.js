export const getAngle = (x1, y1, x2, y2)=>{
    const deltaY = y2 - y1;
    const deltaX = x2 - x1;
  

    let angleRad = Math.atan2(deltaY, deltaX);
  
    let angleDeg = (angleRad * 180) / Math.PI;
  
    if (angleDeg < 0) {
      angleDeg += 360;
    }
  
    console.log("Angle between the points:", angleDeg);
    return angleDeg.toFixed(2);
  }
  