import React from 'react'
const Persons = ({ persons, fil }) => (

    persons.filter(p => p.name.toLowerCase().includes(fil.toLowerCase())).map(person =>
        <p key={person.name} >{person.name + "  " + person.number} </p>
    )
)
export default Persons