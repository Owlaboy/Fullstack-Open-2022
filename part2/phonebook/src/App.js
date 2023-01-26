import React from 'react'
import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const PersonalDetails = (props) => {
  const person = props.person
  return(
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Contacts = (props) => {
  var people = props.persons
    return(
    <div>
      {people.map(person =>{
      if (person.name.includes(props.filter)) {
        return(<PersonalDetails person={person} key={person.name} />)
      }
    })}
    </div>
  )
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

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const newPersons = [...persons]

    const isInList = newPersons.some(element => element.name === newPerson.name)
    if (isInList) {
      alert(`${newPerson.name} is already in the phonebook`)
      console.log('%cApp.js line:38 newPerson is the same as an old one');
    } 
    else {
      newPersons.push(newPerson)
      setPersons(newPersons)
    }
    setNewName("")
    event.target.value = ""
    setNewNumber("")
    event.target.value = ""
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const [searchValue, setSearchValue] = useState('')
  const handleSearch = () => {

  }
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSearch}>
        <div>
          filter shown with <input value={searchValue} onChange={handleSearchChange} />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
        <button type="submit">add</button>
        </div>
      </form>      
      <h2>Numbers</h2>
      <Contacts persons={persons} filter={searchValue}/>
    </div>
  )
}

export default App