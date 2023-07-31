import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders contet', () => {
    const userObj = {"name": "testUser"}
    const blog = {
        "title": 'Go To Statement Considered Harmful',
        "author": 'Edsger W. Dijkstra',
        "url": 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        "likes": 5,
        "user": userObj
        
    }  

    const handleDelete = (blogToDelete) => {
        console.log(blogToDelete)
    }

    render(<Blog key={blog.id} blog={blog} handleDelete={handleDelete} />)

    const element = screen.getByText('Go To Statement Considered Harmful Edsger W. Dijkstra')
    expect(element).toBeDefined()
})

test('clicking the button reveals more info', async () => {
    const userObj = {"name": "testUser"}
    const blog = {
        "title": 'Go To Statement Considered Harmful',
        "author": 'Edsger W. Dijkstra',
        "url": 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        "likes": 5,
        "user": userObj
        
    } 

    const handleDelete = (blogToDelete) => {
        console.log(blogToDelete)
    }

    render(<Blog key={blog.id} blog={blog} handleDelete={handleDelete} />)

    const user = userEvent.setup()
    const button = screen.getByText('more info')
    await user.click(button)

    const url = screen.getByText('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
    const likes = screen.getByText('likes: 5')
    const userText = screen.getByText('testUser')
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
    expect(userText).toBeDefined()
})

test('clicking the like button inside the toggle space calls the like handler', async () => {
    const userObj = {"name": "testUser"}
    const blog = {
        "title": 'Go To Statement Considered Harmful',
        "author": 'Edsger W. Dijkstra',
        "url": 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        "likes": 5,
        "user": userObj
        
    } 

    const handleDelete = (blogToDelete) => {
        console.log(blogToDelete)
    }

    const mockLikeHandler = jest.fn()

    render(<Blog key={blog.id} blog={blog} handleDelete={handleDelete} handleLike={mockLikeHandler}/>)

    const user = userEvent.setup()
    const toggleButton = screen.getByText('more info')
    await user.click(toggleButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
})