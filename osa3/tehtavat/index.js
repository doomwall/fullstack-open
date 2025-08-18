require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('tiny'))



persons = []

app.get('/info', (request, response) => {
  response.set('Content-Type', 'text/html')
  const datenow = new Date().toString()
  const message = "Phonebook has info for " + persons.length + " people <br><br>" + datenow 
  response.send(
    message
  )
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
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

    const newPerson = new Person({
      name: person.name,
      number: person.number,
    })

    /* person.id = Math.floor(Math.random() * 10000000).toString() */
    
    newPerson.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})