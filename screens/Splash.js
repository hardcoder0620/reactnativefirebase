import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

export default function Splash({navigation,route}) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('home')
        }, 1000);
    
     
    }, [])
    
  return (
    <View style={{flex:1,backgroundColor:'blue',alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:30}}>Splash</Text>
    </View>
  )
}