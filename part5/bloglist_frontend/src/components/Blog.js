import Togglable from './Togglable'

const Blog = (props) => {
  const blog = props.blog
  const handleDelete = props.handleDelete
  const handleLike = props.handleLike

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom:5
  }

  const buttonStyle = {
    'backgroundColor': '#3b65ff',
    'color': 'white'
  }

  const handleDeleteClick = () => {
    if (props.deletingUser.username === props.blog.user.username) {
      if (window.confirm(`Remove blog ${blog.name} by ${blog.author}?`)) {
        handleDelete(blog)
      }
    } else {
      console.log('Invalid user')
    }
  }

  const handleLikeClick = async () => {
    await handleLike(blog)
  }

  return (
    <div data-testid='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable showButtonId={'view'} showButtonLabel="more info">
        <div>
          <div>{blog.url}</div>
          <div>likes: {blog.likes} <button id={'like'} onClick={handleLikeClick }>like</button></div>
          <div>{blog.user.name}</div>
          {(props.deletingUser.username === props.blog.user.username) &&
          <div>
            <button id={'remove'} onClick={handleDeleteClick} style={buttonStyle} >Remove</button>
          </div>
          }
        </div>
      </Togglable>

    </div>
  )}

export default Blog