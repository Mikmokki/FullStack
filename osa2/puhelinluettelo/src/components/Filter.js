import React from 'react'
const Filter = ({ value, handler }) => (
    <form>
        filter shown with {" "}
        <input
            value={value}
            onChange={handler} />
    </form>)
export default Filter