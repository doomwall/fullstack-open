const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ 
      username: 'root',
      name: 'root_user', 
      passwordHash })
    await user.save()

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    
})

test('blogs are returned as json and correct length', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs id field is called "id" and not "_id" ', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const hasId = Object.keys(response.body[0]).includes('id')
    assert.strictEqual(hasId, true)
})

test('a valid blog can be added ', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

    assert(titles.includes("Type wars"))
})

test('if likes is null, set it to zero ', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const addedBlog = response.body.find(blog => blog.title === "Type wars")

    assert.strictEqual(addedBlog.likes, 0)
})


test('if title or url are null, then response is 400 bad request ', async () => {
    const newBlog1 = {
      _id: "5a422bc61b54a676234d17fc",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }

    const newBlog2 = {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      likes: 8,
      __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog1)
        .expect(400)

    await api
        .post('/api/blogs')
        .send(newBlog2)
        .expect(400)

})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(n => n.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})


test('a user can be created', async () => {
  const newUser = {
    user: "test_user",
    username: "test_username",
    password: "secret"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)

  const users = await helper.usersInDb()
  const ourUser = users.find(user => user.username === "test_username").username

  assert.strictEqual(ourUser, "test_username")

}) 

test('users cannot be created with usernames or passwords of length < 4', async () => {
  const newUser = {
    user: "test_user",
    username: "te",
    password: "secret"
  }

  const newUser2 = {
    user: "test_user",
    username: "test_username",
    password: "se"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(500)

  await api
    .post('/api/users')
    .send(newUser2)
    .expect(400)
})