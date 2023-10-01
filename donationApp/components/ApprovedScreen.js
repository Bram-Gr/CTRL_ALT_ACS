import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Modal, TouchableOpacity } from 'react-native';
import Approved from '../assets/images/approved.png';
import CloseBttn from '../assets/images/closeBttn.png';
import LocationBttn from '../assets/images/locationBttn.png';


import { useNavigation } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';


export default function ApprovedScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [location, setLocation] = useState('');
    const [value, setValue] = useState(null);

    const [open, setOpen] = useState(false);
    const [distance, setDistance] = useState(null);
    const [items, setItems] = useState([
        {label: '5m', value: '5m'},
        {label: '10m', value: '10m'},
        {label: '20m', value: '20m'},
        {label: '30m+', value: '30m+'}
    ]);


    const navigation = useNavigation();
  
    // const handleLogin = () => {
    //   // Implement your login logic here
    //   console.log('Username:', username);
    //   console.log('Password:', password);
    // };

    // Function to fetch the user's location
    const fetchLocation = () => {
        //fetch location here
        return 0
    };

    return (
      <View style={styles.container}>
        <Image style={styles.approved} source={Approved}/>
        <View style={{ top: 10, position: "relative" }}>
            <Text style={styles.titleText}>
                Submission Approved!
            </Text>
            <Text style={styles.bodyText}>
                Your donation submission has been approved! Please proceed to drop-off your donation at our nearest store
            </Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={() => setModalVisible(true)}>Next</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(false);
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.modal} >
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Image style={styles.closeBttn} source={CloseBttn}/>
                        </TouchableOpacity>
                        <View style={styles.modalBody}>
                            <Text style={styles.modalTitle}>Nearest Location</Text>
                            <View style={styles.locationContainer}>
                                <TextInput
                                    style={[styles.inputField, {marginLeft: '20px'}]}
                                    placeholder="Search by City, State, and Zip code"
                                    value={location}
                                    onChangeText={setLocation}
                                />
                                <TouchableOpacity xonPress={() => setModalVisible(false)}>
                                    <Image style={[styles.locationBttn, {left: -33, bottom: -11}]} source={LocationBttn}/>
                                </TouchableOpacity>
                            </View>
                            
                            {/* <TextInput
                                style={[styles.inputField, {left: -33}]}
                                placeholder="5 Miles"
                                value={distance}
                                onChangeText={setDistance}
                            /> */}
                            <View style={{width: '292px', zIndex: 100, borderWidth: 0, top: 60}}>
                                <DropDownPicker
                                    containerStyle={{
                                        border: 'none'
                                    }}
                                    textStyle={{
                                        fontFamily: "Roboto", fontSize: 16
                                    }}
                                    placeholder="Select a distance"
                                    open={open}
                                    value={value}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setItems}
                                />
                            </View>
                            <TouchableOpacity style={[styles.button, {left: 0, top: 100}]} onPress={() => navigation.navigate('MapScreen')}>
                                <Text style={styles.buttonText}>Find Location</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            </Modal>
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

    modal: {
        backgroundColor: 'white', 
        height: '40%', 
        width: '90%',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,         // Border width (1 pixel)
        borderColor: '#ddd', 
    },

    modalBody: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalTitle: {
        textAlign: "center",
        padding: "2rem",
        fontSize: 24,
        fontWeight: "400",
        fontStyle: "normal",
        textAlign: "center",
        color: "#314D89",
        lineHeight: 30,
    },


    bodyText: {
        width: 322,
        fontFamily: "Roboto",
        fontSize: 18,
        fontWeight: "400",
        fontStyle: "normal",
        textAlign: "center",
        color: "#314D89",
        lineHeight: 30,
        paddingBottom: 40
    },


    titleText: {
        width: 322,
        fontFamily: "Roboto",
        fontSize: 24,
        fontWeight: "400",
        fontStyle: "normal",
        textAlign: "center",
        color: "#314D89",
        lineHeight: 30,
    },

    closeBttn: {
      width: 15,
      height: 15,
    },

    locationContainer: {
        flexDirection: 'row',
        top: 30
    },

    locationBttn: {
      width: 25,
      height: 25
    },

    approved: {
      width: 176,
      height: 164,
      position: 'absolute',
      top: 160
    },

    inputField: {
      width: 292,
      height: 45,
      borderRadius: 3,
      backgroundColor: "#F5F5F5",
      fontFamily: "Roboto",
      paddingLeft: 10,
      fontSize: 14,
      marginBottom: '1rem'
    },

    button: {
        backgroundColor: "#314D89",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 12,
        top: 18,
        width: 292,
        left: 20
    },

    buttonText: {
        fontFamily: "Roboto Slab",
        fontSize: 20,
        fontWeight: "bold",
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