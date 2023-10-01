import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import UploadScreen from './components/UploadScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_RB0NmhSvprCJK9OM7N0Rxew3yGX_HsQ",
  authDomain: "donation-app-2023.firebaseapp.com",
  projectId: "donation-app-2023",
  storageBucket: "donation-app-2023.appspot.com",
  messagingSenderId: "37296521358",
  appId: "1:37296521358:web:02729d90bd0386bd8549df",
  measurementId: "G-N47H1FXDWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen}
        />
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen}
        />
        <Stack.Screen
          name="UploadScreen"
          component={UploadScreen}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
