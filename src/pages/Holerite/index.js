import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import React, { Component, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, Text, View, Linking, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import logoImg from '../../../assets/icon.png';
import { TextInputMask } from 'react-native-masked-text';
import { NavigationContainer, useNavigation } from '@react-navigation/native';



  export default class Holerite extends Component { 

     constructor(props) {
       super(props);
       this.state = {
        CPF: "",
        drive1: null,
        drive2: null,
        drive3: null,
        drive4: null,
        drive5: null,
        drive6: null,
        };
     }

    atualizaLista = async () => { 
      await AsyncStorage.clear();
      var resultado = 0;
      let valores = [
          [
            "cpf",
            this.state.CPF
          ]
        ]
        console.log(this.state.CPF)
      try {
        await axios.post('http://whispering-gorge-97868.herokuapp.com/api/holerite', {valores})
        .then(function (response) {
          resultado = JSON.stringify(response.data)
        })
      } catch(e) {
        console.log(e)
      }
      await axios.post('http://whispering-gorge-97868.herokuapp.com/api/confirmacao', {valores})

      const url1 = resultado.substr(15,  76)
      if(url1 == "") {
        this.setState({drive1:null})
      } else {
        this.setState({drive1:url1})
      }
      console.log(this.state.drive1)

      const url2 = resultado.substr(108,  76)
      if(url2 == "") {
        this.setState({drive2:null})
      } else {
        this.setState({drive2:url2})
      }

      const url3 = resultado.substr(201,  76)
      if(url3 == "") {
        this.setState({drive3:null})
      } else {
        this.setState({drive3:url3})
      }

      const url4 = resultado.substr(294,  76)
      if(url4 == "") {
        this.setState({drive4:null})
      } else {
        this.setState({drive4:url4})
      }

      const url5 = resultado.substr(387,  76)
      if(url5 == "") {
        this.setState({drive5:null})
      } else {
        this.setState({drive5:url5})
      }

      const url6 = resultado.substr(480,  76)
      if(url6 == "") {
        this.setState({drive6:null})
      } else {
        this.setState({drive6:url6})
      }
      //this.setState({drive:resultado})
    }

    linkaDrive6 = async () => {
      // const total = this.state.drive
      // const url = total.substr(15,  76)
      // console.log(url)
      try {
        await Linking.openURL(this.state.drive6)
      } catch(e) {
        console.log(e)
      }
      
    }

    linkaDrive5 = async () => {
      // const total = this.state.drive
      // const url = total.substr(108,  76)
      // console.log(url)
      try {
        await Linking.openURL(this.state.drive5)
      } catch(e) {
        console.log(e)
      }
      
    }

    linkaDrive4 = async () => {
      // const total = this.state.drive
      // const url = total.substr(201,  76)
      // console.log(url)
      try {
        await Linking.openURL(this.state.drive4)
      } catch(e) {
        console.log(e)
      }
      
    }

    linkaDrive3 = async () => {
      // const total = this.state.drive
      // const url = total.substr(294,  76)
      // console.log(url)
      try {
        await Linking.openURL(this.state.drive3)
      } catch(e) {
        console.log(e)
      }
      
    }

    linkaDrive2 = async () => {
      // const total = this.state.drive
      // const url = total.substr(387,  76)
      // console.log(url)
      try {
        await Linking.openURL(this.state.drive2)
      } catch(e) {
        console.log(e)
      }
      
    }

    linkaDrive1 = async () => {
      // const total = this.state.drive
      // const url = total.substr(480,  76)
      // console.log(url)
      try {
        await Linking.openURL(this.state.drive1)
      } catch(e) {
        console.log(e)
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

      <Text
        style={styles.title}>Consulte seu holerite aqui!
      </Text>
      <StatusBar style="auto" />

      <Text
        style={styles.sub}>Insira o número do seu CPF:
      </Text>

      <TextInputMask 
        type={'cpf'}
        value={this.state.CPF}
        keyboardType = 'numeric'
        style = {styles.input}
        placeholder = 'Exemplo: 123.456.789-10'
        onChangeText = {texto => this.setState({CPF : texto})}
      />

      <TouchableOpacity 
          style = {styles.button}
          onPress = { this.atualizaLista }>
        <Text style = {styles.buttonText}>Consultar</Text>
      </TouchableOpacity>

      {this.state.drive6 && <TouchableOpacity 
          style = {styles.button}
          onPress = { this.linkaDrive6 }
          >
        <Text style = {styles.buttonText}>1</Text>
      </TouchableOpacity>}

      {this.state.drive5 && <TouchableOpacity 
          style = {styles.button}
          onPress = { this.linkaDrive5 }
          >
        <Text style = {styles.buttonText}>2</Text>
      </TouchableOpacity>}

      {this.state.drive4 && <TouchableOpacity 
          style = {styles.button}
          onPress = { this.linkaDrive4 }
          >
        <Text style = {styles.buttonText}>3</Text>
      </TouchableOpacity>}

      {this.state.drive3 && <TouchableOpacity 
          style = {styles.button}
          onPress = { this.linkaDrive3 }
          >
        <Text style = {styles.buttonText}>4</Text>
      </TouchableOpacity>}

      {this.state.drive2 && <TouchableOpacity 
          style = {styles.button}
          onPress = { this.linkaDrive2 }
          >
        <Text style = {styles.buttonText}>5</Text>
      </TouchableOpacity>}

      {this.state.drive1 && <TouchableOpacity 
          style = {styles.button}
          onPress = { this.linkaDrive1 }
          >
        <Text style = {styles.buttonText}>6</Text>
      </TouchableOpacity>}
    </ScrollView>
  );
  }
}


const styles = StyleSheet.create({

  seta: {
    marginTop: 40,
    paddingBottom: 20
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
