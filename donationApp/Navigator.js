import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from  '@react-navigation/stack';
import Login from  './Login'
import App from './App'

const Stack = createStackNavigator();

function MyStack() {
    return (
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen name= "App" component={App} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }

  export default function AppNavigator() {
    return (
      <NavigationContainer>
        <App />
        <MyStack />
      </NavigationContainer>
    );
  }