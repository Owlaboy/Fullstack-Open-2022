import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)
const DisplayAnectode = (props) =>{
  const selected = props.selected
  const anecdotes = props.anecdotes
  const votes = props.votes

  return(
    <div>
      {anecdotes[selected]}
    
      <div>
      has {votes[selected]} votes
      </div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
 
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))


  const RandomInt = (max) => {
    return(Math.floor(Math.random() * max))
  }
  const selectRandom = () => setSelected(RandomInt(anecdotes.length))

  const voteSelected = () =>{
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVote(votesCopy)
  }
  let i = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h2>Andectode of the day</h2>
      <DisplayAnectode votes={votes} anecdotes={anecdotes} selected={selected} />
      <div>
      <Button handleClick={voteSelected} text="vote" />
      <Button handleClick={selectRandom} text="next anectode" />
      <h2>Andectode with most votes</h2>
      {anecdotes[i]}
      </div>
    </div>
  )
}

export default App