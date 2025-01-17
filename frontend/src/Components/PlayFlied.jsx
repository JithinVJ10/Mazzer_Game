import React, { useEffect, useMemo, useState } from 'react'
import SquadCubes from './SquadCubes'
import generateNeighborsMapping from '../Logic/generateNeighborsMapping'

// playerOne=Green(white)
// playerTwo=Blue(black)

const PlayField = ({ playerOne, setPlayerOne, GRID_SIZE, cubes, setCubes }) => {
  
  const neighborsMapping = useMemo(() => generateNeighborsMapping(GRID_SIZE), [GRID_SIZE])

  const handleClick = (index) => {
    if (cubes[index] !== null) return // Prevent overwriting a selected or acquired cube

    let newCubes = [...cubes]
    newCubes[index] = playerOne ? 'playerOne' : 'playerTwo'

    // Check neighbors for each cube and update if all neighbors are clicked
    newCubes.forEach((cube, idx) => {
      if (cube === 'white' || cube === 'black' || cube === 'playerOne' || cube === 'playerTwo') return // Skip already acquired cubes

      const neighbors = neighborsMapping[idx]
      if (neighbors.length < 4) return
      if (neighbors.every(neighbor => newCubes[neighbor] !== null)) {
        newCubes[idx] = playerOne ? 'white' : 'black'
      }
    })


    setCubes(newCubes)
    setPlayerOne(!playerOne)
  }


  return (
    <div className={`grid grid-cols-${GRID_SIZE} gap-0`}>
      {cubes.map((cube, index) => (
        <SquadCubes 
          key={index} 
          player={cube} 
          handleClick={() => handleClick(index)} 
        />
      ))}
    </div>
  )
}

export default PlayField
