import { Text, FlatList } from 'react-native'
import { getBarcodeHistory } from '../../stores/inSessionStorage'
import { styles } from './styles'

const BarcodeScanHistoryScreen = () => {
  const history = getBarcodeHistory()

  console.log('history:', history)


  return (
    <FlatList
      data={history}
      style={styles.container}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => {
        return (
          <Text style={styles.item}>{item}</Text>
        )
      }}
    />
  )
}

export default BarcodeScanHistoryScreen
