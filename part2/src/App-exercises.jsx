import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(()=>{
    axios
    .get('http://localhost:3001/persons')
    .then(response=>{
      setPersons(response.data)
      console.log('response.data', response.data)
    });
  }, [])



  const addPerson =(event)=>{
    event.preventDefault()
    
    const newObject = {
      name: newName,
      number: newNumber,
      id:persons.length+1
    }
    if(persons.find(person => person.name === newName||person.number === newNumber)){
      alert(`${newName} or ${newNumber} is already added to phonebook`)
      return
    } else {
      setPersons(persons.concat(newObject))
      console.log('added a new name', newObject)
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}  />
        
        <br/>
        
        <h3>Add a new</h3>
        
        <PersonForm addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        />
        <br/>
        
      <h2>Numbers</h2>
      <Person persons={persons} newFilter={newFilter}/>    
    </div>
    
  )
}

export default App