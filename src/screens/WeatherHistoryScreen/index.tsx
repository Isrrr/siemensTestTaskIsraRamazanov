import { Text, FlatList, View } from 'react-native'
import { getZipHistory } from '../../stores/inSessionStorage'
import { styles } from './styles'
import { fetchWeatherForZipCodesFromHistory } from '../../api/weather'
import { useEffect, useState } from 'react'
import { WeatherItem } from '../../components/WeatherItem'

const WeatherHistoryScreen = () => {
  const history = getZipHistory()
  const [weathers, setWeathers] = useState<any[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchWeatherForZipCodesFromHistory(history, setWeathers, setError)
  }, [history])

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={weathers}
      style={styles.container}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => {
        return (
          <WeatherItem title={item.zip} descripton={item.data.current.temp_f} condition={item.data.current.condition.text} />
        )
      }}
    />
  )
}

export default WeatherHistoryScreen
