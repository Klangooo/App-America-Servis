import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, Text, View, Image, TextInput, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import logoImg from './assets/icon.png';

  export default class Inicio extends Component {

     constructor(props) {
       super(props);
       this.state = { CPF: "0" };
     }

  gravarCPF = async () => {
    try{
      await AsyncStorage.setItem("@CPF_input", this.state.CPF)
      Keyboard.dismiss();
      Alert.alert("BOA", "Salvo com sucesso");

    } catch (e) {
      alert(e);
    }

  } 
  
/*   printaCPF = async () => {
    try{
      const printar = await AsyncStorage.getItem("@CPF_input")

      if(printar !== null && printar.length == 11) {
      Alert.alert("BOA", printar);
      }

    } catch (e) {
      Alert.alert("Putz", "Deu ruim")
    }

  } */

  render() {
  return (

    <View style={styles.container}>
      
      <Image 
       source={logoImg}
       style={styles.logo}
      />

      <Text
        style={styles.title}>Bem-vindo!
      </Text>
      <StatusBar style="auto" />

      <Text
        style={styles.sub}>Insira o seu CPF:
      </Text>

      <TextInput 
        keyboardType = 'numeric'
        style = {styles.input}
        placeholder = 'ex: 12345678910'
        onChangeText = {(texto) => this.setState({CPF : texto})} 
      
      />

      <TouchableOpacity 
          style = {styles.button}
          onPress = { this.gravarCPF }>
        <Text style = {styles.buttonText}>Bater Ponto</Text>
      </TouchableOpacity>

{/*       <TouchableOpacity 
          style = {styles.button}
          onPress = { this.printaCPF }>
        <Text style = {styles.buttonText}>Print</Text>
      </TouchableOpacity> */}
    
    </View>
  );
  }
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
    width: 1 },
    marginTop: 20
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
    marginBottom: 100,
    marginTop: 0,
    color: '#032066',
    alignItems: 'center',
    fontWeight: 'bold'
  },

  sub: {
    fontSize: 18,
    color: '#0e72Be',
    fontWeight: 'bold',
  },
  
  logo: {
    width: 80,
    height: 80,
    marginTop: -80,
    marginBottom: 10 
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
