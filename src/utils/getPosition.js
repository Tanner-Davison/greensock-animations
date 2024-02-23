const getPosition = (e) =>{
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log({'x' : x},{'y' : y})
    const positionData = {x:x,y:y}
    return positionData;
}
  export default getPosition;