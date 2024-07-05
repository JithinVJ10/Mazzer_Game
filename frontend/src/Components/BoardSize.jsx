import React from 'react'

const BoardSize = ({selectBroad}) => {
  return (
    <div>
      <button onClick={()=>selectBroad(6)} >6x6</button>
      <button onClick={()=>selectBroad(8)} >8x8</button>
      <button onClick={()=>selectBroad(10)} >10x10</button>
    </div>
  )
}

export default BoardSize
