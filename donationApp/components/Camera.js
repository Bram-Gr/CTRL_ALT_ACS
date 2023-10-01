import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet ,Text, View, Button, Image, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import UploadScreen from './UploadScreen';
import axios from "axios";
import LoadingScreen from './LoadingScreen';
import DeniedScreen from './DeniedScreen';

export default function CameraScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [imageObj, setImageObj] = useState({userId: 0, description: "", image: ""});
  const [type, setType] = useState(Camera.Constants.Type.back);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

    })();

  }, [image]);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(({
            base64: true
        }));
        
        setImage(data.base64);

        let temp = await sendUserData();
    }
  }

  const sendUserData = async () => {
    try {

        let object = {
            userId: getRandomInt(0,1000),
            description: "couch",
            image: image
        }

        if (object) {

        setImageObj(object);

        console.log(imageObj);
        const response = await axios.post('http://10.200.0.100:8000/donations', imageObj, {
            headers: {
            "Content-Type": "application/json",
            },
        });
        console.log("Data sent successfully: ", response.data);

        if (response.data["true"]) {
          console.log("HERE");
          navigation.navigate(LoadingScreen);
        } else {
          navigation.navigate(DeniedScreen);
        }
      } else {
      }
    } catch (error) {
        console.error("Error Sending data:", error);
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
   <View style={{ flex: 1}}>
      <View style={styles.cameraContainer}>
            <Camera 
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={type}
            ratio={'1:1'} />
      </View>
      <TouchableOpacity
            style={[styles.button, {top: -200, left: 138}]}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.buttonText}>Flip Camera</Text>
        </TouchableOpacity>
       <TouchableOpacity 
            style={[styles.button, {top: -150, left: 140}]}
            onPress={() => takePicture()}>
        <Text style={styles.buttonText}>Take Picture</Text>
        {image && <Image source={{uri: image}} style={{flex:1}}/>}
        </TouchableOpacity><TouchableOpacity 
            style={[styles.button, {top: -50, left: 90, backgroundColor: "green", width: 250}]}
            onPress={() => navigation.navigate(UploadScreen)}>
        <Text style={styles.buttonText}>Back</Text>
        {image && <Image source={{uri: image}} style={{flex:1}}/>}
        </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#D9D9D9',
      borderBottomLeftRadius: 60,
      borderBottomRightRadius: 60
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 0.75,
  },
  button: {
    backgroundColor: "#314D89",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 12,
    top: 58,
    width: 150,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },

  buttonText: {
    fontFamily: "Roboto Slab",
    fontSize: 20,
    fontStyle: "normal",
    lineHeight: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
})