import { useState } from 'react'
import anecdoteService from '../services/anecdotes'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

const useAnecdotes = (anecdotes) => {
  const [anecdotesList, setAnecdotesList] = useState(anecdotes)

  const addAnecdote = (anecdote) => {
    anecdoteService.createNew(anecdote).then(data => {
      setAnecdotesList(prev => prev.concat(data))
    })
  }

  const initializeAnecdotes = () => {
    anecdoteService.getAll().then(data => setAnecdotesList(data))
  }

  const deleteAnecdote = (id) => {
    anecdoteService.deleteAnecdote(id).then(() => {
      setAnecdotesList(prev => prev.filter(anecdote => anecdote.id !== id))
    })
  }

  return {
    anecdotesList,
    addAnecdote,
    initializeAnecdotes,
    deleteAnecdote
  }
}

export { useField, useAnecdotes }