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


export default function Donation() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>

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

  cardContainer: {
    width: 375, 
    height: 147, 
    borderRadius: 20, 
    backgroundColor: "#F5F5F5",
    top: 100
  }

  
});
