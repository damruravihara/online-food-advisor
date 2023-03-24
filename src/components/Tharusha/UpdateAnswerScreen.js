import { Image, ImageBackground, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Card, List, TextInput } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserID } from '../../Constant';
import database from '@react-native-firebase/database';

export default class UpdateAnswerScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: this.props.route.params.question,
            qID: 0,
            answer: this.props.route.params.answer.answer,
            showModel: false,
            title: '',
            subtitle: '',
            showDeleteAlert: false,

        }
    }


    onUpdate = () => {
        database()
            .ref(`/answers/${UserID}/${this.props.route.params.question.createdBy}`)
            .update({
                answer: this.state.answer,
            })
            .then(() => {
                database()
                .ref(`/answerwithquestion/${UserID + this.props.route.params.question.createdBy}`)
                .update({
                    answer: this.state.answer,
                })
                .then(() => {
                    this.setState({
                        title: 'Updated!',
                        subtitle: 'Your Answer Updated Successfully'
                    }, () => {
                        this.setState({
                            showModel: true
                        })
                    })
                    setTimeout(() => {
                        this.setState({
                            showModel: false
                        }, () => {
                            // this.props.navigation.goBack()
                            this.props.navigation.popToTop()
                        })
                    }, 1000)
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    renderUpdateModal = () => {
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
                                title={this.state.title}
                                titleNumberOfLines={1}
                                titleStyle={[{ fontSize: 20, fontWeight: '800', textAlign: 'center', color: 'black' }]}
                                description={this.state.subtitle}
                                descriptionNumberOfLines={2}
                                descriptionStyle={[{ fontSize: 16, textAlign: 'center', color: 'black', marginTop: 10 }]}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    onDelete =async() =>{
    
        await database()
        .ref(`/answers/${UserID}/${this.props.route.params.question.createdBy}`)
        .remove()
        .then(() => {
            database()
            .ref(`/answerwithquestion/${UserID + this.props.route.params.question.createdBy}`)
            .remove()
            .then(() => {
                this.setState({
                    showDeleteAlert: false,
                    title: 'Deleted!',
                    subtitle: 'Your Answer Deleted Successfully'
                }, () => {
                    this.setState({
                        showModel: true
                    })
                })
                setTimeout(() => {
                    this.setState({
                        showModel: false
                    }, () => {
                        // this.props.navigation.goBack()
                        this.props.navigation.popToTop()
                    })
                }, 1000)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))



    }

    deleteAlert = () => {
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
                visible={this.state.showDeleteAlert}
                onRequestClose={() => {
                    this.setState({
                        showDeleteAlert: false
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
                            <Image source={require('../../assests/Images/information.png')} style={{ height: 60, width: 60 }} />
                        </View>
                        <View>
                            <List.Item
                                style={{ marginTop: 10, marginBottom: 20 }}
                                title={"Do You Want to Delete this Answer ?"}
                                titleNumberOfLines={1}
                                titleStyle={[{ fontSize: 16, textAlign: 'center', color: 'black', marginTop: 10 }]}
                                description={""}
                                descriptionNumberOfLines={2}
                                descriptionStyle={[{ fontSize: 16, textAlign: 'center', color: 'black', marginTop: 10 }]}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', overflow:'hidden', marginBottom: 30 }}>
                            <View style={{ width: '50%', alignItems:'center' }}>
                            <Button
                                    mode="contained"
                                    dark={false}
                                    color={'rgba(255, 0, 0, 0.64)'}
                                    onPress={() => this.onDelete()} >
                                    Yes
                                </Button>
                            </View>
                            <View style={{ width: '50%', alignItems: 'center' }}>
                            <Button
                                    mode="contained"
                                    dark={false}
                                    color={'rgba(114, 120, 245, 0.64)'}
                                    onPress={() => this.setState({showDeleteAlert: false})} >
                                    No
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }


    render() {
        return (
            <View style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#FBFCFC", paddingTop: StatusBar.currentHeight }}>
                {this.renderUpdateModal()}
                {this.deleteAlert()}
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: '13%', height: 70, alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons color={"rgba(114, 120, 245, 1)"} size={26} name={"chevron-back"} />
                    </TouchableOpacity>
                    <View style={{ width: '60%', height: 70, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ color: 'rgba(114, 120, 245, 1)', fontWeight: 'bold', fontSize: 20, paddingStart: 5 }}>{'Update Answer'}</Text>
                    </View>
                </View>
                <ImageBackground style={{ width: '100%', height: '90%' }} source={require('../../assests/Images/background.png')}>
                    <KeyboardAwareScrollView style={{ paddingStart: 14, paddingEnd: 14, marginBottom: 20 }}>
                        <View style={{ padding: 13, marginTop: 30, }}>
                            <Card elevation={4} style={{ backgroundColor: '#E7E7E7', borderRadius: 4 }}>
                                <Card.Content>
                                    <Text style={{ color: 'black', fontSize: 17, }}>{this.props.route.params.question.title}</Text>
                                </Card.Content>
                            </Card>
                        </View >
                        <View style={{ padding: 13, }}>
                            <Card elevation={4} style={{ backgroundColor: '#E7E7E7', borderRadius: 4 }}>
                                <Card.Content>
                                    <Text style={{ color: 'black', fontSize: 17, }}>{this.props.route.params.question.description}</Text>
                                </Card.Content>
                            </Card>
                        </View >
                        <View style={{ padding: 13, }}>
                            <TextInput
                                label="Type Your Answer Here"
                                value={this.state.answer}
                                onChangeText={text => this.setState({ answer: text })}
                                multiline={true}
                                numberOfLines={10}
                            />
                        </View>
                        <View style={{ width: '100%', justifyContent: 'center', marginBottom: 10, flexDirection: 'row', paddingTop: 30 }}>
                            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center', }}>
                                <Button
                                    mode="contained"
                                    dark={false}
                                    color={'rgba(255, 0, 0, 0.64)'}
                                    disabled={this.state.answer === null || this.state.answer.length === 0 ? true : false}
                                    onPress={() => this.setState({showDeleteAlert: true})} >
                                    Delete Answer
                                </Button>
                            </View>
                            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                <Button
                                    mode="contained"
                                    dark={false}
                                    color={'rgba(244, 248, 63, 0.64)'}
                                    disabled={this.state.answer === null || this.state.answer.length === 0 ? true : false}
                                    onPress={() => this.onUpdate()} >
                                    Update Answer
                                </Button>
                            </View>


                        </View>
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
        elevation: 5,
        overflow: 'hidden'
    },
})