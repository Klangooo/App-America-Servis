import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, TextInput } from 'react-native';


import logoImg from './assets/icon.png';

export default function App({ onPress }) {

  const [age, setAge] = useState ('12');

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

      <Text
      style={styles.sub}
      >Insira o seu CPF: </Text>
      <TextInput 
        keyboardType = 'numeric'
        style = {styles.input}
        placeholder = 'ex: 12345678910'
        onChangeText = {(val) => setAge(val)} />

      <TouchableOpacity 
          style = {styles.button}
          onPress = { onPress }>
        <Text style = {styles.buttonText}>Bater Ponto</Text>

      </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({

  button: {
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: '#0e72Be',
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {
    height: 1,
    width: 1 }
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 15,
    textAlign: 'center'
  },

  title: {
    fontSize: 25,
    marginBottom: 80,
    marginTop: 30,
    color: '#032066',
    alignItems: 'center',
    fontWeight: 'bold'
  },

  sub: {
    fontSize: 18,
    color: '#0e72Be',
    fontWeight: 'bold'
  // alignItems
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

  input: { //Caixa do Formulário
    margin: 10,
    width: 200,
    padding: 8,
    borderColor: '#082d95',
    borderWidth: 1.5,
    borderRadius: 3
  },
});
