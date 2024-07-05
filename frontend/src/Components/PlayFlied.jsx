import React, { useEffect, useMemo, useState } from 'react'
import SquadCubes from './SquadCubes'
import generateNeighborsMapping from '../Logic/generateNeighborsMapping'

  // playerOne=Green(white)
  // playerTwo=Blue(black)




const PlayField = ({playerOne,setPlayerOne,GRID_SIZE,cubes,setCubes}) => {
  
  const neighborsMapping = useMemo(() => generateNeighborsMapping(GRID_SIZE), [GRID_SIZE])

  const fillRectangle = (newCubes, clickedIndex, color) => {
    const row = Math.floor(clickedIndex / GRID_SIZE)
    const col = clickedIndex % GRID_SIZE

    // Iterate over all other cubes to check for potential rectangles
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      if (newCubes[i] === newCubes[clickedIndex]) {
        const iRow = Math.floor(i / GRID_SIZE)
        const iCol = i % GRID_SIZE

        if (iRow === row || iCol === col) {
          continue
        }

        const oppositeCorner = row * GRID_SIZE + iCol
        const otherOppositeCorner = iRow * GRID_SIZE + col

        if (
          newCubes[oppositeCorner] === newCubes[clickedIndex] &&
          newCubes[otherOppositeCorner] === newCubes[clickedIndex]
        ) {
          for (let r = Math.min(row, iRow); r <= Math.max(row, iRow); r++) {
            for (let c = Math.min(col, iCol); c <= Math.max(col, iCol); c++) {
              const idx = r * GRID_SIZE + c
              if (newCubes[idx] === null) {
                newCubes[idx] = color
              }
            }
          }
        }
      }
    }
  }

  const handleClick = (index) => {
    if (cubes[index] !== null && cubes[index] !== 'playerOne' && cubes[index] !== 'playerTwo') return // Prevent overwriting a selected or acquired cube

    let newCubes = [...cubes]
    newCubes[index] = playerOne ? 'playerOne' : 'playerTwo'

    // Check neighbors for each cube and update if all neighbors are clicked
    newCubes.forEach((cube, idx) => {
      if (cube === 'white' || cube === 'black' || cube === 'playerOne' || cube === 'playerTwo') return // Skip already acquired cubes
      
      if(neighborsMapping[idx].length < 4) return
      const neighbors = neighborsMapping[idx]
      if (neighbors.every(neighbor => newCubes[neighbor] !== null)) {
        newCubes[idx] = playerOne ? 'white' : 'black'
        setPlayerOne(!playerOne)
      }
    })

    fillRectangle(newCubes, index, playerOne ? 'white' : 'black')
    
    setCubes(newCubes)
    setPlayerOne(!playerOne)
  }

  return (
    <div className={`grid grid-cols-6 gap-0 w-64`}>
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
