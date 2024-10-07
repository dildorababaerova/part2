const Person = ({persons, handleDeletePerson })=>{
   

    return (
        <div>
              <ul>
                {persons.map(person =>
                <li key={person.id} className = 'person'>
                  {person.name} {person.number}
                  <button onClick={()=>handleDeletePerson(person.id)}>delete</button> 
                </li>)}
              </ul>
        </div>
    )
}

export default Person