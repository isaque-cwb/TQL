import { Center, Text, HStack, Image, Stack, Box, Input, Button, useTheme } from 'native-base'
import Logo from '../assets/logo.svg'
import { Input as NBInput } from '../components/Input'

export function SignIn() {

  const { colors } = useTheme()
  return (
    <Center flex={1} >




      <Logo width={300} />
      <Stack space={4} margin={3} width={300} >
        <Stack alignItems={'center'} >

          <Text fontFamily={'heading'} fontSize={30} color={'purple.300'} >
            Login
          </Text>
        </Stack>

        <NBInput placeholder='Digite seu Usuário' />
        <NBInput placeholder='Digite sua Senha' />

        <Button
          h={50}
          bgColor={colors.purple[300]}
          _pressed={{ bg: colors.purple[100] }}
        >
          <Text fontSize={20} color={'white'}>Entrar</Text>
        </Button>
      </Stack>
    </Center>

  )
}