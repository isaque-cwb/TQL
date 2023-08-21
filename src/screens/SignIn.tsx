import { Center, Text, HStack, Image, Stack, Box, Input, Button, useTheme } from 'native-base'
import Logo from '../assets/logo.svg'
import { Input as NBInput } from '../components/Input'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import api from '../services/api'
import { useUser } from '../contexts/auth'
import { Loading } from '../components/Loading'
import { Buffer } from 'node:buffer'



export function SignIn() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  const { userData, updateUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const { colors } = useTheme()

  async function handleSignIn() {
    if (!user || !password) {
      Alert.alert('Erro de Login', 'Informe Usuário e Senha')
    } else {

      setIsLoading(true)
      const response = await api.post('/user', {
        usr_login: user
      }).then((response) => {

        const data = response.data


        const user = {
          usr_codigo: data.usr_codigo,
          usr_login: data.usr_login,
          usr_nome: data.usr_nome,
          usr_email: data.usr_email,
          usr_celular: data.usr_celular,
          usr_foto: data.usr_foto
        }

        console.log(user)
        updateUser(user)
        navigation.navigate('home')
        setIsLoading(false)
        setUser('')
        setPassword('')
      }).catch((error) => {
        setIsLoading(false)
        Alert.alert('Erro', `Usuário ${user} não encontrado!`)
      })
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
          {isLoading ? <Loading color={colors.white} bgColor={colors.purple[300]} /> : <Text fontSize={20} color={'white'}>Entrar</Text>}
        </Button>
      </Stack>
    </Center>

  )
}