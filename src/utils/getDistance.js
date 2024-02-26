export const getDistance = (x1, y1, x2, y2)=>{
    const deltaX = x2 - x1;
    const deltaY = y2 -y1;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return distance.toFixed(3);
 
}