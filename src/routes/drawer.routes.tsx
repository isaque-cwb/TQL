import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Home } from "../screens/Home";
import { SignIn } from "../screens/SignIn";
import { useTheme } from "native-base";




const { Navigator, Screen } = createDrawerNavigator()


export function DrawerRoutes() {
  const { colors } = useTheme()
  return (

    <Navigator initialRouteName="Home"  >
      <Screen name='Home' component={Home} options={{ headerShown: false }} />
    </Navigator>
  )
}