require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

const Person = require('./models/person')
const persons = []

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))

app.get('/info', (request, response) => {
  response.set('Content-Type', 'text/html')
  const datenow = new Date().toString()
  const message = 'Phonebook has info for ' + persons.length + ' people <br><br>' + datenow
  response.send(
    message
  )
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
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
    .catch(error => next(error))
})

app.put('/api/persons:id', (request, response, next) => {
  console.log('here?')
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})