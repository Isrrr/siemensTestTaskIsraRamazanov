import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface WeatherItemProps {
  title: string
  descripton: string
  condition: string
}

export const WeatherItem: FC<WeatherItemProps> = ({ title, descripton, condition }) => {
  return (
    <View style={styles.item}>
      <Text>{title}</Text>
      <Text>
        {descripton}
      </Text>
      <Text>{condition}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
})

