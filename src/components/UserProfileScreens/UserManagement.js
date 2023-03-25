import { FlatList, Image, ImageBackground, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Card, List } from 'react-native-paper';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';

const UserManagement = ({ navigation }) => {

    const [userList, setUserList] = React.useState("");
    const [UserID, setUserID] = React.useState(firebase.auth().currentUser?.uid);


    useEffect(() => {
        setUserID(firebase.auth().currentUser?.uid)
    })

    useEffect(() => {
        const onValueChange = database()
            .ref(`/users`)
            .on('value', snapshot => {
                if(snapshot.val() !== null){
                    setUserList(Object.values(snapshot.val()))
                }
            });

        // Stop listening for updates when no longer required
        return () => database().ref(`/users`).off('value', onValueChange);
    }, [userList]);

    const userItm = ({ item, index }) => {
        return (
            <Card
                style={{ paddingHorizontal: 5, marginHorizontal: 20, marginVertical: 20 }}
            >
                <Card.Title
                    title={item.Name}
                    subtitle={item.Email}
                />
                <Card.Content>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons color={"rgba(114, 120, 245, 1)"} size={24} name={"call"} />
                        <Text style={{ color: 'black', marginStart: 10, fontSize: 15 }}>{item.number}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons color={"rgba(114, 120, 245, 1)"} size={24} name={"person"} />
                        <Text style={{ color: 'black', marginStart: 10, fontSize: 15 }}>{item.role}</Text>
                    </View>
                </Card.Content>
            </Card>
        )
    }

    return (
        <View style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#FBFCFC", paddingTop: StatusBar.currentHeight }}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: '13%', height: 70, alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                    <Ionicons color={"rgba(114, 120, 245, 1)"} size={26} name={"chevron-back"} />
                </TouchableOpacity>
                <View style={{ width: '80%', height: 70, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ color: 'rgba(114, 120, 245, 1)', fontWeight: 'bold', fontSize: 20, paddingStart: 5 }}>{'User Management'}</Text>
                </View>
            </View>
            <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assests/Images/background.png')}>
                <FlatList
                    data={userList}
                    renderItem={userItm}
                    keyExtractor={(item, index) => index}
                />
            </ImageBackground>
        </View>
    )
}

export default UserManagement