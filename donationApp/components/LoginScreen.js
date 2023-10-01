import React, { useState } from "react";
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
import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase"; // Import the db you initialized
import axios from "axios";

const auth = getAuth();

auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in

    const userData = {
      username: user.username,
      password: user.email,
    };
    sendUserData(userData);
  } else {
    console.log("User is not signed in");
  }
});

const sendUserData = async (userData) => {
  try {
    const response = await axios.post('10.200.0.100:8000/user', userData, {
      headers: {
        "Content-Type": "application.json",
      },
    });
    console.log("Data sent successfully: ", response.data);
  } catch (error) {
    console.error("Error Sending data:", error);
  }
};

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    // Add any additional validation here if needed

    try {
      await createUserWithEmailAndPassword(auth, username, password);
      Alert.alert("Success", "User signed up successfully!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error signing up:", error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, username, password);
      Alert.alert("Logged in successfully!");
      // Navigate to your home screen or dashboard here
    } catch (error) {
      Alert.alert("Error logging in:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <View style={{ width: 360 }}>
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={[styles.inputField, { top: 23 }]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleLogin}>
          Login
        </Text>
        <Text style={styles.buttonText} onPress={handleSignUp}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <Text style={{ top: 80 }}>Forgot Password</Text>
      <View
        style={{
          borderColor: "black",
          borderWidth: 1,
          width: 332,
          position: "relative",
          top: 300,
        }}
      />
      <Text style={styles.accountText}>
        Don't have an account?{" "}
        <TouchableOpacity>
          <Text style={styles.loginText}>Create Account</Text>
        </TouchableOpacity>
      </Text>
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
    top: 150,
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
  },

  buttonText: {
    fontFamily: "Roboto Slab",
    fontSize: 20,
    fontWeight: "400",
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
    fontWeight: 400,
    top: 325,
  },

  loginText: {
    color: "black",
    fontWeight: "bold",
    top: 3,
  },
});
