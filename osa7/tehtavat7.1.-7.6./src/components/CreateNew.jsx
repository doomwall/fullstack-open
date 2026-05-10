import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { useAnecdotes } from '../hooks'

const CreateNew = () => {
  const navigate = useNavigate()
  const anecdotes = useAnecdotes()
  const { reset: resetContent, ...contentField } = useField('content')
  const { reset: resetAuthor, ...authorField } = useField('author')
  const { reset: resetInfo, ...infoField } = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    anecdotes.addAnecdote({ content: contentField.value, author: authorField.value, info: infoField.value, votes: 0 })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...contentField} />
        </div>
        <div>
          author
          <input name='author' {...authorField} />
        </div>
        <div>
          url for more info
          <input name='info' {...infoField} />
        </div>
        <button>create</button>
        <button type='button' onClick={() => {
          resetContent()
          resetAuthor()
          resetInfo()
        }}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
