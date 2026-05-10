import { useEffect } from "react"
import { useAnecdotes } from "../hooks"

const AnecdoteList = () => {
  const { anecdotesList, addAnecdote, initializeAnecdotes, deleteAnecdote } = useAnecdotes([])

  useEffect(() => {
    initializeAnecdotes()
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotesList.map(anecdote => (
          <li key={anecdote.id}>
            {anecdote.content}
            <button onClick={() => deleteAnecdote(anecdote.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnecdoteList
