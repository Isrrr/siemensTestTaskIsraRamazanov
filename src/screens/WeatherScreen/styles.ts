import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: { padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: { color: 'red' },
  location: { fontSize: 18, fontWeight: 'bold' },
  temp: { fontSize: 16, marginBottom: 10 },
})
