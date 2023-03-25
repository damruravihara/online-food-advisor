import { Image, ImageBackground, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Card, DefaultTheme, List, TextInput } from 'react-native-paper';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment/moment';

export default class UpdateMyQuestions extends Component {


    constructor(props) {
        super(props);

        this.state = {
            showModel: false,
            title: this.props.route.params.question.title,
            description: this.props.route.params.question.description,
            category: [],
            selectedCategory: this.props.route.params.question.categoryName,
            openPicker: false,
            UserID: firebase.auth().currentUser?.uid,
        }


    }

    componentDidMount() {
        this.setState({
            UserID: firebase.auth().currentUser?.uid
        }, ()=>{
            this.getFilterList()
        })
    }

    componentWillUnmount() {
        database().ref(`/categories`).off('value', this.onGetFilter)


    }

    getFilterList = () => {
        this.onGetFilter = database()
            .ref(`/categories`)
            .on('value', snapshot => {
                this.setState({
                    category: Object.values(snapshot.val())
                })
            })
    }


    rnderModal = () => {
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
                visible={this.state.showModel}
                onRequestClose={() => {
                    this.setState({
                        showModel: false
                    })
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
                                description={"Your Question Updated Successfully"}
                                descriptionNumberOfLines={2}
                                descriptionStyle={[{ fontSize: 16, textAlign: 'center', color: 'black', marginTop: 10 }]}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    onSubmit = async () => {
        database()
            .ref(`/questions/${this.props.route.params.question.key}`)
            .update({
                categoryName: this.state.selectedCategory,
                description: this.state.description,
                title: this.state.title,
            })
            .then(() => {
                database()
                    .ref(`/userwisequestion/${this.state.UserID}/${this.props.route.params.question.key}`)
                    .update({
                        categoryName: this.state.selectedCategory,
                        description: this.state.description,
                        title: this.state.title,
                    })
                    .then(() => {

                        this.setState({
                            showModel: true
                        })
                        setTimeout(() => {
                            this.setState({
                                showModel: false
                            }, () => {
                                this.props.navigation.goBack();
                            })
                        }, 1000)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    renderListArray = () => {
        const arr = this.state.category.filter((value, index) => {
            return value.id != 0
        })

        return arr
    }

    render() {
        return (
            <View style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#FBFCFC", paddingTop: StatusBar.currentHeight }}>
                {this.rnderModal()}
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: '13%', height: 70, alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons color={"rgba(114, 120, 245, 1)"} size={26} name={"chevron-back"} />
                    </TouchableOpacity>
                    <View style={{ width: '60%', height: 70, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ color: 'rgba(114, 120, 245, 1)', fontWeight: 'bold', fontSize: 20, paddingStart: 5 }}>{'Update My Question'}</Text>
                    </View>
                </View>
                <ImageBackground style={{ width: '100%', height: '90%' }} source={require('../../assests/Images/background.png')}>
                    <KeyboardAwareScrollView style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                        <View>
                            <Text style={styles.input_lable}>Category</Text>
                            <DropDownPicker
                                open={this.state.openPicker}
                                value={this.state.selectedCategory}
                                items={this.renderListArray().map((value, index) => {
                                    return {  label: value.name, value: value.name, key: index + 1, id: index + 1 }

                                })}
                                onPress={(open) => this.setState({ openPicker: open })}
                                onSelectItem={(item) => this.setState({ selectedCategory: item.value, openPicker: false })}
                                placeholder={'Select Question Category'}
                                placeholderStyle={{ color: DefaultTheme.colors.placeholder }}
                                style={{ backgroundColor: 'rgb(245, 245, 245)', height: 58, borderRadius: 5 }}
                            />
                        </View>

                        <Text style={styles.input_lable}>Title</Text>
                        <TextInput
                            mode='outlined'
                            placeholder="Enter your Title"
                            value={this.state.title}
                            onChangeText={(text) => this.setState({ title: text })}
                        ></TextInput>
                        <Text style={styles.input_lable}>Description</Text>
                        <TextInput
                            mode='outlined'
                            placeholder="Enter your Description"
                            value={this.state.description}
                            onChangeText={(text) => this.setState({ description: text })}
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
                            onPress={() => this.onSubmit()}
                            underlayColor="#0084fffa"
                            disabled={!this.state.selectedCategory || !this.state.description || !this.state.title}
                        >
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Update Question</Text>
                        </TouchableOpacity>
                    </KeyboardAwareScrollView>
                </ImageBackground>
            </View>
        )
    }
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
})