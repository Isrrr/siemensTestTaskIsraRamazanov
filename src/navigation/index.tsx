import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStaticNavigation } from '@react-navigation/native'

import BottomTabs from './bottomTabs'

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    BottomTabs: {
      screen: BottomTabs,
    },
  },
})

const Navigation = createStaticNavigation(RootStack)

export default Navigation
