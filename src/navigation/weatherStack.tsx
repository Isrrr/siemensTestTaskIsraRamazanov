import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { WeatherScreen, WeatherHistoryScreen } from '../screens'

const WeatherStack = createNativeStackNavigator({
  initialRouteName: 'WeatherScreen',
  screens: {
    WeatherScreen: {
      screen: WeatherScreen,
    },
    WeatherHistory: {
      screen: WeatherHistoryScreen,
    },
  },
})

export default WeatherStack
