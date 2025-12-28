import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, emptyNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        dispatch(appendAnecdote(content))

        dispatch(
          setNotification(`You made a new anecdote: "${content}"`)
        )
        setTimeout(() => {
          dispatch(emptyNotification())
        }, 5000)
    }
          
    return (
    <div>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button>create</button>
      </form>
    </div>
    )
}


export default AnecdoteForm