const generateNeighborsMapping = (size) => {
    const neighborsMapping = {}
  
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const index = row * size + col
        const neighbors = []
  
        if (col > 0) neighbors.push(index - 1) // left
        if (col < size - 1) neighbors.push(index + 1) // right
        if (row > 0) neighbors.push(index - size) // top
        if (row < size - 1) neighbors.push(index + size) // bottom
  
        neighborsMapping[index] = neighbors
      }
    }
  
    return neighborsMapping
  }

export default generateNeighborsMapping