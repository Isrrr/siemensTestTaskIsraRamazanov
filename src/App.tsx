import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Geolocation from '@react-native-community/geolocation'

import Navigation from './navigation'

const askLocationPermission = async () => {
  Geolocation.requestAuthorization((status: any) => {
    console.log('Location permission status: ', status)
  }, (error:any) => console.error('Location permission error: ', error))
}

function App(): React.JSX.Element {

  useEffect(() => {
    askLocationPermission()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
