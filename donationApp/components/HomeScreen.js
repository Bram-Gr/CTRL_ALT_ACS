import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../assets/images/logo.png";
import { useNavigation } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";


export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", top: 108 }}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Image style={styles.logo} source={Logo} />
      </View>
      <View style={{ top: 215, position: "relative" }}>
        <Text style={styles.joinText}>
          Join our community of givers and make a difference today!
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate(SignUpScreen)}>
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
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
        Already have an account?{" "}
        <TouchableOpacity onPress={()=> navigation.navigate(LoginScreen)}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </Text>
      <StatusBar style="auto" />
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
    width: 281,
    height: 217,
    top: 73,
  },

  welcomeText: {
    color: "#314D89",
    textAlign: "center",
    fontFamily: "Roboto Slab",
    fontSize: 45,
    fontStyle: "normal",
    // fontWeight: 300,
    lineHeight: 122.49 /* 55.121px */,
  },

  joinText: {
    width: 322,
    fontFamily: "Roboto",
    fontSize: 18,
    // : "400",
    fontStyle: "normal",
    textAlign: "center",
    color: "#314D89",
    lineHeight: 30,
  },

  button: {
    backgroundColor: "#314D89",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 12,
    top: 58,
  },

  buttonText: {
    fontFamily: "Roboto Slab",
    fontSize: 20,
    // : "400",
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
