import React, { useState } from 'react'

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
      <div>
        filter shown with <input
        onChange={handleFilterChange}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addItem}>
        <div>
          name: <input
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumberChange}
          type="tel"
          />
        </div>
        <div>
          <button type="submit"
          >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(function (person) {return person.name.toLowerCase().includes(newFilter.toLowerCase())}).map(person =>
        <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )

}

export default App