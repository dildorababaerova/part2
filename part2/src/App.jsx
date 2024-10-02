import React, { useEffect } from 'react';
import { useState } from 'react'
import Note from './components/Note'
import noteService from './services/notes'





const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(    'a new note...'  ) 
  const [showAll, setShowAll] = useState(true) 

useEffect(()=>{
  noteService
  .getAll()
  .then(initialNotes => {
    setNotes(initialNotes)
})
}, [])


const addNote = (event) => {
    event.preventDefault()
    const noteObject={
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService
    .create(noteObject)
    .then(returnedNote => {
      console.log(response)
      setNotes(notes.concat(returnedNote))
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

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
    .update(id, changedNote)
    .then(returnedNote =>{
      setNotes(notes.map(n => n.id !== id ? n :returnedNote))
    })
    .catch(error => {
      alert(` ${note.content} the note could not be saved`)
      setNotes(notes.filter(n => n.id !== id))
    })

  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      

      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} 
          note={note}
          toggleImportance={()=>toggleImportanceOf(note.id)}
          />
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


