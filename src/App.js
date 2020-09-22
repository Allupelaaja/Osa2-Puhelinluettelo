import React, { useState } from 'react'

const Filter = (props) => {
  return (
    <div>
      filter shown with <input
      onChange={props.handler}
      />
    </div>
  )
}

const Form = (props) => {
  const addItem = props.additem
  return (
    <form onSubmit={addItem}>
      <div>
        name: <input
        value = {props.newName}
        onChange={props.nameChange}
      />
      </div>
      <div>
        number: <input
        value={props.newNumber}
        onChange={props.numberChange}
      />
      </div>
      <div>
        <button type="submit"
        >add</button>
      </div>
    </form>
  )
}

const Numbers = (props) => {
  return (
    <div>{props.persons.filter(function (person) {return person.name.toLowerCase().includes(props.newFilter.toLowerCase())}).map(person =>
      <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addItem = (event) => {
    event.preventDefault()
    if (persons.some(item => item.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilterChange}/>
      <h2>add a new</h2>
      <Form additem={addItem} nameChange={handleNameChange} newName={newName} newNumber={newNumber} numberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} newFilter={newFilter}/>
    </div>
  )

}

export default App