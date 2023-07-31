const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .populate('user', {name: 1 , username: 1})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/api/blogs', async (request, response) => {
  let decodedToken
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch (err) {
    return response.status(401).json({err: 'token invalid'})
  }

  const user = await User.findById(decodedToken.id)

  if (user === null) {
    return response.status(401).json({ error: 'token invalid'})
  }
  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).json({error: 'Invalid input check required fields (title, url)'})
  }


  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user.id
  })
  
  let savedBlog;

  try {
    savedBlog = await blog.save()
  } catch (err) {
    response.status(400).json(err.name + " | " + err.message)
  }
  
  user.blogs = user.blogs.concat(savedBlog.id)

  await user.save()
  response.status(201).json(savedBlog)
  })

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  const blogToRemove = await Blog.findById(request.params.id)
  let decodedToken
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch (err) {
    return response.status(401).json({err: 'token invalid1'})
  }

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid2'})
  }
  if (decodedToken.id = blogToRemove.user) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({error: "Wrong user trying to delete the blog."})
  }

  
})

blogsRouter.put('/api/blogs/:id', async (request, response) => {
  let decodedToken
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch (err) {
    return response.status(401).json({err: 'token invalid'})
  }

  const user = await User.findById(decodedToken.id)

  if (user === null) {
    return response.status(401).json({ error: 'token invalid'})
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.json(updatedBlog)

})

module.exports = blogsRouter