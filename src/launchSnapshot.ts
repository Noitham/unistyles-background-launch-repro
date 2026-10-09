import { AppState, Dimensions } from 'react-native'
import { UnistylesRuntime } from 'react-native-unistyles'

// Read once when the JS bundle loads, the same way a module-level constant would.
export const launchSnapshot = {
  appState: AppState.currentState,
  unistylesScreen: { ...UnistylesRuntime.screen },
  rnWindow: Dimensions.get('window'),
  rnScreen: Dimensions.get('screen'),
}
