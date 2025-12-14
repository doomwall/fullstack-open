import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const sortedAnecdotes = anecdotes.slice().sort(
      (a, b) => b.votes - a.votes
    )

    const filteredAnecdotes = sortedAnecdotes.filter(x => x.content.includes(filter))

    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }

    return (
        <div>
        {filteredAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>))}
        </div>
    )
}

export default AnecdoteList