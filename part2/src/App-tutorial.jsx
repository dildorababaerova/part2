import React from 'react';
import { useState } from 'react'
import Note from './components/Note'


const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(    'a new note...'  ) 
  const [showAll, setShowAll] = useState(true) 
  

const addNote = (event) => {
    event.preventDefault()
    const noteObject={
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length+1
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

const handleChangeNote = (event) => {
    console.log('new note assigned', event.target.value)
    setNewNote(event.target.value)
  }

  const importantNotes = notes.filter(note => note.important);

  const notesToShow = showAll
  ? notes
  : importantNotes

  console.log('notesToShow', importantNotes)
    
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


