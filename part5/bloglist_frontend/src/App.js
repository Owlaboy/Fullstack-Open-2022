import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogFrom'
import Togglable from './components/Togglable'
import './components/style.css'

const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs( blogs )}
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user)
    }

  }, [])

  const alert = (message) => {
    setErrorMessage(message)
    setTimeout(() => {setErrorMessage('')}, 5000)
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')

      alert(`Logged in as ${user.name}`)
    } catch (exception) {
      alert('Wrong credentials')
    }
    console.log('logging in with', username, password)

  }

  const handleLogOut = async () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser('')
    alert('Logged out')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
          Username:
        <input
          id="username"
          type='text'
          value={username}
          name= "Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
          Password:
        <input
          id="password"
          type='text'
          value={password}
          name= "Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">log in</button>
    </form>
  )

  const addBlog = async (blogToAdd) => {
    try {
      await blogService.addNew(blogToAdd)
      alert(`Blog ${blogToAdd.title} added`)
      blogService.getAll().then(blogs => setBlogs( blogs))
    } catch (exception) {
      console.log(exception)
      alert(`something went wrong: ${exception.response.data}`)
    }

  }

  const handleDelete = async (blogToDelete) => {
    blogService.remove(blogToDelete)
    setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
  }

  const handleLike = async (blog) => {
    blog.likes = blog.likes+1

    const user = blog.user
    blog.user = blog.user.id

    await blogService.update(blog)

    blog.user = user

    console.log(blog)
    const blogs = await blogService.getAll()
    blogs.sort((a,b) => b.likes - a.likes)
    setBlogs( blogs )
  }

  return (
    <div>
      {errorMessage && <Notification message={errorMessage}></Notification>}
      <div>
        {!user && loginForm()}
      </div>
      {user &&
      <div>

        {user.name} logged in
        <button id={'logOut-button'} onClick={handleLogOut}>log out</button>

        <h2>Blogs</h2>

        <Togglable showButtonId={'BlogFormShow'} hideButtonId={'BlogFormHide'} showButtonLabel="new blog">
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} deletingUser={user} handleDelete={handleDelete} handleLike={handleLike} /> )}
      </div>
      }
    </div>
  )
}

export default App