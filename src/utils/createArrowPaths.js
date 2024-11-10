export const createUShapedArrowPath = (startX, startY, endX, endY) => {
    const midY = 168;
    return `M${startX},${startY} V${midY} H${endX} V${endY}`;
  };
  
  export const calculateTotal = (instanceData) => 
    instanceData.front + instanceData.back + instanceData.db;
  
  export const calculateDifference = (total1, total2) => total2 - total1;