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
import { useEffect, useState } from "react";
import Arrow from '../assets/images/chevron-right.svg';


export default function Donation() {
  const [imageUrl, setImageUrl] = useState();
  const [donationCenter, setDonationCenter] = useState();
  const [deliveryDate, setDeliveryDate] = useState();
  const ifImage = true;
  const navigation = useNavigation();

  const monthMap = {
    '1' : 'January',
    '2' : 'February',
    '3' : 'March',
    '4' : 'April',
    '5' : 'May',
    '6' : 'June',
    '7' : 'July',
    '8' : 'August',
    '9' : 'September',
    '10' : 'October',
    '11' : 'November',
    '12' : 'December'
  }

  useEffect(() => {
    if (deliveryDate) {
        setDeliveryDate(deliveryDate);
    } else {
        let today = getCurrentDate();
        setDeliveryDate(today);
    }
  })

  const getCurrentDate = () => {
    let today = new Date();
    let month = today.getMonth();
    let day = today.getDay();
    let year = today.getFullYear();
    return monthMap[month] + ' ' + day + ', ' + year;
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image style={{borderWidth: 2, width: 115, height: 115, top: 15, left: 20}} source={{uri: (ifImage ? imageUrl : "https://placehold.co/100")}}/>
        <Text style={styles.cardText}>Woman On A Mission Outreach Center</Text>
        <Text style={styles.cardDate}>Expected Delivery:</Text>
        <Text style={[styles.cardDate, {top: 90}]}>{deliveryDate}</Text>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Approved</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, {top: -25, left: 255}]}><Text style={styles.buttonText}>Scheduled</Text></TouchableOpacity>
        <TouchableOpacity><Arrow style={{top: -115, left: 340}}/></TouchableOpacity>
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
    height: 175, 
    borderRadius: 20, 
    backgroundColor: "#F5F5F5",
    top: 100
  },

  cardText: {
    position: "absolute",
    top: 15,
    left: 160,
    width: 206,
    fontFamily: "Roboto",
    color: "#314D89",
    fontSize: 20,
  },

  cardDate: {
    position: "absolute",
    top: 70,
    left: 160,
    width: 206,
    fontFamily: "Roboto",
  },

  button: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 10,
    top: 10,
    left: 140,
    width: 110,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
},

  buttonText: {
    fontFamily: "Roboto Slab",
    fontSize: 16,
    // fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    color: "black",
    textAlign: "center"
},

  
});
