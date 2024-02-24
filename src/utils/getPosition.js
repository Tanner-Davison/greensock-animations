const getPosition = (e) =>{
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const positionData = {
        x: `${x.toFixed(2)}`,
        y: `${y.toFixed(2)}`
    }
    return positionData;
}
  export default getPosition;