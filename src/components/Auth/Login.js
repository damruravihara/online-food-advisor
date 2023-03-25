import { View, Text, TouchableOpacity, ImageBackground, ToastAndroid, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
// import { getAuth, signInWithEmailAndPassword } from "@react-native-firebase/auth";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';


const Login = () => {

    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const navigation = useNavigation()

    const signin = async () => {
        if (email === "") {
            ToastAndroid.show("please fill email", ToastAndroid.SHORT);
        }
        else if (password === "") {
            ToastAndroid.show("please enter password", ToastAndroid.SHORT);
        }
        else {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    ToastAndroid.show("Success", ToastAndroid.SHORT);
                })
                .catch(error => {
                    ToastAndroid.show("InCorrect Email or Password", ToastAndroid.LONG);
                })
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
                    <Text style={{ color: 'rgba(114, 120, 245, 1)', fontWeight: 'bold', fontSize: 20, paddingStart: 5 }}>{'Login'}</Text>
                </View>
            </View>
            <ImageBackground style={{ width: '100%', height: '90%' }} source={require('../../assests/Images/background.png')}>
                <KeyboardAwareScrollView style={{ paddingStart: 14, paddingEnd: 14, marginBottom: 20 }}>
                    <View>
                        <Text style={styles.input_lable}>Email</Text>
                        <TextInput
                            style={styles.input_text}
                            keyboardType="email-address"
                            placeholder="Enter your email"
                            mode='outlined'
                            onChangeText={(text) => setEmail(text)}
                        ></TextInput>
                        <Text style={styles.input_lable}>Password</Text>
                        <TextInput
                            style={styles.input_text}
                            secureTextEntry={true}
                            mode='outlined'
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
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Sign In</Text>
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
                            onPress={() => navigation.navigate("Registration")}
                            underlayColor="#0084fffa"
                        >
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Sign Up</Text>
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
    input_text: {}

});

export default Login