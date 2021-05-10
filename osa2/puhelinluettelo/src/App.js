import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from './services/personsData'
import Notification from "./components/Notification"
const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [style, setStyle] = useState("alert")
    useEffect(() => {
        personService
            .getAll()
            .then(people => {
                setPersons(people)
            })
    }, [])
    const submission = (event) => {
        event.preventDefault()
        const Object = {
            name: newName,
            number: newNumber
        }
        if (persons.map(x => x.name).includes(newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                Object.id = persons.find(p => p.name === newName).id
                personService
                    .update(Object.id, Object)
                    .then(() => {
                        setPersons(persons.map(p => (p.name === newName ? Object : p)))
                        setStyle("alert")
                        setErrorMessage(`Updated ${Object.name}`)
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        console.log(error);
                        setStyle("error")
                        setErrorMessage("Updating failed")
                    })
            }
        }
        else {
            personService.create(Object)
                .then(one => {
                    setPersons(persons.concat(one))
                    setStyle("alert")
                    setErrorMessage(`Added ${Object.name}`)
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    console.log(error);
                    setStyle("error")
                    setErrorMessage("Creating new person failed")
                })

        }
        setTimeout(() => {
            setErrorMessage(null);
        }, 2500)
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
    const handleDeletion = (name, id) => {
        return () => {
            if (window.confirm(`Delete ${name} ?`)) {
                personService
                    .deleteP(id)
                    .then(() => {
                        setPersons(persons.filter(n => n.id !== id))
                        setStyle("alert")
                        setErrorMessage(`Deleted ${name}`)
                        setNewName("")
                        setNewNumber("")
                    })
                    .catch(error => {
                        console.log(error);
                        setStyle("error")
                        setErrorMessage("Deletion failed")
                    })

                setTimeout(() => {
                    setErrorMessage(null);
                }, 2500)
            }
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} style={style} />
            <Filter value={newFilter} handler={handleFilterChange} />
            <PersonForm handleSub={submission} handleName={handleNameChange} handleNumber={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={persons} fil={newFilter} deletion={handleDeletion} />
        </div>
    )

}

export default App