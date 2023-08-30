import { useNavigation } from '@react-navigation/native'
import { IconButton, useTheme, Heading, StyledProps, HStack, Avatar, VStack, Center, Stack, Pressable, Alert, Flex } from 'native-base'
import { CaretLeft, UserCircle } from 'phosphor-react-native'
import LogoBranca from '../assets/logoBranca.svg'
import { Text } from 'react-native'
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
    <VStack bg={colors.purple[300]} w={'full'}   >
      <HStack space={'1'} >

        <Center  >
          <LogoBranca width={220} />
        </Center>

        <Stack w={'100%'} justifyContent={'center'} mx={0} p={2} pt={3}  >
          <HStack >
            {userData.usr_foto ?
              <Avatar source={{ uri: `data:image/jpeg;base64,${userData.usr_foto}` }} />
              :
              <UserCircle size={50} color='#fff' style={{ backgroundColor: '#ccc', }} />
            }
            <Stack p={'1.5'} h={50} w={'34%'}  >

              <Text numberOfLines={1} ellipsizeMode="tail"
                style={{ color: '#fff' }}
              >Olá </Text >
              <Text numberOfLines={1} ellipsizeMode="tail"
                style={{ color: '#fff', overflow: 'hidden', paddingRight: 30 }}
              >{userData.usr_nome} </Text >
            </Stack>
          </HStack>
        </Stack>

      </HStack>
      <Pressable
        w={'full'}

        onPress={handleGoBack}
      >
        <HStack
          w={'full'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <IconButton
            height={60}
            width={60}
            icon={<CaretLeft color={colors.gray[500]} size={24} />} onPress={handleGoBack} />
          <Heading color={'gray.100'} textAlign={'center'} fontSize={'lg'} flex={1} ml={-10} >
            TIMESHEET -
            {title}
          </Heading>
        </HStack>
      </Pressable>
    </VStack>
  )
}