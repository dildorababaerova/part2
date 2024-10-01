import React, { useEffect } from 'react';
import { useState } from 'react'
import Note from './components/Note'
import axios from 'axios'



const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(    'a new note...'  ) 
  const [showAll, setShowAll] = useState(true) 

const hook =()=>{
  console.log('effect')
  axios
  .get('http://localhost:3001/notes')
  .then(response => {
     console.log('Server response:', response.data)
    setNotes(response.data)
})
}
console.log('render', notes.length, 'notes')

useEffect(hook, [])

const addNote = (event) => {
    event.preventDefault()
    const noteObject={
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length+1
    }
    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      console.log(response)
      setNotes(notes.concat(response.data))
      setNewNote('')
    })

  }

const handleChangeNote = (event) => {
    console.log('new note assigned', event.target.value)
    setNewNote(event.target.value)
  }

  const importantNotes = notes.filter(note => note.important);

  const notesToShow = showAll
  ? notes
  : importantNotes

  console.log('notesToShow', notesToShow)
    
  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      

      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
        onChange={handleChangeNote}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App 


