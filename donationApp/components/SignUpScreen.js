import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Logo from "../assets/images/logo.png";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import UploadScreen from "./UploadScreen";

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userData = {
          username: "Nadia", // Assuming you have displayName
          password: user.email, // This should not be sent like this
        };
        sendUserData(userData);
      } else {
        console.log("User is not signed in");
      }
    });

    return () => unsubscribe();
  }, []);

  const sendUserData = async (userData) => {
    try {
      const response = await axios.post('http://10.200.0.100:8000/user', userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Data sent successfully: ", response.data);
    } catch (error) {
      console.error("Error Sending data:", error);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, username, password);
      Alert.alert('User signed up successfully!');
      navigation.navigate(UploadScreen);
    } catch (error) {
      Alert.alert('Error signing up:', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, username, password);
      Alert.alert('Logged in successfully!');
      // Navigate to your home screen or dashboard here
      navigation.navigate(UploadScreen);
    } catch (error) {
      Alert.alert('Error logging in:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <View style={{ width: 360 }}>
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          placeholderTextColor="#000000"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={[styles.inputField, { top: 23 }]}
          placeholder="Password"
          placeholderTextColor="#000000"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      {/* Add other UI elements as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 176,
    height: 136,
    position: "absolute",
    top: 100,
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
    width: 292,
    marginVertical: 15
  },

  buttonText: {
    fontFamily: "Roboto Slab",
    fontSize: 20,
    fontStyle: "normal",
    lineHeight: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },

  accountText: {
    color: "#314D89",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    top: 325,
  },

  loginText: {
    color: "black",
    // fontWeight: "bold",
    top: 3,
  },
});

