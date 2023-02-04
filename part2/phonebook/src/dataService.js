import axios from "axios"
const baseUrl = 'https://part3-1g7g.onrender.com/api/persons'
// http://localhost:3001/api/persons

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNew = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`).then()
    return request.then(response => response.data)
}

export default {getAll, addNew, update, remove }