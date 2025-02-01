import { useCallback, useState } from 'react'
import { Button, Text, View } from 'react-native'
import { Camera, CameraType } from 'react-native-camera-kit'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { OnReadCodeData } from 'react-native-camera-kit/dist/CameraProps'

import { addBarcodeToHistory } from '../../stores/inSessionStorage'

import { styles } from './styles'

const BarcodeScanScreen = () => {
  const navigation = useNavigation()

  const [barcode, setBarcode] = useState<string>('')
  const [isBarcodeScanning, setIsBarcodeScanning] = useState<boolean>(false)

  useFocusEffect(useCallback(() => {
    setIsBarcodeScanning(false)
  }, []))

  const onBarcodeScan = (scanResult: OnReadCodeData) => {
    const scannedBarcode = scanResult.nativeEvent.codeStringValue
    setBarcode(scannedBarcode)
    addBarcodeToHistory(scannedBarcode)
    setIsBarcodeScanning(false)
  }

  const handlScanBarcode = () => {
    setIsBarcodeScanning(true)
  }

  const handleHistoryPress = () => {
    navigation.navigate('BarcodeScanHistory')
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Scan Barcode</Text>
        <Button title="History" onPress={handleHistoryPress} />
      </View>

      {
        isBarcodeScanning ? (
          <Camera
            scanBarcode
            style={styles.container}
            onReadCode={onBarcodeScan}
            cameraType={CameraType.Back}
            showFrame={true}
            laserColor="red"
            frameColor="white"
          />
        ) : (
          <Button title="Scan Barcode" onPress={handlScanBarcode} />
        )
      }


      {barcode && <Text style={styles.barcodeText}>Scanned: {barcode}</Text>}
    </View>
  )
}

export default BarcodeScanScreen
