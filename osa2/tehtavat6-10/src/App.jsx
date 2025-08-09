import { useState } from 'react'

const Name = (props) => {
  return (
    <li>
      {props.name}
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{name: "asdf", id: "1"}]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const match = persons.find(function (person) {
      return person.name === newName;
    })
    
    if (match) {
      alert(`${newName} is already added to phonebook`)
      setNewName("")
      return
    }

    const personObject = {
      name: newName,
      id: String(persons.length + 1),
    }
    console.log(personObject)

    setPersons(persons.concat(personObject))
    setNewName("")
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input value = {newName}
          onChange={handleNoteChange}/>
        </div>
        <div>
          <button type="submit">
            add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Name key={person.id} name={person.name} />) }
      </ul>
    </div>
  )

}

export default App