const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { info, error } = require('../utils/logger')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  if (body.title === undefined || body.url === undefined) {
    response.status(400).end()
  }

  if (body.likes === undefined) {
    body.likes = 0
  }

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 });
  response.status(201).json(populatedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const foundBlog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })

  console.log(foundBlog.user)

  foundBlog.title = request.body.title
  foundBlog.author = request.body.author
  foundBlog.url = request.body.url
  foundBlog.likes = request.body.likes

  const updatedBlog = await foundBlog.save()
  console.log(updatedBlog)
  response.status(201).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter