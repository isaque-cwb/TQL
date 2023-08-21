import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Center, NativeBaseProvider, Text, useTheme } from 'native-base'
import { LogBox } from 'react-native'
import { useFonts, Roboto_300Light, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { THEME } from './src/styles/theme'
import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/SignIn';
import { Home } from './src/screens/Home';
import { Routes } from './src/routes';


LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.'])


export default function App() {

  const [fontsLoaded] = useFonts({ Roboto_300Light, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })




  return (
    <NativeBaseProvider theme={THEME}>
      {
        !fontsLoaded ? <Loading /> : <Routes />
      }
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}

