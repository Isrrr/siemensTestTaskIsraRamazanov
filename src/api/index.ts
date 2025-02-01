import axios from 'axios'
// import Config from 'react-native-config'

const BASE_URL = 'https://api.weatherapi.com/v1/'

const api = axios.create({
  baseURL: BASE_URL, // Config.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async config => config,
  error => Promise.reject(error),
)

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  },
)

export default api
