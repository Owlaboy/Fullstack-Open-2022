const mongoose = require('mongoose')
const app = require('../app')
const list_helper = require('../utils/list_helper')
const Blog = require('../models/blog')

const supertest = require('supertest')

const api = supertest(app)


const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      },
      {
        title: 'Chess is simple',
        author: 'Bobby Fischer',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/EzChess.html',
        likes: 3,
      }
]

beforeEach(async () => {
    await  Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('There are the right amount of blogs', async () => {
    const response = await api.get('/api/blogs').expect(200)
    const length = response.body.length
    
    expect(length).toBe(2)
})

test('The id atribute is defined', async () => {
    const response = await api.get('/api/blogs').expect(200)
    const blog = response.body[0]

    expect(blog.id).toBeDefined()
})

test('HTTP Post command works', async () => {    
    const newBlog = {
        title: 'The game of efil',
        author: 'Dog',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Dog.html',
        likes: 3,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(
        'The game of efil'
    )
})

test('HTTP Post with no likes attribute added correctly.', async () => {
    const newBlog = {
        title: 'The game of efil',
        author: 'Dog',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Dog.html'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    const addedBlog = response.body.filter(blog => {
        return blog.title === 'The game of efil'
    })[0]

    expect(addedBlog.likes).toBe(0)
})

test('HTTP POST return 400 if the title or url are not defiend.', async () => {
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
        .expect(400)
    
    await api
        .post('/api/blogs')
        .send(urlessBlog)
        .expect(400)

    
    await api
        .post('/api/blogs')
        .send(emptyBlog)
        .expect(400)
})

test('HTTP delete returns 204 and removes the right blog.', async () => {
    const startingBlogs = await api.get('/api/blogs')
    const blogToDelete = startingBlogs.body[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
    const result = await api.get('/api/blogs')
    expect(result.body).toHaveLength(initialBlogs.length -1)
    })

test('HTTP put updates a blog' async () => {
    const startingBlogs = await api.get('/api/blogs')
})

afterAll(async () => {
    await mongoose.connection.close()
})