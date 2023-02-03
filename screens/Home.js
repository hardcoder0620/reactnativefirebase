import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Appbar, ActivityIndicator, MD2LightTheme, useTheme, TextInput, IconButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import * as Animatable from 'react-native-animatable';


export default function Home({ navigation, route }) {
  const theme = useTheme()


  useEffect(() => {
    getData()
  }, [])

  const [empState, setEmpState] = useState()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

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
    <View style={{ flex: 1, backgroundColor: 'white' }} >
      <Appbar.Header >
        <Appbar.Content title="Home" />
        <Appbar.Action icon="calendar" onPress={() => { }} />
        <Appbar.Action icon="magnify" onPress={() => { }} />
      </Appbar.Header>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <View style={{ gap: 10 }} >
          <TextInput mode='outlined' value={name} onChangeText={(val) => { setName(val) }} label="name" />
          <TextInput mode='outlined' value={age} onChangeText={(val) => { setAge(val) }} label="age" />
          <Button icon="plus"   mode="contained-tonal" loading={false} onPress={() => Alert.alert('Pressed','sec')}>
           ADD ITEM
          </Button>
        </View>
        <View style={{ paddingTop: 10 }} >
          {
            empState ?
              empState.map((elem, index) => {
                return (
                  <Animatable.View animation="zoomInUp" delay={index * 300} key={index} style={{ backgroundColor: theme.colors.primary, padding: 10, borderRadius: 10, alignItems: 'center', gap: 5, marginBottom: 10 }}>
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