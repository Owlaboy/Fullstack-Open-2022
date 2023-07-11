const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/api/users', (request, response, error) => {
    User
      .find({})
      .populate('blogs', {title: 1, url: 1, author: 1, likes: 1})
      .then(users => {
        response.json(users)
      })
      .catch(error => next(error))
  })

usersRouter.post('/api/users', async (request, response) => {
    const {username, name, password, blogs} = request.body

    if (password === undefined || password.length < 3) {
        response.status(400).json({error: "Invalid password"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    let user
    if (blogs === undefined) {
        user = new User({
            username,
            name,
            passwordHash
        })
    } else {
        user = new User({
            username,
            name,
            passwordHash,
            blogs
        })
    }
    
    let savedUser;

    try {
    savedUser = await user.save()
    } catch (err) {
        response.status(400).json(err.name + " | " + err.message)
    }
    response.status(201).json(savedUser)
})

module.exports = usersRouter