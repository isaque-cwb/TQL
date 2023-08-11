import { NavigationContainer } from '@react-navigation/native'
import { SignIn } from '../screens/SignIn'
import { Loading } from '../components/Loading'
import { useEffect, useState } from 'react'
import { StackRoutes } from './stack.routes'
import { AuthProvider } from '../contexts/auth'


export function Routes() {

    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<any>()

    useEffect(() => {
        // buscar usuário logado atravéz do signin  e colocar no estado


        //setUser('isaque.silva')
        setIsLoading(false)
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <NavigationContainer>
            <AuthProvider>
                <StackRoutes />
            </AuthProvider>
        </NavigationContainer>
    )
}