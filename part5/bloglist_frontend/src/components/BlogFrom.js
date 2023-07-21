import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      'title': title,
      'author': author,
      'url': url,
    })
  
    setTitle('')
    setAuthor('')
    setUrl('')
  
  }

  return(
    <div>
    <h2>Create new blog</h2>
    <form onSubmit={addBlog}>
      <div>
        <div>
          Title: 
          <input 
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          Author: 
          <input 
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          Url: 
          <input 
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
      </div>
      <button type="submit">create</button>
    </form>
    </div>
  )

}

export default BlogForm