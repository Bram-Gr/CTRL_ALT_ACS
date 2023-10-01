import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Donation from './Donation';
import { Camera, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import CameraScreen from './Camera';
import ProfilePic from '../assets/images/user.svg';

export default function UploadScreen() {

    const [greeting, setGreeting] = useState("Morning");
    const [hour, setHour] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const navigation = useNavigation();
    
    useEffect(() => {
        (async () => {
          const cameraStatus = await Camera.requestCameraPermissionsAsync();
          setHasCameraPermission(cameraStatus.status === 'granted');
    })();
    }, []);

    useEffect(() => {
        let time = getCurrentTime();
        let greeting = "";
        setHour(time);

        if (hour >= "22" || hour <= "6") {
            greeting = "Night";
        } else if (hour >= "6" && hour < "12") {
            greeting = "Morning";
        } else if (hour >= "12" && hour < "18") {
            greeting = "Afternoon";
        } else if (hour >= "18" && hour < "22") {
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

    function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
      <View style={styles.container}>
        <View style={{position: "absolute", top: 50, left: 25}}>
            <Text style={styles.greetingText}>Good {greeting},</Text>
            <Text style={styles.nameText}>Nadia!</Text>
            <View style={{width: 80, height: 80, backgroundColor: "#D9D9D9", top: -80, left: 290, borderRadius: 50}}></View>
            <ProfilePic style={{position: 'absolute', left: 305, top: 15, }}/>
            <View style={{width: 375, 
                          height: 350, 
                          borderBottomLeftRadius: 60, 
                          borderBottomRightRadius: 60, 
                          borderTopRightRadius: 25, 
                          borderTopLeftRadius: 25, 
                          backgroundColor: "#F5F5F5",
                          top: -50}}>
                <View style={{width: 280, top: 80, left: 50}}>
                  <Text style={styles.uploadText}>Check if your furniture qualifies for donation!</Text>
                </View>
                  <TouchableOpacity style={[styles.button, {top: 115, left: 40}]} onPress={() => navigation.navigate(CameraScreen)}>
                    <Text style={styles.buttonText}>Upload Photo</Text>
                  </TouchableOpacity>
                <View style={{top: 225}}>
                  <Text style={styles.donationText}>Donations</Text>
                  <Donation/>
                  <FlatList/>
                </View>
            </View>
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

    nameText: {
        fontFamily: "Roboto Slab",
        fontSize: 40,
        fontWeight: 'bold',
        color: "#314D89",
        paddingTop: 10
    },

    uploadText: {
      fontFamily: "Roboto Slab",
      fontSize: 32,
      fontWeight: "400",
      fontStyle: "normal",
      lineHeight: 40,
      textAlign: "center",
      color: "#314D89"
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

    donationText: {
      fontFamily: "Roboto Slab",
      fontSize: 24,
      fontWeight: "400",
      fontStyle: "normal",
      color: "#314D89"
    }
    
  });