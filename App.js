import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import logoImg from './assets/icon.png';

export default function App() {
//
    state = {
    cpf: '',
    }

  render(); {
    const UserList = ({ cpf }) => {
      if (cpf == "123.456.789-10") {
          return 1;}
      else {
        return 0;}
      }
    }
//
  return (

    <View style={styles.container}>
      
      <Image 
       source={logoImg}
       style={styles.logo}
      />

     <Text
      style={styles.title}
      >Bem-vindo!</Text>
      <StatusBar style="auto" />

//
    <TextInput
      secureTextEntry = {true}
      style={styles.input}
      onChangeText = { text => this.state.cpf = text}
      placeholder="Digite seu CPF:" />

//
    </View>

  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 30,
    marginBottom: 300,
    marginTop: 150,
    color: '#032066',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  
  logo: {
    width: 80,
    height: 80,
  },

  container: {
    flex: 1,
    backgroundColor: '#E5E6E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input:{
    marginTop: 10,
    padding: 10,
    width:300,
    backgroundColor:'#fff',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
},
});
