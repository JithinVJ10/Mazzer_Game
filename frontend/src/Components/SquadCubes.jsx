import React from 'react'

const SquadCubes = ({ handleClick, player }) => {
  const notSelected = 'border rounded-sm bg-red-400 w-full h-full'
  const selectedPlayer1 = 'border rounded-sm bg-green-400 w-full h-full'
  const selectedPlayer2 = 'border rounded-sm bg-blue-400 w-full h-full'
  const playerOneConverted = 'border rounded-sm bg-white w-full h-full'
  const playerTwoConverted = 'border rounded-sm bg-black w-full h-full'

  // playerOne=Green(white)
  // playerTwo=Blue(black)

  let cubeStyle
  if (player === 'playerOne') {
    cubeStyle = selectedPlayer1
  } else if (player === 'playerTwo') {
    cubeStyle = selectedPlayer2
  } else if (player === 'white') {
    cubeStyle = playerOneConverted
  } else if (player === 'black') {
    cubeStyle = playerTwoConverted
  } else {
    cubeStyle = notSelected
  }

  return (
    <div className='w-10 h-10' onClick={handleClick}>
      <div className={cubeStyle}></div>
    </div>
  )
}

export default SquadCubes
