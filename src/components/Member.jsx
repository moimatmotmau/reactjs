import React from 'react'

function Member({name, age, index , handleTransfer,handleEdit}) {
  return (
    <div>
        <span>{name}</span> - <span>{age}</span>
        <button onClick={()=> handleTransfer(index)}>Transfer</button>
        <button onClick={handleEdit}>Edit</button>
    </div>
  )
}

export default Member