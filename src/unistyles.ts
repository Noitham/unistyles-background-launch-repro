import { StyleSheet } from 'react-native-unistyles'

const lightTheme = { colors: { box: '#2f80ed', text: '#111111' } }

type AppThemes = { light: typeof lightTheme }

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({ themes: { light: lightTheme } })
