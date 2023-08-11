import { NavigationContainer } from '@react-navigation/native'
import { SignIn } from '../screens/SignIn'
import { Loading } from '../components/Loading'
import { useEffect, useState } from 'react'
import { StackRoutes } from './stack.routes'
import { AuthProvider } from '../contexts/auth'
import { useTheme } from 'native-base'


export function Routes() {
    const { colors } = useTheme()

    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<any>()

    useEffect(() => {
        // buscar usuário logado atravéz do signin  e colocar no estado


        //setUser('isaque.silva')
        setIsLoading(false)
    }, [])

    if (isLoading) {
        return <Loading color={colors.yellow[500]} bgColor={colors.gray[900]} />
    }

    return (
        <NavigationContainer>
            <AuthProvider>
                <StackRoutes />
            </AuthProvider>
        </NavigationContainer>
    )
}