const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')


const supertest = require('supertest')

const api = supertest(app)



describe('User creation checks', () => {
    const initialUser = {
        username: "admin",
        name: "admin",
        password: "admin",
        blogs: ["649fff616f79eec7b4b16bf9"]
    }

    beforeEach(async () => {
        await User.deleteMany({})

        await api.post('/api/users').send(initialUser)
    })
    
    test('Users with the same username cannot be created', async () => {
        const newUser = {
            "username": "admin",
            "name": "admin",
            "password": "admin",
            "blogs": "649fff616f79eec7b4b16bf9"
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('Username has to be longer than 3', async () => {
        const newUser = {
            "username": "a",
            "name": "admin",
            "password": "admin",
            "blogs": "649fff616f79eec7b4b16bf9"
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('Password has to be longer than 3', async () => {
        const newUser = {
            "username": "oceanman",
            "name": "admin",
            "password": "wh",
            "blogs": "649fff616f79eec7b4b16bf9"
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})