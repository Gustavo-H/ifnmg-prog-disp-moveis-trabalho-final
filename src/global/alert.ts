import { Alert, Platform } from 'react-native';

// Alert.alert is a no-op on react-native-web, so fall back to the browser dialog
export function showAlert(title: string, message: string): void {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
    return;
  }
  Alert.alert(title, message);
}
