import { Input as NBInput, IInputProps, useTheme } from 'native-base'

export function Input({ ...rest }: IInputProps) {
    const { colors } = useTheme()
    return (
        <NBInput
            variant={'outline'}
            h={14}
            size={'md'}
            fontFamily={'body'}
            _focus={{ bg: colors.gray[100], borderColor: colors.purple[100] }}
            {...rest}
        />
    )
}