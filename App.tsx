import { StatusBar } from 'expo-status-bar';
import { Center, NativeBaseProvider, Text } from 'native-base'

import { useFonts, Roboto_300Light, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { THEME } from './src/styles/theme'
import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/SignIn';




export default function App() {

  const [fontsLoaded] = useFonts({ Roboto_300Light, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })




  return (
    <NativeBaseProvider theme={THEME}>
      {
        !fontsLoaded ? <Loading /> : <SignIn />
      }
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}

