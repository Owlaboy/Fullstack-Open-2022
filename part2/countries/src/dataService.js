import axios from "axios"
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
// http://localhost:3001/api/persons

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


export default {getAll}