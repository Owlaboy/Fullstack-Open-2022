import axios from "axios"
import KeyObj from "./config"
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getWeather = (clon, clat) => {
  console.log('%cdataService.js line:12 KeyObj', 'color: #007acc;', KeyObj);
  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + clat + "&lon=" + clon + "&appid=" + KeyObj.api_key + "&units=metric"
  const request = axios.post(weatherUrl)
  return request.then(response => response.data)
}

export default {getAll, getWeather}