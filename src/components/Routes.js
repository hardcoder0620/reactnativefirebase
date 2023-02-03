import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home';
import About from '../../screens/About';
import Splash from '../../screens/Splash';


const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}} >
                <Stack.Screen name='splash' component={Splash} />
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="about" component= {About} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}