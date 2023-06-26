import axios from "axios"


const api_key = process.env.REACT_APP_API_KEY
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getWeather = (clon, clat) => {
  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + clat + "&lon=" + clon + "&appid=" + api_key + "&units=metric"
  const request = axios.get(weatherUrl)
  return request.then(response => response.data)
}

export default {getAll, getWeather}