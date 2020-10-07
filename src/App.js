import React, { useEffect, useState } from 'react'
import personService from './services/persons'
import './App.css'

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
      <p key={person.name}>{person.name} {person.number} <button onClick={function (e) {props.removeItem(e, person)}}>delete</button></p>)}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const removeItem = (event, person) => {
    event.preventDefault()
    if (window.confirm('Delete '+person.name+' ?')) {
      console.log('effect')
      console.log(person.id)
      personService
        .deleteItem(person.id)
        .then(response => {
          console.log('item deleted')
          console.log(response.data)
          const newPersons = [...persons]
          newPersons.splice(newPersons.indexOf(person), 1)
          setPersons(newPersons)
          //notification
          setNotificationMessage('Removed '+person.name)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const addItem = (event) => {
    event.preventDefault()
    if (persons.some(item => item.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const personCopy = {...person}
        personCopy.number = newNumber
        personService
        .update(person.id, personCopy)
        .then(response=> {
          person.number = newNumber
          //notification
          setNotificationMessage('Updated '+person.name)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage('Information of '+person.name+' has already been removed from server')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(nameObject)
        .then(response => {
          const personsCopy = [...persons]
          personsCopy.push(response.data)
          setPersons(personsCopy)
          //notification
          setNotificationMessage('Added '+nameObject.name)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
      })
    }
    setNewName('')
    setNewNumber('')
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
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter handler={handleFilterChange}/>
      <h2>add a new</h2>
      <Form additem={addItem} nameChange={handleNameChange} newName={newName} newNumber={newNumber} numberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} newFilter={newFilter} removeItem={removeItem}/>
    </div>
  )

}

export default App