import api from '../api'
import { addZipToHistory } from '../stores/inSessionStorage'
import { ZIP } from '../utils/constants'
// import Config from 'react-native-config'

const API_KEY = '10200f029ceb4851920205856252901'

// current.json?key=YOUR_API_KEY&q=ZIPCODE

export const fetchWeather = async (
  zip: string = ZIP,
  setWeather: (value: string) => void,
  setError: (value: string) => void,
) => {
  try {
    const response = await api.get(
      `forecast.json?key=${API_KEY}&q=${zip}&days=5`, // `forecast.json?key=${Config.API_KEY}&q=${zip}&days=5`,
    )
    setWeather(response.data)
    setError('')
    addZipToHistory(zip)
  } catch (error) {
    setError('Error retrieving data for ZIP-код.')
  }
}

export const fetchWeatherForZipCodesFromHistory = async (
  zipCodes: string[],
  setWeathers: (value: any[]) => void,
  setError: (value: string) => void,
) => {
  try {
    const weatherPromises = zipCodes.map(zip =>
      api.get(`current.json?key=${API_KEY}&q=${zip}`).then(({ data }) => ({
        zip,
        data,
      })),
    )

    const weatherData = await Promise.all(weatherPromises)

    setWeathers(weatherData)
    setError('')
  } catch (error) {
    setError('Error fetching weather data')
  }
}
