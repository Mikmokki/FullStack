import React from 'react'

const Header = (props) => {
    return <h1>{props.course.name}</h1>
  }
  
  const Part = (props) => {
    return (
      <p key={props.id}>
        {props.name} {props.exercises}
      </p>
    )
  }
  
  const Course = ({ course }) => (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part => <Part id={part.id} name={part.name} exercises={part.exercises} />)}
      </div>
    )
  }
  
  const Total = (props) => {
    return (
      <p>
        <b> Total of
        {" " + props.parts.map(x => x.exercises).reduce((x, y) => (x + y))} {" exercises"}</b>
      </p>
    )
  }

  export default Course