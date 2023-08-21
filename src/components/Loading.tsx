import { Center, Spinner } from 'native-base'

type SpinnerProps = {
  color?: string;
  bgColor?: string
}

export function Loading({ color, bgColor }: SpinnerProps) {
  return (
    <Center flex={1} bg={bgColor} >
      <Spinner color={color} size={40} />
    </Center>
  )
}