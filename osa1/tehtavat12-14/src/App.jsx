import { useState } from 'react'

const DisplayAnecdote = (props) => {
  return (
    <>
    <p>{props.anecdotes[props.value]}</p>
    <p>has {props.votes} votes</p>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(8).fill(0))
  const [mostVotesNumb, setMostVotes] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)

  const getRandomAnecdote = () => {
    const randNumber = Math.floor((Math.random() * 8))
    setSelected(randNumber)
    console.log(points)
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)

    if (copy[selected] > mostVotesNumb) {
      setMostVotes(copy[selected])
      setMostVoted(selected)
    }
  }

  return (
    <><div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote value={selected} votes={points[selected]} anecdotes={anecdotes} />
    </div>
    <div>
        <Button handleClick={getRandomAnecdote} text="Next anecdote" />
        <Button handleClick={voteAnecdote} text="Vote" />
    </div>
    <div>
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote value={mostVoted} votes={points[mostVoted]} anecdotes={anecdotes} />
    </div></>
  )
}

export default App