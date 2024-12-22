import { useState, useEffect, useRef} from 'react'
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
  // const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  // const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [loginVisible, setLoginVisible] = useState(false)

  const noteFormRef = useRef()


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

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
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

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
        
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      noteService.setToken(user.token)
      setUser(user)
      
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

    const loginForm = () => ( 
    <Togglable buttonLabel='login'>
      <LoginForm
        handleSubmit={handleLogin}
      />
    </Togglable>
    )

    

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && 
      <div>
        {loginForm()}
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
            <Togglable  buttonLabel="reveal notes">
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
            <Togglable  buttonLabel="add new note" ref={noteFormRef}>
              <NoteForm createNote={addNote} />
            </Togglable>
          </div>
        </div>
      } 

      
      <Footer />
    </div>
  )
}

export default App