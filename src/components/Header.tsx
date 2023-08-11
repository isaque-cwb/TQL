import { useNavigation } from '@react-navigation/native'
import { IconButton, useTheme, Heading, StyledProps, HStack, Avatar, VStack, Center, Stack, Divider } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import LogoBranca from '../assets/logoBranca.svg'
import { Text } from 'react-native'

type Props = StyledProps & {
  title: string
}


export function Header({ title, ...rest }: Props) {
  const { colors } = useTheme()
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }


  return (
    <VStack bg={colors.purple[300]}  >
      <HStack>

        <Center  >
          <LogoBranca width={220} />
        </Center>

        <Stack w={200} justifyContent={'center'} mx={2} p={2} pr={50} >
          <HStack >
            <Avatar source={{ uri: 'https://github.com/isaque-cwb.png' }} />
            <Stack p={'1'} h={50} w={130} >

              <Text numberOfLines={1} ellipsizeMode="tail"
                style={{ color: '#fff', marginLeft: 5, overflow: 'hidden' }}
              >Olá </Text >
              <Text numberOfLines={1} ellipsizeMode="tail"
                style={{ color: '#fff', marginLeft: 5, overflow: 'hidden' }}
              >Isaque Lourenço da silva filho algo mais </Text >
            </Stack>
          </HStack>
        </Stack>

      </HStack>

      <HStack
        w={'full'}
        justifyContent={'space-between'}
        alignItems={'center'}

        {...rest}
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
    </VStack>
  )
}