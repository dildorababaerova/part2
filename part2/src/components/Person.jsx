const Person = (props)=>{
    const filtredName = () => {
        if (props.newFilter === '') {
          return props.persons
        } else {
          return props.persons.filter(person => person.name.toLowerCase().startsWith(props.newFilter.toLowerCase()))
        }
      }

    return (
        <div>
              <ul>
                {filtredName().map(person =><li key={person.id}>{person.name+' '+ person.number} </li>)}
              </ul>
        </div>
    )
}

export default Person