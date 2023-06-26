const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/api/blogs', (request, response) => {
  
  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).json({error: 'Invalid input check required fields (title, url)'})
  }  
  
  const blog = new Blog(request.body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  console.log(request.params.id)
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

module.exports = blogsRouter