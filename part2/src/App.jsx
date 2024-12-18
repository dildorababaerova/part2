import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    if (!note) {
      setErrorMessage('Note not found');
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        console.log("Occured error when updating: ", error);
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      } catch (exception) {
      console.log('Error when logging in: ', exception);
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

    

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && 
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
      }
      {user && 
        <div>
        <p>{user.name} logged in</p>
        <button onClick={() => {
            window.localStorage.removeItem('loggedNoteappUser')
            setUser(null)
          }
          } className='logoutButton'>
            logout
          </button>

          <div> 
            <Togglable  buttonLabel="reveal">
            <h1>Notes</h1>
            <div>
              <button onClick={() => setShowAll(!showAll)}
                className='showButton'
                >
                show {showAll ? 'important' : 'all' }
                
              </button>
            </div>      
            <ul>
              {notesToShow.map(note => 
              <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
              />
            )}
            </ul>
            </Togglable>
          </div>
          <div>
            <Togglable  buttonLabel="new note">
              <NoteForm
                onSubmit={addNote}
                value={newNote}
                handleChange={handleNoteChange}
              />
            </Togglable>
          </div>
        </div>
      } 

      
      <Footer />
    </div>
  )
}

export default App