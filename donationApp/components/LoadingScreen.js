import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoadingImage from "../assets/images/ferris-wheel-spinner.gif";
import { useEffect } from "react";
import ApprovedScreen from "./ApprovedScreen";


export default function LoadingScreen() {
  const navigation = useNavigation();

  useEffect (() => {
    setTimeout(() => navigation.navigate(ApprovedScreen), 6000);
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", top: 108 }}>
        <Text style={styles.welcomeText}>Just a Sec...</Text>
        {/* <Image style={{borderWidth: 2, zIndex: 2}} width={500} height={500} source={{uri: "../assets/images/ferris-wheel-spinner.gif"}}/> */}
        {/* <LoadingImage/> */}
      </View>
      <View style={{ top: 215, position: "relative" }}>
        <Text style={styles.joinText}>
          Our AI Assistant, Stewart, is validating your photo!
        </Text>
      </View>
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
