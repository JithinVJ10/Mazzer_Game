import React, { useState, useEffect } from 'react'
import PlayFlied from '../Components/PlayFlied'

  // playerOne=Green(white)
  // playerTwo=Blue(black)

const Gameplay = () => {
  const [playerOne, setPlayerOne] = useState(true)
  const [GRID_SIZE, setGRID_SIZE] = useState(6)
  const [cubes, setCubes] = useState(Array(GRID_SIZE * GRID_SIZE).fill(null))
  const [turn, setTurn] = useState('Player Green') // Initialize turn state with 'Player Green'
  const [winner, setWinner] = useState(null)

  // Use useEffect to update turn based on playerOne state
  useEffect(() => {
    if (playerOne) {
      setTurn('Player Green')
    } else {
      setTurn('Player Blue')
    }
    decideWinner()
  }, [playerOne, cubes]) // Include cubes in dependency array since winner depends on it

  const decideWinner = () => {
    let blue = 0; // Initialize blue count
    let green = 0; // Initialize green count

    if (cubes.includes(null)) {
      return
    }else{
      cubes.forEach(cube => {
        if (cube === 'white') {
          green += 1
        } else if (cube === 'black') {
          blue += 1
        }
      })
  
      if (green > blue) {
        setWinner('Player Green')
      } else if (green < blue) {
        setWinner('Player Blue')
      } else {
        setWinner(null) // Reset winner if it's a tie
      }
    }

    
  }

  return (
    <div className='flex justify-center mt-20'>
      <PlayFlied
        playerOne={playerOne}
        setPlayerOne={setPlayerOne}
        GRID_SIZE={GRID_SIZE}
        cubes={cubes}
        setCubes={setCubes}
      />
      <div>
        <p>Turn: {turn}</p>
        {/* Render winner information when winner state is set */}
        {winner && <p>Winner: {winner}</p>}
      </div>
    </div>
  )
}

export default Gameplay
