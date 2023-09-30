import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import Logo from '../assets/images/logo.png'

export default function HomeScreen() {
    return (
      <View style={styles.container}>
        <Text>Welcome!</Text>
        <Image style={styles.logo} source={Logo}/>
        <Text>Join our community of givers and make a difference today!</Text>
        <Button title="Get Started"/>
        <Button title="Login"/>
        <StatusBar style="auto" />
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
      width: "281px",
      height: "217px",
    }
  });