import { Center, Text, HStack, Image, Stack, Box, Input, Button, useTheme } from 'native-base'
import Logo from '../assets/logo.svg'
import { Input as NBInput } from '../components/Input'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import api from '../services/api'
import axios from 'axios'
import { useUser } from '../contexts/auth'

export function SignIn() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  const { userData, updateUser } = useUser()

  const { colors } = useTheme()

  async function handleSignIn() {
    if (!user || !password) {
      Alert.alert('Erro de Login', 'Informe Usuário e Senha')
    } else {


      const response = await api.post('/user', {
        usr_login: user
      }).then((response) => {
        const data = response.data

        // verificar a senha é igual o que foi informado, aí seta dados do usuário no contexto.

        updateUser(data)
        navigation.navigate('home')
      }).catch((error) => {

        Alert.alert('Erro', `Usuário ${user} não encontrado!`)
      })






      // se usuário existir no bd e senha correta ai logar 

    }

  }

  function handleUserState(user: string) {
    const userLow = user.toLowerCase()
    setUser(userLow)
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
          onChangeText={handleUserState}
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