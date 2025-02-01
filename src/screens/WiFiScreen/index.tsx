import React, { useState } from 'react'
import { View, Text, Button, FlatList, PermissionsAndroid, Platform, Alert } from 'react-native'
import WifiManager, { WifiEntry } from 'react-native-wifi-reborn'

import { styles } from './styles'

const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )
    return granted === PermissionsAndroid.RESULTS.GRANTED
  }
  return true
}

const WiFiScreen = () => {
  const [wifiList, setWifiList] = useState<WifiEntry[]>([])
  const [connectedWifi, setConnectedWifi] = useState('')

  const scanWifiNetworks = async () => {
    const hasPermission = await requestPermissions()
    if (!hasPermission) {
      Alert.alert('Permission denied')
      return
    }

    const networks = await WifiManager.loadWifiList()

    setWifiList(networks)
  }

  const getCurrentWifi = async () => {
    setConnectedWifi('fetching...')
    WifiManager.getCurrentWifiSSID()
      .then(setConnectedWifi)
      .catch((e) => setConnectedWifi(e.toString()))
  }

  return (
    <View style={styles.container}>

      <View style={styles.scanButtons}>
        {
          Platform.OS !== 'ios' && <Button title="Scan WiFi" onPress={scanWifiNetworks} />
        }
        <Button title="Get Connected WiFi" onPress={getCurrentWifi} />
      </View>

      {connectedWifi && <Text style={styles.connectedText}>{connectedWifi}</Text>}

      {
        Platform.OS !== 'ios' && (
          <FlatList
            data={wifiList}
            keyExtractor={(item) => item.BSSID}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>SSID: {item.SSID}</Text>
                <Text>Signal Strength: {item.level}</Text>
              </View>
            )}
          />
        )
      }
    </View>
  )
}

export default WiFiScreen
