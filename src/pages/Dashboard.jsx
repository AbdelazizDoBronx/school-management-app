import React from 'react'
import NotesChart from '../features/charts/NotesChart'

const Reports = () => {
    const user = {
        scores: {
          Math: 19,
          English: 18,
          Science: 15,
          History: 13,
        },
      }
  return (
    <div>
        <h1 className='text-xl font-bold underline'>A quick view of your performance :</h1>
        <NotesChart user={user}/>
    </div>
  )
}

export default Reports