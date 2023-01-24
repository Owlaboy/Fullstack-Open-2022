import { useState } from 'react'

const PersonalDetails = (props) => {
  const person = props.person
  return(
    <>
      {props.person.name}
    </>
  )
}

const Contacts = (props) => {
  var people = props.persons
    return(
    <>
      {people.map(person => <PersonalDetails person={person} key={person.name} />)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts persons={persons} />
    </div>
  )
}

export default App