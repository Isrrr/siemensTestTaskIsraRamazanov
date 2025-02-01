import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

const zipKey = 'zipHistory'
const barcodeKey = 'barcodeHistory'

export const getZipHistory = () => {
  const history = storage.getString(zipKey)
  return history ? JSON.parse(history) : []
}

export const addZipToHistory = (zipCode: string) => {
  const history = getZipHistory()

  const newHistory = history.filter((item: string) => item !== zipCode)

  newHistory.unshift(zipCode)

  if (newHistory.length > 5) {
    newHistory.pop()
  }

  storage.set(zipKey, JSON.stringify(newHistory))
}

export const getBarcodeHistory = () => {
  const history = storage.getString(barcodeKey)
  return history ? JSON.parse(history) : []
}

export const addBarcodeToHistory = (barCode: string) => {
  const history = getBarcodeHistory()

  const newHistory = history.filter((item: string) => item !== barCode)

  newHistory.unshift(barCode)

  if (newHistory.length > 5) {
    newHistory.pop()
  }

  storage.set(barcodeKey, JSON.stringify(newHistory))
}
