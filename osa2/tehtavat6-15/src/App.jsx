import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Name = (props) => {
  return (
    <li>
      {props.name} {props.number}
      <button onClick={props.onClick}>Delete</button>
    </li>
  )
}

const Filter = (props) => {
  return (
    <div>
        filter shown with 
        <input value={props.search}
        onChange={props.function}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: 
        <input value = {props.nameValue}
        onChange={props.nameOnChange}/>
      </div>
      <div>
        number: 
        <input value = {props.numberValue}
        onChange={props.numberOnChange}/>
      </div>
      <div>
        <button type="submit">
          add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')


  useEffect(() => {
    console.log("effect")
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  function emptyTemplate() {
    setNewName("")
    setNewNumber("")
    setSearch("")
  }

  const addPerson = (event) => {
    event.preventDefault()

    const match = persons.find(person => person.name === newName)

    console.log("match", match)
    
    if (match) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log("lets go 2")
        const id = match.id
        const changedPerson = {... match, number: newNumber}
        personService
          .update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : changedPerson))
          })
          emptyTemplate()
          return
      } else {
        return
      }
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }

    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        emptyTemplate()
        console.log("persons ", persons)
      })

  }

  const removePerson = (id) => {
    console.log("lets go")
    personService
      .remove(id)
      .then(response => {
        const copy = persons.filter(person => person.id !== id)
        setPersons(copy)
      })
  }

  const handleNoteChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleNoteChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNoteChangeSearch = (event) => {
    setSearch(event.target.value)
  }

  const toShow = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} function={handleNoteChangeSearch} />
      <h2>Add new person</h2>
      <PersonForm 
        onSubmit={addPerson} 
        nameValue={newName} 
        nameOnChange={handleNoteChangeName} 
        numberValue={newNumber}
        numberOnChange={handleNoteChangeNumber}
        />
      <h2>Numbers</h2>
      <ul>
        {toShow.map(person => <Name key={person.id} name={person.name} number={person.number} onClick={() => removePerson(person.id)} />) }
      </ul>
    </div>
  )

}

export default App