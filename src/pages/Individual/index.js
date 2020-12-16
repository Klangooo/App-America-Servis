import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import React, { Component, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, Text, ScrollView, Image, TextInput, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import logoImg from '../../../assets/icon.png';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const api = axios.create({
  baseURL: 'https://webhook.site/d63f9711-bfce-4593-acf0-796927887dcb'
})

export default class Inicio extends Component {
  
 

     constructor(props) {
       super(props);
       this.state = {
        CPF: "0",
        showButton1: true,
        showButton2: false,
        showButton3: false,
        showButton4: false,
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
        await AsyncStorage.setItem("@CPF_input", this.state.CPF);
        await AsyncStorage.setItem("@latitude_string_iniciar", this.state.where.lat.toString());
        await AsyncStorage.setItem("@longitude_string_iniciar", this.state.where.lng.toString());
        await AsyncStorage.setItem("@timeStamp_string_iniciar", this.state.where.ts.toString());
        Keyboard.dismiss();
        Alert.alert("Sucesso!", "A sua entrada foi salva com sucesso!");
        this.setState({showButton1: false});
        this.setState({showButton2: true})
  
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
      await AsyncStorage.setItem("@CPF_input", this.state.CPF)
      await AsyncStorage.setItem("@latitude_string_almoco", this.state.where.lat.toString());
      await AsyncStorage.setItem("@longitude_string_almoco", this.state.where.lng.toString());
      await AsyncStorage.setItem("@timeStamp_string_almoco", this.state.where.ts.toString());
      Keyboard.dismiss();
      Alert.alert("Sucesso!", "A sua entrada para o almoço foi salva com sucesso!");
      this.setState({showButton2: false});
      this.setState({showButton3: true})

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
      await AsyncStorage.setItem("@CPF_input", this.state.CPF)
      await AsyncStorage.setItem("@latitude_string_retorno", this.state.where.lat.toString());
      await AsyncStorage.setItem("@longitude_string_retorno", this.state.where.lng.toString());
      await AsyncStorage.setItem("@timeStamp_string_retorno", this.state.where.ts.toString());
      Keyboard.dismiss();
      Alert.alert("Sucesso!", "O seu retorno foi salvo com sucesso!");
      this.setState({showButton3: false});
      this.setState({showButton4: true})

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
      await AsyncStorage.setItem("@CPF_input", this.state.CPF)
      await AsyncStorage.setItem("@latitude_string_fim", this.state.where.lat.toString());
      await AsyncStorage.setItem("@longitude_string_fim", this.state.where.lng.toString());
      await AsyncStorage.setItem("@timeStamp_string_fim", this.state.where.ts.toString());
      Keyboard.dismiss();
      this.setState({showButton4: false});
      
      this.createPonto();
    } catch (e) {
      Alert.alert("Erro ao salvar", "")
    }

  } 

  createPonto = async () => {
    const CPF_input = await AsyncStorage.getItem("@CPF_input")

    const latitude_string_iniciar = await AsyncStorage.getItem("@latitude_string_iniciar")
    const longitude_string_iniciar = await AsyncStorage.getItem("@longitude_string_iniciar")
    const timeStamp_string_iniciar = await AsyncStorage.getItem("@timeStamp_string_iniciar")

    const latitude_string_almoco = await AsyncStorage.getItem("@latitude_string_almoco")
    const longitude_string_almoco = await AsyncStorage.getItem("@longitude_string_almoco")
    const timeStamp_string_almoco = await AsyncStorage.getItem("@timeStamp_string_almoco")

    const latitude_string_retorno = await AsyncStorage.getItem("@latitude_string_retorno")
    const longitude_string_retorno = await AsyncStorage.getItem("@longitude_string_retorno")
    const timeStamp_string_retorno = await AsyncStorage.getItem("@timeStamp_string_retorno")

    const latitude_string_fim = await AsyncStorage.getItem("@latitude_string_fim")
    const longitude_string_fim = await AsyncStorage.getItem("@longitude_string_fim")
    const timeStamp_string_fim = await AsyncStorage.getItem("@timeStamp_string_fim")

    try{
    let resposta = await api.post('/', { CPF: CPF_input, latitude_iniciar: latitude_string_iniciar, longitude_iniciar: longitude_string_iniciar, hora_iniciar: timeStamp_string_iniciar, latitude_almoco: latitude_string_almoco, longitude_almoco: longitude_string_almoco, hora_almoco: timeStamp_string_almoco, latitude_retorno: latitude_string_retorno, longitude_retorno: longitude_string_retorno, hora_retorno: timeStamp_string_retorno, latitude_fim: latitude_string_fim, longitude_fim: longitude_string_fim, hora_fim: timeStamp_string_fim })
    console.log(resposta)
    Alert.alert("Sucesso!", "O seu expediente foi registrado e enviado!");
    this.setState({showButton1: true});

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
        style={styles.sub}>Insira o seu CPF:
      </Text>

      <TextInput 
        keyboardType = 'numeric'
        style = {styles.input}
        placeholder = 'ex: 12345678910'
        onChangeText = {(texto) => this.setState({CPF : texto})} 
      
      />

{this.state.showButton1 && this.state.ready &&<TouchableOpacity 
          style = {styles.button}
          onPress = { this.gravarIniciar }>
        <Text style = {styles.buttonText}>Entrada</Text>
</TouchableOpacity>}

    {this.state.showButton2 && <TouchableOpacity 
          style = {styles.button}
          onPress = { this.gravarAlmoco }>
        <Text style = {styles.buttonText}>Almoço</Text>
      </TouchableOpacity>}

     {this.state.showButton3 && <TouchableOpacity 
          style = {styles.button}
          onPress = { this.gravarAlmocoFim }>
        <Text style = {styles.buttonText}>Retorno do almoço</Text>
      </TouchableOpacity>}

     {this.state.showButton4 && <TouchableOpacity 
          style = {styles.button}
          onPress = { this.gravarFim }>
        <Text style = {styles.buttonText}>Finalizar expediente</Text>
      </TouchableOpacity>}

    
    </ScrollView>
  );
  }
}

const styles = StyleSheet.create({

  seta: {
    //width: 100,
    //marginBottom: 10 ,
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
    //alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  sub: {
    fontSize: 18,
    color: '#0e72Be',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  
  logo: {
    width: 80,
    height: 80,
    marginLeft: '35%',
    //marginTop: -80,
    marginBottom: 10, 
    //Align: 'center'
  },

  container: {
    flex: 1,
    backgroundColor: '#E5E6E8',
    
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  input: { //Caixa do Formulário
    margin: 10,
    width: 200,
    padding: 8,
    borderColor: '#082d95',
    borderWidth: 1.5,
    borderRadius: 3,
    marginLeft: '19%'
  },
});