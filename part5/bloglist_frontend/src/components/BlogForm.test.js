import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogFrom'

test('<BlogForm /> onSubmit call is done with the right parameters', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()
  
    const { container } = render(<BlogForm createBlog={createBlog} />)
  
    const titleInput = container.querySelector('#title')
    const authorInput = container.querySelector('#author')
    const urlInput = container.querySelector('#url')

    const createButton = screen.getByText('create')

    const testingBlog = {
        title: 'a testing blog title',
        author: 'a testing blog author',
        url: 'a testing blog url'
    }
  
    await user.type(titleInput, testingBlog.title)
    await user.type(authorInput, testingBlog.author)
    await user.type(urlInput, testingBlog.url)

    await user.click(createButton)
  
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog).toHaveBeenCalledWith(testingBlog)
  })