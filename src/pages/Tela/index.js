import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, Text, View, Image, TextInput, Keyboard } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import logoImg from '../../../assets/icon.png';

  export default function tela () {
    const navigation = useNavigation ();
   // const route = useRoute();

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

      <TouchableOpacity 
          style = {styles.button}
          onPress = {() => navigation.navigate('Individual') }>
        <Text style = {styles.buttonText}>Individual</Text>
      </TouchableOpacity>

      <TouchableOpacity 
          style = {styles.button}
          onPress = {() => navigation.navigate('Coletivo') }>
        <Text style = {styles.buttonText}>Coletivo</Text>
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

 
});
