import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import React, { Component, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, Text, ScrollView, Image, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import logoImg from '../../../assets/icon.png';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const api = axios.create({
  baseURL: 'https://webhook.site/4905b00e-3052-4335-bdae-8f7486bfebb3'
})

export default class Inicio extends Component {
  
 

     constructor(props) {
       super(props);
       this.state = {
        CPF: "0",
        showButton: true,
        ready: false,
        where: {lat:null, lng:null, ts:null},
        error: null,
        };
     }

    componentDidMount () {
      let geoOptions = {
        enableHighAccuaracy: true,
        timeOut: 20000,
        maximumAge: 60*60
      }
      this.setState({ready:false, error: null});
      navigator.geolocation.getCurrentPosition( this.geoSuccess, this.geoFailure, geoOptions);
    }

    geoSuccess = (position) => {
      console.log(position);
      this.setState({
        ready:true,
        where: { lat: position.coords.latitude,lng:position.coords.longitude,ts: position.timestamp }
      })
    }

    geoFailure = (err) => {
      this.setState({error: err.message});
    }

    gravarIniciar = async () => {
      let geoOptions = {
        enableHighAccuaracy: true,
        timeOut: 20000,
        maximumAge: 60*60
      }
      this.setState({ready:false, error: null});
      navigator.geolocation.getCurrentPosition( this.geoSuccess, this.geoFailure, geoOptions);

      try{
        await AsyncStorage.setItem(`@${this.state.CPF}_latitude_string_iniciar`, this.state.where.lat.toString());
        await AsyncStorage.setItem(`@${this.state.CPF}_longitude_string_iniciar`, this.state.where.lng.toString());
        await AsyncStorage.setItem(`@${this.state.CPF}_timeStamp_string_iniciar`, this.state.where.ts.toString());
        Keyboard.dismiss();
        Alert.alert("Sucesso!", "A sua entrada foi salva com sucesso!");
        
      } catch (e) {
      Alert.alert("Erro ao salvar", "")
      }
  
    } 

  gravarAlmoco = async () => {
    let geoOptions = {
      enableHighAccuaracy: true,
      timeOut: 20000,
      maximumAge: 60*60
    }
    this.setState({ready:false, error: null});
    navigator.geolocation.getCurrentPosition( this.geoSuccess, this.geoFailure, geoOptions);

    try{
      await AsyncStorage.setItem(`@${this.state.CPF}_latitude_string_almoco`, this.state.where.lat.toString());
      await AsyncStorage.setItem(`@${this.state.CPF}_longitude_string_almoco`, this.state.where.lng.toString());
      await AsyncStorage.setItem(`@${this.state.CPF}_timeStamp_string_almoco`, this.state.where.ts.toString());
      Keyboard.dismiss();
      Alert.alert("Sucesso!", "A sua entrada para o almoço foi salva com sucesso!");

    } catch (e) {
    Alert.alert("Erro ao salvar", "")
    }

  } 

  gravarAlmocoFim = async () => {
    let geoOptions = {
      enableHighAccuaracy: true,
      timeOut: 20000,
      maximumAge: 60*60
    }
    this.setState({ready:false, error: null});
    navigator.geolocation.getCurrentPosition( this.geoSuccess, this.geoFailure, geoOptions);

    try{
      await AsyncStorage.setItem(`@${this.state.CPF}_latitude_string_retorno`, this.state.where.lat.toString());
      await AsyncStorage.setItem(`@${this.state.CPF}_longitude_string_retorno`, this.state.where.lng.toString());
      await AsyncStorage.setItem(`@${this.state.CPF}_timeStamp_string_retorno`, this.state.where.ts.toString());
      Keyboard.dismiss();
      Alert.alert("Sucesso!", "O seu retorno foi salvo com sucesso!");

    } catch (e) {
    Alert.alert("Erro ao salvar", "")
    }

  } 

  gravarFim = async () => {
    let geoOptions = {
      enableHighAccuaracy: true,
      timeOut: 20000,
      maximumAge: 60*60
    }
    this.setState({ready:false, error: null});
    navigator.geolocation.getCurrentPosition( this.geoSuccess, this.geoFailure, geoOptions);
    
    try{
      await AsyncStorage.setItem(`@${this.state.CPF}_latitude_string_fim`, this.state.where.lat.toString());
      await AsyncStorage.setItem(`@${this.state.CPF}_longitude_string_fim`, this.state.where.lng.toString());
      await AsyncStorage.setItem(`@${this.state.CPF}_timeStamp_string_fim`, this.state.where.ts.toString());
      Keyboard.dismiss();
      this.createPonto();
    } catch (e) {
      Alert.alert("Erro ao salvar", "")
    }

  } 

  createPonto = async () => {
    this.setState({showButton: false});
    let keys
    keys = await AsyncStorage.getAllKeys()
    dados = await AsyncStorage.multiGet(keys)
    try{
    let resposta = await api.post('/', { valores: dados })
    Alert.alert("Sucesso!", "O seu expediente foi registrado e enviado!");
    this.setState({showButton: true});

    await AsyncStorage.clear()

    } catch (e) {
    Alert.alert("Erro ao salvar", "Verifique sua conexão com a internet e tente novamente!", [{ text: "Tentar Novamente", onPress: () => this.createPonto() }])
    }
  }

    render() {
      const { goBack } = this.props.navigation;  
    
  return (
    

    <ScrollView style={styles.container}>

    <TouchableOpacity 
          style = {styles.seta}
          onPress = {()=> goBack()}>
        <Feather name="chevron-left" size={38} color="#0e72Be" />
      </TouchableOpacity>

      <Image 
       source={logoImg}
       style={styles.logo}
      />
      {this.state.error && (
      <Text
        style={styles.title}>Habilite a localizacao
      </Text>
      )}

      <Text
        style={styles.title}>Bem-vindo!
      </Text>
      <StatusBar style="auto" />

      <Text
        style={styles.sub}>Insira o número do seu CPF:
      </Text>

      <TextInput 
        keyboardType = 'numeric'
        style = {styles.input}
        placeholder = 'Exemplo: 12345678910'
        onChangeText = {(texto) => this.setState({CPF : texto})} 
      
      />

{this.state.showButton && this.state.ready &&<TouchableOpacity 
          style = {styles.button}
          onPress = { this.gravarIniciar }>
        <Text style = {styles.buttonText}>Entrada</Text>
</TouchableOpacity>}

    {this.state.showButton && this.state.ready && <TouchableOpacity 
          style = {styles.button}
          onPress = { this.gravarAlmoco }>
        <Text style = {styles.buttonText}>Almoço</Text>
      </TouchableOpacity>}

     {this.state.showButton && this.state.ready && <TouchableOpacity 
          style = {styles.button}
          onPress = { this.gravarAlmocoFim }>
        <Text style = {styles.buttonText}>Retorno do almoço</Text>
      </TouchableOpacity>}

     {this.state.showButton && this.state.ready && <TouchableOpacity 
          style = {styles.button}
          onPress = { this.gravarFim }>
        <Text style = {styles.buttonText}>Finalizar expediente</Text>
      </TouchableOpacity>}

      {!this.state.showButton && <ActivityIndicator size="large" color="#032066" />}

    </ScrollView>
  );
  }
}

const styles = StyleSheet.create({

  seta: {
    marginTop: 40,
    paddingBottom: 20
  },
  

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
    marginTop: 20,
    width: '60%',
    alignSelf: 'center'
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
    fontWeight: 'bold',
    textAlign: 'center'
  },

  sub: {
    fontSize: 18,
    color: '#0e72Be',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: "5%",
  },
  
  logo: {
    width: 80,
    height: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  container: {
    flex: 1,
    backgroundColor: '#E5E6E8',
  },

  input: { //Caixa do Formulário
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    padding: 8,
    borderColor: '#082d95',
    borderWidth: 1.5,
    borderRadius: 3,
  },
});
