import { View, Text, TouchableOpacity, ImageBackground, ToastAndroid, StyleSheet, StatusBar, Modal, Image } from 'react-native'
import React, { useEffect } from 'react'
// import { getAuth, signInWithEmailAndPassword } from "@react-native-firebase/auth";
import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { List, TextInput } from 'react-native-paper';


const UpdateProfile = ({ navigation }) => {

    const [name, setName] = React.useState("");
    const [number, setNumber] = React.useState("");
    const [showModel, setShowModel] = React.useState("");
    const [UserID, setUserID] = React.useState(firebase.auth().currentUser?.uid);



    useEffect(() => {
        setUserID(firebase.auth().currentUser?.uid)
        database()
            .ref(`/users/${UserID}`)
            .once('value')
            .then(snapshot => {
                setName(snapshot.val().Name)
                setNumber(snapshot.val().number)
            });
    }, []);

    const signin = async () => {
        if (name === "") {
            ToastAndroid.show("Enter Your Name", ToastAndroid.SHORT);
        }
        else if (number === "") {
            ToastAndroid.show("Enter Your Number", ToastAndroid.SHORT);
        }
        else {
            database()
                .ref('/users/' + UserID)
                .update({
                    Name: name,
                    number: number,
                })
                .then(() => {
                    ToastAndroid.show("Logout Success")
                    // setShowModel(true)

                    // setTimeout(() => {
                    //     setShowModel(false)
                    //     navigation.goBack();
                    // }, 1000)
                });
        }
    };

    const rnderModal = () => {
        return (
            <Modal
                style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    zIndex: 10,
                    flex: 1,
                }}
                animationType="fade"
                transparent={true}
                visible={showModel}
                onRequestClose={() => {
                    setShowModel(false)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* <View style={{ alignItems: 'flex-end', paddingEnd: 20, paddingTop: 20 }}>
                            <TouchableOpacity onPress={onClose}>
                                <Image source={require('../../images/FABclose.png')} style={{ height: 20, width: 20 }} />

                            </TouchableOpacity>
                        </View> */}
                        <View style={{ alignItems: 'center', paddingTop: 30 }}>
                            <Image source={require('../../assests/Images/succuess.png')} style={{ height: 60, width: 60 }} />
                        </View>
                        <View>
                            <List.Item
                                style={{ marginTop: 10, marginBottom: 20 }}
                                title={"Updated!"}
                                titleNumberOfLines={1}
                                titleStyle={[{ fontSize: 20, fontWeight: '800', textAlign: 'center', color: 'black' }]}
                                description={"Your Profile Updated Successfully"}
                                descriptionNumberOfLines={2}
                                descriptionStyle={[{ fontSize: 16, textAlign: 'center', color: 'black', marginTop: 10 }]}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }


    return (
        <View style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#FBFCFC", paddingTop: StatusBar.currentHeight }}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: '13%', height: 70, alignItems: 'flex-end', justifyContent: 'center' }}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons color={"rgba(114, 120, 245, 1)"} size={26} name={"chevron-back"} />
                </TouchableOpacity>
                <View style={{ width: '60%', height: 70, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ color: 'rgba(114, 120, 245, 1)', fontWeight: 'bold', fontSize: 20, paddingStart: 5 }}>{'Profile Update'}</Text>
                </View>
            </View>
            <ImageBackground style={{ width: '100%', height: '90%' }} source={require('../../assests/Images/background.png')}>
                <KeyboardAwareScrollView style={{ paddingStart: 14, paddingEnd: 14, marginBottom: 20 }}>
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.input_lable}>Name</Text>
                        <TextInput
                            style={styles.input_text}
                            mode='outlined'
                            keyboardType='default'
                            placeholder="Enter your Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        ></TextInput>
                        <Text style={styles.input_lable}>Phone Number</Text>
                        <TextInput
                            style={styles.input_text}
                            mode='outlined'
                            placeholder="0XXXXXXXXX"
                            value={number}
                            onChangeText={(val) => setNumber(val)}
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
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Update Profile</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
            {rnderModal()}
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        borderColor: "#DAE3EC",
        borderWidth: 1.3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
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
});

export default UpdateProfile