import Togglable from "./Togglable"
import {useState} from "react"
import blogsService from "../services/blogs"


const Blog = (props) => {
  const blog = props.blog
  const handleDelete = props.handleDelete
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom:5
  }

  const buttonStyle = {
    "backgroundColor": "#3b65ff",
    "color": "white"
  }

  const handleLike = () => {
    setLikes(likes+1)
    blog.likes = likes+1

    const user = blog.user
    blog.user = blog.user.id

    blogsService.update(blog).then()

    blog.user = user
  }
  
  const handleDeleteClick = () => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}?`)) {
      handleDelete(blog)
    }
  }
  
  return (
    <div style={blogStyle}>
        {blog.title} {blog.author}
      <Togglable id="bruh" datat-testid="bruh2" buttonLabel="more info">
        <div>
          <div>{blog.url}</div>
          <div>likes: {likes} <button onClick={handleLike}>like</button></div>
          <div>{blog.user.name}</div>

          <div>
            <button onClick={handleDeleteClick} style={buttonStyle} >Remove</button>
          </div>
          
        </div>          
      </Togglable>
        
    </div>
    )}

export default Blog