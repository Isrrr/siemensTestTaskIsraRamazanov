import React, { useEffect, useState } from 'react'
import { View, Text, Button, FlatList, TouchableOpacity, PermissionsAndroid, Platform, Alert } from 'react-native'
import { BleManager, Device } from 'react-native-ble-plx'
import { styles } from './styles'

const manager = new BleManager()

const BluetoothScreen = () => {
  const [devices, setDevices] = useState<Device[]>([])
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null)

  useEffect(() => {
    return () => {
      manager.destroy()
    }
  }, [])

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ])
      return (
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED
      )
    }
    return true
  }

  const startScan = async () => {
    const hasPermission = await requestPermissions()
    if (!hasPermission) {
      Alert.alert('Error', 'Need access to Bluetooth')
      return
    }

    setDevices([])
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('Scan error:', error)
        return
      }

      if (device && device.name) {
        setDevices((prevDevices) => {
          const exists = prevDevices.some((d) => d.id === device.id)
          return exists ? prevDevices : [...prevDevices, device]
        })
      }
    })

    setTimeout(() => {
      manager.stopDeviceScan()
    }, 5000)
  }

  const connectToDevice = async (device: Device) => {
    try {
      const _connectedDevice = await manager.connectToDevice(device.id)
      setConnectedDevice(_connectedDevice)
      Alert.alert('Conntected', `Device: ${device.name}`)
    } catch (error) {
      Alert.alert('Connection error', 'Not connected')
    }
  }

  const renderItem = ({ item }:  { item: Device }) => (
    <TouchableOpacity onPress={() => connectToDevice(item)} style={styles.item}>
      <Text>{item.name} ({item.id})</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Button title="🔍 Find devices" onPress={startScan} />

      {connectedDevice && <Text>Connected to: {connectedDevice.name}</Text>}

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  )
}

export default BluetoothScreen
