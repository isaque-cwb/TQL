import { Center, Text, HStack, Image, Stack, Box, Input, Button, useTheme } from 'native-base'
import Logo from '../assets/logo.svg'
import { Input as NBInput } from '../components/Input'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'

export function SignIn() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  const { colors } = useTheme()

  function handleSignIn() {
    if (!user || !password) {
      Alert.alert('Erro de Login', 'Informe Usuário e Senha')
    } else {

      // buscar usuário no BD verificar se usuário e senha é válido

      // se usuário existir no bd e senha correta ai logar 
      navigation.navigate('home')
      setUser('')
      setPassword('')
    }

  }


  return (
    <Center flex={1} >




      <Logo width={350} />
      <Stack space={4} margin={3} width={350} >
        <Stack alignItems={'center'} >

          <Text fontFamily={'heading'} fontSize={30} color={'purple.300'} >
            Login
          </Text>
        </Stack>

        <NBInput
          placeholder='Digite seu Usuário'
          onChangeText={setUser}
          value={user}
          fontSize={18}
        />
        <NBInput
          placeholder='Digite sua Senha'
          onChangeText={setPassword}
          value={password}
          fontSize={18}
        />

        <Button
          h={50}
          bgColor={colors.purple[300]}
          _pressed={{ bg: colors.purple[100] }}
          onPress={handleSignIn}
        >
          <Text fontSize={20} color={'white'}>Entrar</Text>
        </Button>
      </Stack>
    </Center>

  )
}