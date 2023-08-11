import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home'
import { SignIn } from '../screens/SignIn'


const { Navigator, Screen } = createNativeStackNavigator()

export function StackRoutes() {
    return (

        <Navigator initialRouteName='signin' >
            <Screen name='home' component={Home} />
            <Screen name='signin' component={SignIn} options={{ headerShown: false }} />
        </Navigator>
    )
}