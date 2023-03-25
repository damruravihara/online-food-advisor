import { FlatList, Image, ImageBackground, Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Card, Divider, List } from 'react-native-paper';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';

export default class ViewMyQuestionWithAnswersScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: this.props.route.params.data,
            qID: '',
            answer: null,
            isAnswerd: false,
            answerList: [],
            showDeleteAlert: false,
            showModel: false,
            title: "",
            subtitle: "",
            UserID: firebase.auth().currentUser?.uid,
        }


    }

    componentDidMount() {
        this.setState({
            qID: this.props.route.params.data.key,
            UserID: firebase.auth().currentUser?.uid,
        }, () => {
            this.getQuestionList()
            this.getAnswer()
        })

    }

    getAnswer = () => {
        this.onAnswerChange = database()
            .ref(`/questionwiseanswer/${this.state.qID}`)
            .on('value', snapshot => {
                this.setState({
                    answerList: snapshot.val() !== null ? Object.values(snapshot.val()) : []
                })
            })
    }
    getQuestionList = () => {
        this.onValueChange = database()
            .ref(`/questions/${this.state.qID}`)
            .on('value', snapshot => {
                this.setState({
                    question: snapshot.val()
                })
            })
    }

    componentWillUnmount() {
        database().ref(`/questions/${Number(this.state.qID)}`).off('value', this.onValueChange)
        database().ref(`/questionwiseanswer/${this.state.qID}`).off('value', this.onAnswerChange)
    }

    renderBottomButton = () => {
        return (
            <View style={{ width: '100%', justifyContent: 'space-evenly', marginBottom: 10, flexDirection: 'row', paddingTop: 30 }}>
                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center', }}>
                    <Button
                        mode="contained"
                        dark={false}
                        color={'rgba(255, 0, 0, 0.64)'}
                        onPress={() => this.setState({ showDeleteAlert: true })} >
                        Delete Question
                    </Button>
                </View>
                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        mode="contained"
                        dark={false}
                        color={'rgba(244, 248, 63, 0.64)'}
                        onPress={() => this.props.navigation.navigate('UpdateMyQuestions', { question: this.state.question, answer: this.state.answer })} >
                        Update Question
                    </Button>
                </View>


            </View>
        )
    }

    answerItem = ({ item, index }) => {
        return (
            <List.Item
                title={item.answer}
                style={{ backgroundColor: 'rgb(207, 216, 220)', marginHorizontal: 25, borderStartWidth: 7, borderStartColor: 'rgba(114, 120, 245, 1)' }}
                titleStyle={{ fontWeight: '600' }}
            />
        )
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
                        <View style={{ alignItems: 'center', paddingTop: 30 }}>
                            <Image source={require('../../assests/Images/information.png')} style={{ height: 60, width: 60 }} />
                        </View>
                        <View>
                            <List.Item
                                style={{ marginTop: 10, marginBottom: 20 }}
                                title={"Do You Want to Delete this Question ?"}
                                titleNumberOfLines={1}
                                titleStyle={[{ fontSize: 16, textAlign: 'center', color: 'black', marginTop: 10 }]}
                                description={""}
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
                                    onPress={() => this.onDelete()} >
                                    Yes
                                </Button>
                            </View>
                            <View style={{ width: '50%', alignItems: 'center' }}>
                                <Button
                                    mode="contained"
                                    dark={false}
                                    color={'rgba(114, 120, 245, 0.64)'}
                                    onPress={() => this.setState({ showDeleteAlert: false })} >
                                    No
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    onDelete = () => {
        database()
            .ref(`/questions/${this.props.route.params.data.key}`)
            .remove()
            .then(() => {
                database()
                    .ref(`/userwisequestion/${this.state.UserID}/${this.props.route.params.data.key}`)
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

    renderSuccessModal = () => {
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
    renderAnswerHeader = () => {
        return (
            <View style={{ marginTop: 15 }}>
                <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Answer List</Text>
                <Divider style={{ marginTop: 10, height: 3, backgroundColor: 'black' }} />
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#FBFCFC", paddingTop: StatusBar.currentHeight }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: '13%', height: 70, alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons color={"rgba(114, 120, 245, 1)"} size={26} name={"chevron-back"} />
                    </TouchableOpacity>
                    <View style={{ width: '80%', height: 70, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ color: 'rgba(114, 120, 245, 1)', fontWeight: 'bold', fontSize: 20, paddingStart: 5 }}>{'Update  or  Delete My Question'}</Text>
                    </View>
                </View>
                <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assests/Images/background.png')}>
                    <FlatList
                        data={this.state.answerList}
                        ListHeaderComponent={
                            <View style={{ marginTop: 20, marginBottom: 20, marginHorizontal: 20 }}>
                                <Card>
                                    <Card.Content>
                                        <Text style={{ color: 'black', fontSize: 23, fontWeight: 'bold' }}>{this.state.question?.title}</Text>
                                        <Text style={{ color: 'black', fontSize: 18, fontWeight: '500', marginTop: 25, lineHeight: 25 }}>{this.state.question ? this.state.question.description : ""}</Text>
                                    </Card.Content>
                                    {this.renderBottomButton()}
                                </Card>
                                {this.renderAnswerHeader()}
                            </View>}
                        renderItem={this.answerItem}
                        keyExtractor={(item, index) => index}
                        ListEmptyComponent={
                            <View style={{ width: "100%", height: '50%', justifyContent: "center", alignItems: "center", flexDirection: 'column', marginVertical: 50 }}>
                                {/* #7278F5 */}
                                <Image style={{ width: 200, height: 200 }}
                                    source={require('../../assests/Images/no-data-cuate.png')} />
                                <Text style={[{
                                    fontSize: 16,
                                    fontWeight: '800', color: '#141222', marginHorizontal: '17%', marginVertical: 26,
                                    textAlign: "center"
                                }]}>
                                    {"No Answers Found"}
                                </Text>
                                <Text style={[{
                                    fontSize: 14,
                                    textAlign: "center",
                                    fontWeight: '400', color: '#72819D', marginHorizontal: '12%'
                                }]}>
                                    {"Looks like this question still dosen't get any answers"}
                                </Text>

                            </View>
                        }
                    />
                </ImageBackground>
                {this.renderSuccessModal()}
                {this.deleteAlert()}
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