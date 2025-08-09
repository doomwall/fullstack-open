import { useState } from 'react'

const Name = (props) => {
  return (
    <li>
      {props.name} {props.number}
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

const filtering = (list, query) => {
  return list.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
}



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const toShow = filtering(persons, search)

  const emptyTemplate = () => {
    setNewName("")
    setNewNumber("")
    setSearch("")
  }

  const addPerson = (event) => {
    event.preventDefault()

    const match = persons.find(function (person) {
      return person.name === newName;
    })
    
    if (match) {
      alert(`${newName} is already added to phonebook`)
      emptyTemplate()
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }
    console.log(personObject)

    setPersons(persons.concat(personObject))
    emptyTemplate()
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
        {toShow.map(person => <Name key={person.id} name={person.name} number={person.number} />) }
      </ul>
    </div>
  )

}

export default App