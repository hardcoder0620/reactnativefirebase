import { View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Appbar, ActivityIndicator, MD2LightTheme, useTheme, TextInput, IconButton, Modal, Portal, FAB } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import iconM from "react-native-vector-icons/MaterialIcons"

import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement,incrementByAmount } from '../store/slices/counterSlice';


export default function Home({ navigation, route }) {

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()


  const theme = useTheme()


  useEffect(() => {
    getData()
  }, [])

  const [empState, setEmpState] = useState()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [isMOdal, setIsModal] = useState(false)
  const [updateName, setUpdateName] = useState('')
  const [updateAge, setUpdateAge] = useState('')
  const [updatingid, setUpdatingid] = useState('')
  const [isLogMOdal, setIsLogModal] = useState(false)
  const [logEmail, setLogEmail] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [logPass, setLogPass] = useState('')
  const [regPass, setRegPass] = useState('')
  const [isrejMOdal, setIsrejMOdal] = useState()
  const [loginLoader,setLoginLoader]=useState(false)
  const [registerLoader,setRegisterLoader]=useState(false)

  async function getData() {
    try {
      const empCollection = await firestore().collection('Employee').get();
      // console.warn("empCollection._docs", empCollection._docs[0]._ref._documentPath._parts[1])
      console.warn("empCollection._docs", empCollection._docs)
      setEmpState(empCollection._docs)
    } catch (error) {
      console.log("getData err", error)
    }
  }


  async function addItem() {
    // try {
    //   console.warn('adding')
    //   const user = await firestore().collection('employee').add({
    //     name: name,
    //     age: age,
    //   });
    //   console.warn(user)
    //   setName('')
    //   setAge('')
    //   getData()

    // } catch (error) {
    //   console.log(error)
    // }

    setName('')
    setAge('')
    firestore().collection('Employee').add({
      age: age,
      name: name,
    }).then((user) => {
      console.warn('added successfully')
      console.warn(user);
      getData()
    });
  }


  async function deleteItem(id) {
    // try {
    //   await  firestore().collection('employee').doc(id).delete()
    //   console.log('User deleted!');
    //     getData()
    // } catch (error) {
    //   console.log(error)
    // }
    
    firestore()
      .collection('Employee')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
        getData()

      });
  }


  async function updateitem() {
    firestore()
      .collection('Employee')
      .doc(updatingid)
      .update({
        name: updateName,
        age: updateAge,
      })
      .then(() => {
        console.log('User updated!');
        getData()
        setIsModal(false)
      });

  }

  async function registerUser() {
    setRegisterLoader(true)
    auth().createUserWithEmailAndPassword(regEmail, regPass)
      .then((user) => {
        setRegisterLoader(false)
        console.log('User account created & signed in!');
        setIsrejMOdal(false)
        setRegEmail('')
        setRegPass('')
        console.log("user registerd", user)
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  }


  async function loginUser() {
    setLoginLoader(true)

    auth().signInWithEmailAndPassword(logEmail, logPass)
      .then((user) => {
        console.log(user);
        setLoginLoader(false)
        setIsLogModal(false)
        setLogEmail('')
        setLogPass('')
      })

      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }} >
      <Appbar.Header >
        <Appbar.Content title="Home" />
        <Appbar.Action icon="sign-out" onPress={() => { }} />
        <Appbar.Action icon={'user'} onPress={() => { setIsLogModal(true) }} />
      </Appbar.Header>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <View style={{ gap: 10 }} >
          <TextInput mode='outlined' value={name} onChangeText={(val) => { setName(val) }} label="name" />
          <TextInput mode='outlined' value={age} onChangeText={(val) => { setAge(val) }} label="age" />
          <Button icon="plus" mode="contained" loading={false} onPress={() => addItem()}>
            ADD ITEM
          </Button>
        </View>
          <Button icon="plus" mode="contained" loading={false} onPress={() =>{}}>
           {count}
          </Button>
          <Button icon="plus" mode="contained" loading={false} onPress={() => dispatch(increment())}>
            ADD 
          </Button>
          <Button icon="plus" mode="contained" loading={false} onPress={() => dispatch(decrement())}>
           remove
          </Button>
      </View>
      <ScrollView style={{ padding: 10, flex: 1 }}
      >
        {
          empState ?
            empState.map((elem, index) => {
              return (
                <Animatable.View animation="zoomInUp" delay={index * 300} key={index} style={{ backgroundColor: theme.colors.primary, padding: 10, borderRadius: 10, alignItems: 'center', gap: 5, marginBottom: 10 }}>
                  <Text style={{ color: 'white', fontSize: 20, textTransform: 'capitalize' }}>
                    name :- {elem._data.name}
                  </Text>
                  <Text style={{ color: 'white' }}>
                    age :- {elem._data.age} Years
                  </Text>
                  {/* <Text style={{ color: 'white' }}>
                    ID: {elem._ref._documentPath._parts[1]}
                  </Text> */}
                  <View style={{ flexDirection: 'row', gap: 20, paddingTop: 20 }} >
                    <Button icon="pencil" mode="contained-tonal" onPress={() => {
                      setIsModal(true)
                      setUpdatingid(elem._ref._documentPath._parts[1])
                      setUpdateName(elem._data.name)
                      setUpdateAge(elem._data.age)
                    }}>
                      Update
                    </Button>
                    <Button icon="close" mode="contained-tonal" onPress={() => deleteItem(elem._ref._documentPath._parts[1])}>
                      Delete
                    </Button>
                  </View>
                </Animatable.View>
              )
            })
            : <ActivityIndicator animatin={true} color={'purple'} size="large"/>
        }
      </ScrollView>
      <Portal>


        <Modal visible={isMOdal} style={{ backgroundColor: 'rgba(0,0,0,.5)' }} onDismiss={() => { setIsModal(false) }} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10 }}>
          <View style={{ gap: 10 }} >
            <TextInput mode='outlined' value={updateName} onChangeText={(val) => { setUpdateName(val) }} label="name" />
            <TextInput mode='outlined' value={updateAge} onChangeText={(val) => { setUpdateAge(val) }} label="age" />
            <Button icon="pencil" mode="contained-tonal" loading={false} onPress={() => updateitem()}>
              Update Item
            </Button>
          </View>
        </Modal>

      </Portal>
      <Portal>


        <Modal visible={isLogMOdal} style={{ backgroundColor: 'rgba(0,0,0,.5)' }} onDismiss={() => { setIsLogModal(false) }} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10 }}>
          <View style={{ gap: 10 }} >
            <TextInput mode='outlined' value={logEmail} onChangeText={(val) => { setLogEmail(val) }} label="email" />
            <TextInput mode='outlined' value={logPass} onChangeText={(val) => { setLogPass(val) }} label="Password" />
            <Button icon="user" loading={loginLoader} mode="contained" onPress={() => { loginUser() }}>
              Login
            </Button>
            <Button icon="user" style={{ marginTop: 20 }} mode="outlined" loading={false} onPress={() => {
              setIsLogModal(false)
              setIsrejMOdal(true)
            }}>
              Register
            </Button>
          </View>
        </Modal>

      </Portal>

      <Portal>


        <Modal visible={isrejMOdal} style={{ backgroundColor: 'rgba(0,0,0,.5)' }} onDismiss={() => { setIsrejMOdal(false) }} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10 }}>
          <View style={{ gap: 10 }} >
            <TextInput mode='outlined' value={regEmail} onChangeText={(val) => { setRegEmail(val) }} label="email" />
            <TextInput mode='outlined' value={regPass} onChangeText={(val) => { setRegPass(val) }} label="Password" />
            <Button icon="user" mode="contained" loading={registerLoader} onPress={() => { registerUser() }}>
              Register
            </Button>
            <Button icon="user" style={{ marginTop: 20 }} mode="outlined" loading={false} onPress={() => {
              setIsrejMOdal(false)
              setIsLogModal(true)
            }}>
              Login
            </Button>

          </View>
        </Modal>

      </Portal>


    </View>
  )
}