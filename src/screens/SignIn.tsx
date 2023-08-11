import { Center, Text, HStack, Image, Stack, Box, Input, Button, useTheme } from 'native-base'
import Logo from '../assets/logo.svg'
import { Input as NBInput } from '../components/Input'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import api from '../services/api'
import axios from 'axios'

export function SignIn() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  const { colors } = useTheme()

  async function handleSignIn() {
    if (!user || !password) {
      Alert.alert('Erro de Login', 'Informe Usuário e Senha')
    } else {

      // buscar usuário no BD verificar se usuário e senha é válido
      const response = await axios.get('https://viacep.com.br/ws/82820090/json/')
      console.log(response.data)

      // const response = await fetch('http://localhost:3000/user/users', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     usr_logins: user
      //   }),
      // }).then(() => {
      //   navigation.navigate('home')
      //   setUser('')
      //   setPassword('')
      //   console.log(response)
      // }).catch((error) => {
      //   console.log('Erro ao buscar dados: ', error)
      // })



      // se usuário existir no bd e senha correta ai logar 

    }

  }


  return (
    <Center flex={1}  >

      <Logo width={350} />
      <Stack space={8} margin={3} width={350}  >
        <Stack alignItems={'center'}  >

          <Text fontFamily={'heading'} fontSize={35} color={'purple.300'} >
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