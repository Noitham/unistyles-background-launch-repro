import { useEffect, useState } from 'react'
import { AppState, Text, View } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

import { launchSnapshot } from './launchSnapshot'

const size = (dimensions: { width: number; height: number }) => `${dimensions.width} x ${dimensions.height}`
const time = () => new Date().toISOString().slice(11, 23)

export default function App() {
  const { rt } = useUnistyles()
  const [events, setEvents] = useState<string[]>([])

  useEffect(() => {
    setEvents((previous) => [...previous, `${time()} rt.screen.width = ${rt.screen.width}`])
  }, [rt.screen.width])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      setEvents((previous) => [...previous, `${time()} AppState = ${state}`])
    })
    return () => subscription.remove()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>At bundle load</Text>
      <Text style={styles.line}>AppState: {launchSnapshot.appState}</Text>
      <Text style={styles.line}>UnistylesRuntime.screen: {size(launchSnapshot.unistylesScreen)}</Text>
      <Text style={styles.line}>Dimensions window: {size(launchSnapshot.rnWindow)}</Text>
      <Text style={styles.line}>Dimensions screen: {size(launchSnapshot.rnScreen)}</Text>
      <Text style={styles.line}>UnistylesRuntime.pixelRatio: {launchSnapshot.unistylesPixelRatio}</Text>
      <Text style={styles.line}>PixelRatio.get(): {launchSnapshot.rnPixelRatio}</Text>

      <Text style={styles.title}>Now</Text>
      <Text style={styles.line}>useUnistyles().rt.screen: {size(rt.screen)}</Text>

      <Text style={styles.title}>Box with width rt.screen.width - 32</Text>
      <View style={styles.box} />

      <Text style={styles.title}>Events</Text>
      {events.map((event, index) => (
        <Text key={index} style={styles.line}>
          {event}
        </Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top + 16,
    paddingHorizontal: 16,
    gap: 4,
  },
  title: {
    marginTop: 12,
    fontWeight: '700',
    color: theme.colors.text,
  },
  line: {
    fontFamily: 'Menlo',
    fontSize: 12,
    color: theme.colors.text,
  },
  box: {
    width: rt.screen.width - 32,
    height: 24,
    backgroundColor: theme.colors.box,
  },
}))
