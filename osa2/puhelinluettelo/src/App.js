import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    useEffect(() => {
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            setPersons(response.data)
          })
      }, [])
    const submission = (event) => {
        event.preventDefault()
        if (persons.map(x => x.name).includes(newName)) alert(`${newName} is already added to phonebook`)
        else {
            const Object = {
                name: newName,
                number: newNumber
            }

            setPersons(persons.concat(Object))
            setNewName('')
            setNewNumber('')
        }
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={newFilter} handler={handleFilterChange} />
            <PersonForm handleSub={submission} handleName={handleNameChange} handleNumber={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={persons} fil={newFilter} />
        </div>
    )

}

export default App