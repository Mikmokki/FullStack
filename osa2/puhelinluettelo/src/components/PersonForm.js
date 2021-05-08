import React from 'react'
const PersonForm = ({handleSub,handleName,handleNumber}) => (
    <form onSubmit={handleSub}>
        <div>name: <input onChange={handleName} /></div>
        <div>number: <input onChange={handleNumber} /></div>
        <div><button type="submit">add</button></div>
    </form>)
export default PersonForm