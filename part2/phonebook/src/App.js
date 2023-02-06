import React, { useEffect } from 'react'
import axios from 'axios'
import dataService from "./dataService"
import { useState } from 'react'
import './style.css'

const Titles = (props) => {
  return <h2>{props.title}</h2>
}

const Filter = (props) => {
  return(
    <form>
        <div>
          filter shown with <input value={props.searchValue} onChange={props.handleSearchChange} />
        </div>
      </form>
  )
}

const AdditionForm = (props) => {

  return(
    <form onSubmit={props.handleSubmit}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
          number: <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
        <button type="submit">add</button>
        </div>
      </form> 
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const PersonalDetails = (props) => {
  const person = props.person
  
  const handleDeletion = () => {
    if (window.confirm(`delete ${person.name}?`)){
      props.handleDelete(person)
    }
  }

  return(
    <div>
      {person.name} {person.number} <button onClick={handleDeletion}>delete</button>
    </div>
  )
}

const Contacts = (props) => {
  var people = props.persons
    return(
    <div>
      {people.map(person =>{
      if (person.name.includes(props.filter)) {
        return(<PersonalDetails person={person} key={person.name} handleDelete={props.handleDelete}/>)
      }
    })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    dataService
      .getAll()
        .then(initialData => {
        setPersons(initialData)
    })
  }, [])

  const handleDelete = deleteablePerson => {
    setErrorMessage(`Deleted ${persons.find(person => person.id === deleteablePerson.id).name}`)
    dataService.remove(deleteablePerson.id).then(() => {
      dataService
      .getAll().then(response => setPersons(response)) 
    setTimeout(setErrorMessage, 3000, null)
  })
  .catch(() => {
    setErrorMessage(`${deleteablePerson.name} was already deleted`)
    setTimeout(setErrorMessage, 3000, null)
    dataService.getAll().then(response => setPersons(response))
  })
    
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const newPersons = [...persons]

    const isInList = newPersons.some(person => person.name === newPerson.name)
    if (isInList) {
      if (window.confirm(`${newPerson.name} is already in the phonebook, would you like to update their number`)) {
        let knownPersonId = persons.find(person => person.name === newPerson.name).id
        dataService.update(knownPersonId, newPerson).then(response => {
          dataService.getAll().then(response => {
            setPersons(response)
          })
        })
      }
      setErrorMessage(`changed ${newPerson.name}`)
      setTimeout(setErrorMessage, 3000, null)
    } 
    else {
      dataService
        .addNew(newPerson)
          .then(response => {
            newPersons.push(response)
            setPersons(newPersons)
            setErrorMessage(`added ${newPerson.name}`)
            setTimeout(setErrorMessage, 3000, null)
          })
          .catch(error => {
            console.log(error.response.data)
            setErrorMessage(error.response.data)
            setTimeout(setErrorMessage, 3000, null)
          })
          
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

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div>
      <Titles title="Phonebook" />
      <Notification message={errorMessage} />
      <Filter searchValue={searchValue} handleSearchChange={handleSearchChange}/>
      <Titles title="add a new" />
      <AdditionForm handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>    
      <Titles title="Numbers" />
      <Contacts persons={persons} filter={searchValue} handleDelete={handleDelete} />
    </div>
  )
}

export default App