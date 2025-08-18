const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const argName = process.argv[3]
const argNumber = process.argv[4]

const url = `mongodb+srv://doomwall:${password}@cluster0.ywpqbda.mongodb.net/personsApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (argName && argNumber) {
    const person = new Person({
    name: `${argName}`,
    number: `${argNumber}`,
    }) 

    person.save().then(result => {
    console.log( `added ${argName} number ${argNumber} to phonebook`)
    mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log('phonebook: ')
        result.forEach(note => {
        console.log(note.name, note.number)
        })
        mongoose.connection.close()
    })
}


