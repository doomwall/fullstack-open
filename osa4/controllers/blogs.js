const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { info, error } = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  
  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end()
  }

  if (blog.likes === undefined) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter