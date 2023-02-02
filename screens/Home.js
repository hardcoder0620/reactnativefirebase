import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Appbar,ActivityIndicator } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import * as Animatable from 'react-native-animatable';


export default function Home({ navigation, route }) {

  useEffect(() => {
    getData()
  }, [])

  const [empState, setEmpState] = useState()

  async function getData() {
    try {
      const empCollection = await firestore().collection('employee').get();
      console.warn("empCollection._docs", empCollection._docs)
      setEmpState(empCollection._docs)
    } catch (error) {
      console.log("getData err", error)
    }
  }
 


  return (
    <View style={{ flex: 1 }} >
      <Appbar.Header >
        <Appbar.Content title="Home" />
        <Appbar.Action icon="calendar" onPress={() => { }} />
        <Appbar.Action icon="magnify" onPress={() => { }} />
      </Appbar.Header>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Button mode="contained" onPress={() => navigation.navigate('about')}>
          <Text style={{ textTransform: 'uppercase' }}>
            go to about
          </Text>
        </Button>
        <View style={{ paddingTop: 10 }} >
          {
            empState ?
              empState.map((elem,index) => {
                return (
                  <Animatable.View animation="zoomInUp" delay={index*300} key={index} style={{ backgroundColor: 'purple', padding: 10, borderRadius: 10, alignItems: 'center', gap: 5,marginBottom:10 }}>
                    <Text style={{ color: 'white', fontSize: 20, textTransform: 'capitalize' }}>
                      name: {elem._data.name}
                    </Text>
                    <Text style={{ color: 'white' }}>
                      age: {elem._data.age}
                    </Text>
                  </Animatable.View>
                )
              })
              : <ActivityIndicator animatin={true} color={'purple'} size="large" />
          }
        </View>

      </View>
    </View>
  )
}