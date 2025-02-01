import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { BluetoothScreen, WiFiScreen } from '../screens'

import WeatherStack from './weatherStack'
import BarcodeScanStack from './barcodeStack'

const BottomTabs = createBottomTabNavigator({
  screenOptions: {
    tabBarShowLabel: true,
    tabBarIcon: () => null,
  },
  screens: {
    Weather: {
      screen: WeatherStack,
      options: {
        headerShown: false,
      },
    },
    Bluetooth: {
      screen: BluetoothScreen,
    },
    BarcodeScan: {
      screen: BarcodeScanStack,
      options: {
        headerShown: false,
      },
    },
    WiFi: {
      screen: WiFiScreen,
    },
  },
})

export default BottomTabs
