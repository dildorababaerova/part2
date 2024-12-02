import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'
 
 
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

 
  useEffect(()=>{
    personService
    .getAll()
    .then(initialData=>{
      setPersons(initialData)
      console.log('initial data', initialData)
    })
    .catch(error => {
      setErrorMessage(
        `Error fetching data from the server: ${error}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    });
  }, [])
 
 
 
  const addPerson = (event) => {
    event.preventDefault();
 
    const newObject = {
      name: newName,
      number: newNumber,
    };
 
    // Tarkastus, onko olemassa sama numero tai nimi
    const existingPerson = persons.find(
      person => person.name === newName || person.number === newNumber
    );
    const changedPerson = { ...existingPerson, name:newName, number: newNumber };
    if (existingPerson) {
      // jos on olemassa, kysytään käyttäjältä, haluaako hän korvata vanhan numeron uudella
      if (window.confirm(
          `${newName} or ${newNumber} is already added to phonebook, replace the old number with a new one?`
        )) {
        personService
          .replacePerson(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson));
            console.log('updated a new name', returnedPerson);
            setNewName('');
            setNewNumber('');
            setSuccessMessage(
              `Person  ${newName} name or number successfully replaced`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            if(error.response && response.status === 404){
              
            setErrorMessage(
              `Person ${existingPerson.name} was already deleted from the server`
            )
            setPersons(persons.filter(person=>person.id!==existingPerson.id))
          } else {
            setErrorMessage(
              `Error updating person: ${error}`
            ) 
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
        })
      }
    } else {
      // jos ei ole olemassa, lisätään uusi nimi ja numero
      personService
        .createPerson(newObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          console.log('added a new name', returnedPerson);
          setNewName('');
          setNewNumber('');
          setSuccessMessage(
            `Persons ${newName} successfully saved`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Error creating person: ${newName}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        });
    }
  };
 
 
 
  const handleDeletePerson =(id)=>{
    const deletingObject = persons.find(person=>person.id===id);
    console.log('deletingObject', deletingObject)
    
    if(window.confirm(`Delete ${deletingObject.name}?`)){
      personService
      .deletePerson(id)
      .then(()=>{
        setPersons(persons.filter(person => person.id!== id));
        setSuccessMessage( 
          `Person ${deletingObject.name} successfully deleted`
        );
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000)
      })
        .catch(error => {
          setErrorMessage(`Error deleting person: ${deletingObject.name}`)
          setTimeout(() => {setErrorMessage(null);
          }, 5000)
        });
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
 
  const filteredPersons = (newFilter === '')
    ? persons
    :persons.filter(person =>
      person.name.toLowerCase().startsWith(newFilter.toLowerCase()))
     
 
 
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} isError={false} />
      <Notification message={errorMessage} isError={true} />
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}
       
        />
       
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
      <Person
        persons={filteredPersons}
        newFilter={newFilter}
        handleDeletePerson={handleDeletePerson}
      />
 
    </div>
   
  )
}
 
export default App