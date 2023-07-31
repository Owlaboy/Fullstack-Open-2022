import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNew = (blogToAdd) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  const user = JSON.parse(loggedUserJSON)

  const request = axios.post(baseUrl, blogToAdd, { 'headers': { 'Authorization': `bearer ${user.token}` } })
  return request.then(response => response.data)
}

const update = (blogToUpdate) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  const user = JSON.parse(loggedUserJSON)

  const request = axios.put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate, { 'headers': { 'Authorization': `bearer ${user.token}` } })
  return request.then(response => response.data)
}

const remove = (blogToDelete) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  const user = JSON.parse(loggedUserJSON)

  const request = axios.delete(`${baseUrl}/${blogToDelete.id}`, { 'headers': { 'Authorization': `bearer ${user.token}` } })
  return request.then(response => response.data)
}

export default { getAll, addNew, update, remove }