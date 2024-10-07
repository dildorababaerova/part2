import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/persons'
 
 
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
 
  useEffect(()=>{
    personService
    .getAll()
    .then(initialData=>{
      setPersons(initialData)
      console.log('initial data', initialData)
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
 
    if (existingPerson) {
      // jos on olemassa, kysytään käyttäjältä, haluaako hän korvata vanhan numeron uudella
      if (window.confirm(
          `${newName} or ${newNumber} is already added to phonebook, replace the old number with a new one?`
        )) {
        personService
          .replacePerson(existingPerson.id, newObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson));
            console.log('updated a new name', returnedPerson);
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error('Error updating person:', error);
          });
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
        })
        .catch(error => {
          console.error('Error creating person:', error);
        });
    }
  };
 
 
 
  const handleDeletePerson =(id)=>{
    const deletingObject = persons.find(person=>person.id===id)
    console.log('deletingObject', deletingObject)
    if(window.confirm(`Delete ${deletingObject.name}?`)){
      personService
      .deletePerson(id)
      .then(()=>{
        setPersons(persons.filter(person=>person.id!==id))
      })
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