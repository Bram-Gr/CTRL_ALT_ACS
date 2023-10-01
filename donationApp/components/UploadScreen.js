import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

export default function UploadScreen() {

    const [greeting, setGreeting] = useState("Morning");
    const [hour, setHour] = useState(null);

    useEffect(() => {
        let time = getCurrentTime();
        let greeting = "";
        setHour(time);

        if (hour >= "22" && hour <= "06") {
            greeting = "Night";
        } else if (hour >= "06" && hour <= "12") {
            greeting = "Morning";
        } else if (hour >= "12" && hour <= "18") {
            greeting = "Afternoon";
        } else if (hour >= "18" && hour <= "22") {
            greeting = "Evening";
        } else {
            greeting = "Day";
        }

        setGreeting(greeting);
    }, []);

    const getCurrentTime = () => {
        let today = new Date();
        let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
        return hours;
    }

    return (
      <View style={styles.container}>
        <View style={{position: "absolute", top: 100, left: -175}}>
            <Text style={styles.greetingText}>Good {greeting},</Text>
        </View>
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

    greetingText: {
        fontFamily: "Roboto",
        fontSize: 20,
        color: "#314D89"
    },

    logo: {
      width: 176,
      height: 136,
      position: 'absolute',
      top: 150
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
        width: 292
    },

    buttonText: {
        fontFamily: "Roboto Slab",
        fontSize: 20,
        fontWeight: "400",
        fontStyle: "normal",
        lineHeight: 20,
        color: "#FFFFFF",
        textAlign: "center"
    },

    accountText: {
        color: "#314D89",
        textAlign: "center",
        fontFamily: "Roboto",
        fontSize: 16,
        fontWeight: 400,
        top: 325
      },
  
    loginText: {
        color: "black",
        fontWeight: "bold",
        top: 3
    }
    
  });