const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  return await response.json()
}


const createNew = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}

const newVote = async (id) => {
  const result = await fetch(`${baseUrl}/${id}`)
  const anecdote = await result.json()

  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ votes: anecdote.votes + 1 })
  })

  if (!response.ok) {
    throw new Error('Failed to vote anecdote')
  }
  
  return await response.json()
}


export default { getAll, createNew, newVote }