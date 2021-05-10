import React from 'react'
const Persons = ({ persons, fil, deletion }) => (

    persons.filter(p => p.name.toLowerCase().includes(fil.toLowerCase())).map(person =>
        <div>
            <p key={person.name} >{person.name + "  " + person.number} </p>
            <button onClick={deletion(person.name, person.id)}>Delete</button>
        </div>
    )
)
export default Persons