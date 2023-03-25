import { FlatList, Image, ImageBackground, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Card, List } from 'react-native-paper';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';

const adminMenu = [
    {
        id: 1, name: 'Update My Profile'
    },
    // {
    //     id: 2, name: 'Remove Profile'
    // },
    {
        id: 3, name: "User Management"
    },
    {
        id: 4, name: 'Log Out'
    }
]

const userMenu = [
    {
        id: 1, name: 'Update My Profile'
    },
    // {
    //     id: 2, name: 'Remove Profile'
    // },
    {
        id: 4, name: 'Log Out'
    }
]

const MyProfileScreen = ({ navigation }) => {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [number, setNumber] = React.useState("");
    const [role, setRole] = React.useState("");
    const [menuList, setMenuList] = React.useState(userMenu);
    const [showDialog, setShowDialog] = React.useState(false);
    const [showModel, setShowModel] = React.useState(false);
    const [msgTitle, setMsgTitle] = React.useState("");
    const [magDescription, setMsgDescriptopn] = React.useState("");
    const [dialogTitle, setDialogTitle] = React.useState("");
    const [dialogDescription, setDialogDescription] = React.useState("");
    const [UserID, setUserID] = React.useState(firebase.auth().currentUser?.uid);

    useEffect(() => {
        setUserID(firebase.auth().currentUser?.uid)

        const onValueChange = database()
            .ref(`/users/${UserID}`)
            .on('value', snapshot => {
                setEmail(snapshot.val()?.Email)
                setName(snapshot.val()?.Name)
                setNumber(snapshot.val()?.number)
                setRole(snapshot.val()?.role)
                if (snapshot.val()?.role === 'admin') {
                    setMenuList(adminMenu)
                }
                else {
                    setMenuList(userMenu)
                }
            });

        // Stop listening for updates when no longer required
        return () => database().ref(`/users/${UserID}`).off('value', onValueChange);
    }, [UserID]);

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
                                title={msgTitle}
                                titleNumberOfLines={1}
                                titleStyle={[{ fontSize: 20, fontWeight: '800', textAlign: 'center', color: 'black' }]}
                                description={magDescription}
                                descriptionNumberOfLines={2}
                                descriptionStyle={[{ fontSize: 16, textAlign: 'center', color: 'black', marginTop: 10 }]}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }


    const renderMenuItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => onPressMenu(item)}>
                <List.Item
                    title={item.name}
                    style={{ backgroundColor: 'rgb(207, 216, 220)', marginHorizontal: 25, borderStartWidth: 7, borderStartColor: 'rgba(114, 120, 245, 1)' }}
                    titleStyle={{ fontWeight: '600' }}
                    right={props => <Ionicons color={"rgba(114, 120, 245, 1)"} size={26} name={"chevron-forward"} />}
                />
            </TouchableOpacity>
        )
    }

    const onPressMenu = (item) => {
        switch (item.id) {
            case 4:
                setDialogTitle("Are you sure, Do You Want to Logout ?")
                setShowDialog(true)
                break;
            case 1:
                navigation.navigate("ProfileNavigation", {
                    screen: "UpdateProfile",
                })
                break;
            case 3:
                navigation.navigate("ProfileNavigation", {
                    screen: "UserManagement",
                })
                break;
            default:
                break;
        }
    }

    const dialogPress = () => {
        if (dialogTitle === "Are you sure, Do You Want to Logout ?") {
            firebase.auth()
                .signOut()
                .then(() => {
                    setDialogTitle('Success')
                    setDialogDescription('You have Successfully Logout')
                    setShowModel(true)

                    setTimeout(() => {
                        setShowModel(false)
                    }, 1000)
                })

        }

    }

    const deleteAlert = () => {
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
                visible={showDialog}
                onRequestClose={() => {
                    setShowDialog(false)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignItems: 'center', paddingTop: 30 }}>
                            <Image source={require('../../assests/Images/information.png')} style={{ height: 60, width: 60 }} />
                        </View>
                        <View>
                            <List.Item
                                style={{ marginTop: 10, marginBottom: 20 }}
                                title={dialogTitle}
                                titleNumberOfLines={1}
                                titleStyle={[{ fontSize: 16, textAlign: 'center', color: 'black', marginTop: 10 }]}
                                description={dialogDescription}
                                descriptionNumberOfLines={2}
                                descriptionStyle={[{ fontSize: 16, textAlign: 'center', color: 'black', marginTop: 10 }]}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', overflow: 'hidden', marginBottom: 30 }}>
                            <View style={{ width: '50%', alignItems: 'center' }}>
                                <Button
                                    mode="contained"
                                    dark={false}
                                    color={'rgba(255, 0, 0, 0.64)'}
                                    onPress={() => dialogPress()} >
                                    Yes
                                </Button>
                            </View>
                            <View style={{ width: '50%', alignItems: 'center' }}>
                                <Button
                                    mode="contained"
                                    dark={false}
                                    color={'rgba(114, 120, 245, 0.64)'}
                                    onPress={() => setShowDialog(false)} >
                                    No
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }


    return (
        <View style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#FBFCFC", paddingTop: StatusBar.currentHeight }}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: '13%', height: 70, alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                    <Ionicons color={"rgba(114, 120, 245, 1)"} size={26} name={"chevron-back"} />
                </TouchableOpacity>
                <View style={{ width: '80%', height: 70, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ color: 'rgba(114, 120, 245, 1)', fontWeight: 'bold', fontSize: 20, paddingStart: 5 }}>{'My Profile'}</Text>
                </View>
            </View>
            <ImageBackground style={{ width: '100%', height: '90%' }} source={require('../../assests/Images/background.png')}>
                <FlatList
                    data={menuList}
                    renderItem={renderMenuItem}
                    ListHeaderComponent={
                        <Card
                            style={{ paddingHorizontal: 5, marginHorizontal: 20, marginVertical: 20 }}
                        >
                            <Card.Title
                                title={name}
                                subtitle={email}
                            />
                            <Card.Content>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons color={"rgba(114, 120, 245, 1)"} size={24} name={"call"} />
                                    <Text style={{ color: 'black', marginStart: 10, fontSize: 15 }}>{number}</Text>
                                </View>
                            </Card.Content>
                        </Card>
                    }
                    keyExtractor={(item, index) => index}
                />
            </ImageBackground>
            {deleteAlert()}
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
        elevation: 5,
        overflow: 'hidden'
    },
})

export default MyProfileScreen