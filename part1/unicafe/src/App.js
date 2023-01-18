import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => {
  const text = props.text
  const value = props.value

  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const total = good + neutral + bad
  const average = (good-bad)/total
  const positive = good/total * 100

  if (total ===0) {
    return (
      <div>
      <h2>statistics</h2>
      <div>No feedback given</div>
      </div>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
    <table>
    <thead>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="total" value={total}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={positive + " %"}/>        
    </thead>
    </table>
    </div>
  )    
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h2>
      give feedback
      </h2>
      
      <div>
        <Button handleClick={increaseGood} text="good" />
        <Button handleClick={increaseNeutral} text="neutral" />
        <Button handleClick={increaseBad} text="bad" />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    
    </div>
  )
}

export default App