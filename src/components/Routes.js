import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home';
import About from '../../screens/About';

const Stack = createStackNavigator();


export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="about" component= {About} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}