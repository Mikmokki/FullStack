import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const StatisticsLine = ({ text, value, addition }) => (
  <tr>
    <td>{text}</td><td>{value} {addition}</td>
  </tr>
)
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all !== 0) {
    return (
      <table>
        <tbody>
          <StatisticsLine text="Good" value={good} />
          <StatisticsLine text="Neutral" value={neutral} />
          <StatisticsLine text="Bad" value={bad} />
          <StatisticsLine text="All" value={all} />
          <StatisticsLine text="Average" value={((good - bad) / all).toFixed(1)} />
          <StatisticsLine text="Positive" addition="%" value={(good / all * 100).toFixed(1)} />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      No feedback given
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
      </div>
      <h2>statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App