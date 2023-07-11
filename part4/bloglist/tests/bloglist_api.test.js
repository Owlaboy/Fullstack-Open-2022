const mongoose = require('mongoose')
const app = require('../app')
const list_helper = require('../utils/list_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const supertest = require('supertest')

const api = supertest(app)



beforeEach(async () => {
    const initialUser = {
        username: "whoever",
        name: "admin",
        passwordHash: await bcrypt.hash("admin", 10),
        blogs: []
    }

    await User.deleteMany({})
    let userObject = new User(initialUser)
    await userObject.save()



    const initialBlogs = {
        "title": 'Go To Statement Considered Harmful',
        "author": 'Edsger W. Dijkstra',
        "url": 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        "likes": 5,
        "user": userObject._id.toString()
    }

    await Blog.deleteMany({})
    const blogObject = new Blog(initialBlogs)
    const savedBlog = await blogObject.save()

    const blogId = savedBlog._id.toString()
    userObject.blogs = userObject.blogs.concat(blogId.toString())

    await userObject.save()
})

test('There are the right amount of blogs', async () => {
    const response = await api.get('/api/blogs').expect(200)
    const length = response.body.length
    
    expect(length).toBe(1)
})

test('The id atribute is defined', async () => {
    const response = await api.get('/api/blogs').expect(200)
    const blog = response.body[0]

    expect(blog.id).toBeDefined()
})

test('HTTP Post command works with valid token', async () => {    
    const newBlog = {
        title: 'The game of efil',
        author: 'Dog',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Dog.html',
        likes: 3,
    }
    const logDetails = {
        username: "whoever",
        password: "admin"
    }
    const token = await api.post('/login').send(logDetails)

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set( "authorization", "bearer " + token.body.token )
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(2)
    expect(titles).toContain(
        'The game of efil'
    )
})

test('HTTP Post command returns correct error message with invalid token', async () => {
    const newBlog = {
        title: 'The game of efil',
        author: 'Dog',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Dog.html',
        likes: 3,
    }
    

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set( "authorization", "bearer invalidTokenText" )
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
})

test('HTTP Post with no likes attribute added correctly.', async () => {
    const newBlog = {
        title: 'The game of efil',
        author: 'Dog',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Dog.html'
    }

    const logDetails = {
        username: "whoever",
        password: "admin"
    }
    const token = await api.post('/login').send(logDetails)

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set( "authorization", "bearer " + token.body.token )
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    const addedBlog = response.body.filter(blog => {
        return blog.title === 'The game of efil'
    })[0]

    expect(addedBlog.likes).toBe(0)
})

test('HTTP POST return 400 if the title or url are not defiend.', async () => {
    const logDetails = {
        username: "whoever",
        password: "admin"
    }
    const token = await api.post('/login').send(logDetails)

    const titlessBlog  = {
        author: 'Dog',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Dog.html'
    }
    const urlessBlog = {
        title: 'The game of efil',
        author: 'Dog'
    }
    const emptyBlog = {
        author: 'Dad'
    }

    await api
        .post('/api/blogs')
        .send(titlessBlog)
        .set( "authorization", "bearer " + token.body.token )
        .expect(400)
    
    await api
        .post('/api/blogs')
        .send(urlessBlog)
        .set( "authorization", "bearer " + token.body.token )
        .expect(400)

    
    await api
        .post('/api/blogs')
        .send(emptyBlog)
        .set( "authorization", "bearer " + token.body.token )
        .expect(400)
})

test('HTTP delete returns 204 and removes the right blog.', async () => {
    const startingBlogs = await api.get('/api/blogs')
    const blogToDelete = startingBlogs.body[0]

    const logDetails = {
        username: "whoever",
        password: "admin"
    }
    const token = await api.post('/login').send(logDetails)

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set( "authorization", "bearer " + token.body.token )
        .expect(204)
    
    const result = await api.get('/api/blogs')
    expect(result.body).toHaveLength(0)
    })

test('HTTP put updates a blog', async () => {
    const startingBlogs = await api.get('/api/blogs')
    const blogToUpdate = startingBlogs.body[0]
    blogToUpdate.likes = 20

    const newStatBloc = {
        "title": blogToUpdate.title,
        "author": blogToUpdate.author,
        "url": blogToUpdate.url,
        "likes": 20
    }

    const logDetails = {
        username: "whoever",
        password: "admin"
    }
    const token = await api.post('/login').send(logDetails)

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set( "authorization", "bearer " + token.body.token )
        .send(newStatBloc)
        .expect(200)
    

    const result = await api.get('/api/blogs')
    expect(result.body[0].likes).toBe(20)
})

    

afterAll(async () => {
    await mongoose.connection.close()
})