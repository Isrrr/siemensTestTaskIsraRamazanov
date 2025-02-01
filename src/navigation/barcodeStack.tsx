import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { BarcodeScanHistoryScreen, BarcodeScanScreen } from '../screens'

const BarcodeScanStack = createNativeStackNavigator({
  initialRouteName: 'BarcodeScanScreen',
  screens: {
    BarcodeScanScreen: {
      screen: BarcodeScanScreen,
    },
    BarcodeScanHistory: {
      screen: BarcodeScanHistoryScreen,
    },
  },
})

export default BarcodeScanStack
