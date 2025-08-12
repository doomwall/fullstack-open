const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    }
  ]

app.get('/info', (request, response) => {
  response.set('Content-Type', 'text/html')
  const datenow = new Date().toString()
  const message = "Phonebook has info for " + persons.length + " people <br><br>" + datenow 
  response.send(
    message
  )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body

    if (!person.name || !person.number) {
        return response.status(400).json({ 
        error: 'name or number missing' 
    })
    }

    const match = persons.find(n => n.name === person.name)
    if (match) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    person.id = Math.floor(Math.random() * 10000000).toString()

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})