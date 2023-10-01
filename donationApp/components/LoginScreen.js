import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Logo from '../assets/images/logo.png';

const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up successfully!');
    } catch (error) {
      console.error('Error signing up: ', error);
    }
  };

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      // Implement your login logic here
      console.log('Username:', username);
      console.log('Password:', password);
    };

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={Logo}/>
        <View style={{width: 360}}>
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={[styles.inputField, {top: 23}]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        </View>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <Text style={{top: 80}}>Forgot Password</Text>
        <View style={{borderColor: "black", borderWidth: 1, width: 332, position: "relative", top: 300}}/>
        <Text style={styles.accountText}>Don't have an account? <TouchableOpacity><Text style={styles.loginText}>Create Account</Text></TouchableOpacity></Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    logo: {
      width: 176,
      height: 136,
      position: 'absolute',
      top: 150
    },

    inputField: {
      height: 45,
      borderRadius: 3,
      backgroundColor: "#F5F5F5",
      fontFamily: "Roboto",
      paddingLeft: 10,
      fontSize: 16,
    },

    button: {
        backgroundColor: "#314D89",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 12,
        top: 58,
        width: 292
    },

    buttonText: {
        fontFamily: "Roboto Slab",
        fontSize: 20,
        fontWeight: "400",
        fontStyle: "normal",
        lineHeight: 20,
        color: "#FFFFFF",
        textAlign: "center"
    },

    accountText: {
        color: "#314D89",
        textAlign: "center",
        fontFamily: "Roboto",
        fontSize: 16,
        fontWeight: 400,
        top: 325
      },
  
    loginText: {
        color: "black",
        fontWeight: "bold",
        top: 3
    }
    
  });
