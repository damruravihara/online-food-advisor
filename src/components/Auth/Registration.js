import { View, Text, TouchableOpacity, ImageBackground, ToastAndroid, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
// import { getAuth, signInWithEmailAndPassword } from "@react-native-firebase/auth";
import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';


const Registration = () => {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [number, setNumber] = React.useState("");
    const navigation = useNavigation()

    const signin = async () => {
        if (name === "") {
            ToastAndroid.show("Enter Your Name", ToastAndroid.SHORT);
        }
        else if (email === "") {
            ToastAndroid.show("Enter Your Email", ToastAndroid.SHORT);
        }
        else if (password === "") {
            ToastAndroid.show("Enter Your Password", ToastAndroid.SHORT);
        }
        else if (number === "") {
            ToastAndroid.show("Enter Your Number", ToastAndroid.SHORT);
        }
        else {
           await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    const userId = auth().currentUser?.uid
                    database()
                        .ref('/users/' + userId)
                        .set({
                            Name: name,
                            Email: email,
                            numer: number
                        })
                        .then(() => {
                            ToastAndroid.show("User account created & signed in!", ToastAndroid.SHORT);
                        });
                })
                .catch(error => {
                    console.log(error, "----------------------------------------")
                    if (error.code === 'auth/email-already-in-use') {
                        ToastAndroid.show("Email address is already in use!", ToastAndroid.LONG);
                    }

                    if (error.code === 'auth/invalid-email') {
                        ToastAndroid.show("That email address is invalid!", ToastAndroid.LONG);
                    }

                    if (error.code === 'auth/weak-password') {
                        ToastAndroid.show("Password should be at least 6 characters!", ToastAndroid.LONG);
                    }
                });
        }
    };


    return (
        <View style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#FBFCFC", paddingTop: StatusBar.currentHeight }}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: '13%', height: 70, alignItems: 'flex-end', justifyContent: 'center' }}
                // onPress={() => props.navigation.goBack()}
                >
                    {/* <Ionicons color={"rgba(114, 120, 245, 1)"} size={26} name={"chevron-back"} /> */}
                </TouchableOpacity>
                <View style={{ width: '60%', height: 70, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ color: 'rgba(114, 120, 245, 1)', fontWeight: 'bold', fontSize: 20, paddingStart: 5 }}>{'Registration'}</Text>
                </View>
            </View>
            <ImageBackground style={{ width: '100%', height: '90%' }} source={require('../../assests/Images/background.png')}>
                <KeyboardAwareScrollView style={{ paddingStart: 14, paddingEnd: 14, marginBottom: 20 }}>
                    <View style={{ marginTop: 15}}>
                        <Text style={styles.input_lable}>Name</Text>
                        <TextInput
                            style={styles.input_text}
                            mode='outlined'
                            keyboardType='default'
                            placeholder="Enter your Name"
                            onChangeText={(text) => setName(text)}
                        ></TextInput>
                        <Text style={styles.input_lable}>Email</Text>
                        <TextInput
                            style={styles.input_text}
                            mode='outlined'
                            keyboardType="email-address"
                            placeholder="Enter your email"
                            onChangeText={(text) => setEmail(text)}
                        ></TextInput>
                        <Text style={styles.input_lable}>Phone Number</Text>
                        <TextInput
                            style={styles.input_text}
                            mode='outlined'
                            placeholder="0XXXXXXXXX"
                            onChangeText={(val) => setNumber(val)}
                        ></TextInput>
                        <Text style={styles.input_lable}>Password</Text>
                        <TextInput
                            style={styles.input_text}
                            mode='outlined'
                            secureTextEntry={true}
                            placeholder="Enter your password"
                            onChangeText={(text) => setPassword(text)}
                        ></TextInput>

                        <TouchableOpacity
                            style={{
                                alignContent: "center",
                                marginTop: 35,
                                backgroundColor: "#7278F5",
                                height: 45,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 19,
                            }}
                            onPress={() => signin()}
                            underlayColor="#0084fffa"
                        >
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignContent: "center",
                                marginTop: 35,
                                backgroundColor: "#2C4085",
                                height: 45,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 19,
                            }}
                            onPress={() => navigation.navigate("Login")}
                            underlayColor="#0084fffa"
                        >
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        top: 50,
        margin: 15,
    },
    header_text: {
        fontSize: 25,
        fontWeight: "700",
        color: "#130160",
        textAlign: "center",
    },
    input_lable: {
        color: "#0D0140",
        marginVertical: 5,
        fontWeight: "bold",
        fontSize: 16,
    },
    input_text: {
        // borderColor: "#67afff",
        // borderWidth: 1,
        // borderRadius: 10,
        // padding: 10,
        // paddingLeft: 10,
        // marginVertical: 5,
    },
});

export default Registration