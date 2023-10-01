import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Import the functions you need from the SDKs you need

import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import UploadScreen from './components/UploadScreen';
import CameraScreen from './components/Camera';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Stack = createStackNavigator();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import SignUpScreen from './components/SignUpScreen';
import ApprovedScreen from './components/ApprovedScreen';
import LoadingScreen from './components/LoadingScreen';
import MapScreen from './components/MapScreen';
import DeniedScreen from './components/DeniedScreen';

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

export default function App() {
  
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="HomeScreen">
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen}
        />
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
        />
        <Stack.Screen
          name="UploadScreen"
          component={UploadScreen}
        />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
        />
        <Stack.Screen
          name="ApprovedScreen"
          component={ApprovedScreen}
        />
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
        />
        <Stack.Screen
          name="DeniedScreen"
          component={DeniedScreen}
        />
      </Stack.Navigator>
      <StatusBar style="dark" />
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
