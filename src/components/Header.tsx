import { useNavigation } from '@react-navigation/native'
import { IconButton, useTheme, Heading, StyledProps, HStack, Avatar, VStack, Center, Stack, Pressable, Alert, Flex } from 'native-base'
import { SignOut, UserCircle } from 'phosphor-react-native'
import LogoBranca from '../assets/logoBranca.svg'
import { Image, Text } from 'react-native'
import { useUser } from '../contexts/auth'

type Props = StyledProps & {
  title: string
}


export function Header({ title, ...rest }: Props) {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const { userData } = useUser()


  function handleGoBack() {
    navigation.goBack()
  }


  return (
    <VStack bg={colors.purple[300]} w={'100%'} px={'1%'} pt={'10%'} >
      <HStack px={'1%'} alignItems={'center'} justifyContent={'space-between'}>
        <Center pt={'1'}  >
          <LogoBranca width={240} />
        </Center>
        {userData.usr_foto ?
          <Image source={{ uri: `data:image/jpeg;base64,${userData.usr_foto}` }} width={58} height={58} borderRadius={50} />
          :
          <UserCircle size={50} color='#fff' />
        }
        <Stack py={'0'} h={50} w={'23%'} pl={'2%'} pt={'0'} >

          <Text numberOfLines={1} ellipsizeMode="tail"
            style={{ color: '#fff' }}
          >Olá </Text >
          <Text numberOfLines={2} ellipsizeMode="tail"
            style={{ color: '#fff', overflow: 'hidden', paddingRight: '0%' }}
          >{userData.usr_nome} </Text >
        </Stack>
      </HStack>
      <HStack
        w={'full'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Heading color={'gray.100'} textAlign={'center'} fontSize={'lg'} ml={'18%'}  >
          Time Sheet -
          {title}
        </Heading>
        <Pressable
          w={'full'}

          onPress={handleGoBack}
        >
          <IconButton
            height={60}
            width={60}

            icon={<SignOut color={colors.gray[300]} size={30} />} onPress={handleGoBack} ml={'10%'} />
        </Pressable>
      </HStack>
    </VStack>
  )
}