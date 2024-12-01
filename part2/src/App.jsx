import { useEffect, useState } from 'react';
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification';
import Footer from './components/Footer';



const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('') 
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage]= useState('') 

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
      console.log(returnedNote)
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
    
  }

  
  const importantNotes = notes.filter(note => note.important);
  
  
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
    .update(id, changedNote)
    .then(returnedNote =>{
      setNotes(notes.map(n => n.id !== id ? n :returnedNote))
    })
    .catch(() => {
      setErrorMessage(
        `Note ${note.content} the note could not be saved`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }
  
  const handleChangeNote = (event) => {
    console.log('new note assigned', event.target.value)
    setNewNote(event.target.value)
  }
  
  const notesToShow = showAll
  ? notes
  : importantNotes
  
  console.log('notesToShow', notesToShow)


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
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
      <Footer/>
    </div>
  )
}

export default App 


