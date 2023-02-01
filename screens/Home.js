import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

export default function Home({navigation,route}) {
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity  onLongPress={()=>{
       navigation.navigate('about')
      }}>
        <Text>
            Go to about
        </Text>
      </TouchableOpacity>
    </View>
  )
}