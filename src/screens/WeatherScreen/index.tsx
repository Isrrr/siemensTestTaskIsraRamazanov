import { useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList, Button } from 'react-native'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { fetchWeather } from '../../api/weather'
import { ZIP } from '../../utils/constants'
import { WeatherItem } from '../../components/WeatherItem'

const WeatherScreen = () => {
  const [zip, setZip] = useState(ZIP)
  const [weather, setWeather] = useState('')
  const [error, setError] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    if (zip.length === 5) {
      fetchWeather(zip, setWeather, setError)
    }
  }, [zip])

  const handleHistoryPress = () => {
    navigation.navigate('WeatherHistory')
  }

  const handleSetZip = (text: string) => {
    if (text.length <= 5 && /^\d*$/.test(text)) {
      setZip(text)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weather Forecast</Text>
        <Button title="History" onPress={handleHistoryPress} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter ZIP Code"
        keyboardType="numeric"
        value={zip}
        onChangeText={handleSetZip}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {weather && (
        <View>
          <Text style={styles.location}>
            {weather.location.name}, {weather.location.country}
          </Text>
          <Text style={styles.temp}>
            Current: {weather.current.temp_f} ({weather.current.condition.text})
          </Text>

          <FlatList
            data={weather.forecast.forecastday}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => (
              <WeatherItem title={item.date} descripton={`Max: ${item.day.maxtemp_f} - Min ${item.day.mintemp_f}`} condition={item.day.condition.text} />
            )}
          />
        </View>
      )}
    </View>
  )
}

export default WeatherScreen
