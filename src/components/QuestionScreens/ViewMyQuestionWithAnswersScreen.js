import { FlatList, ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';

const UserID = firebase.auth().currentUser?.uid
export default class ViewMyQuestionWithAnswersScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: this.props.route.params.data,
            qID: '',
            answer: null,
            isAnswerd: false,
            answerList: []
        }


    }

    componentDidMount() {
        this.setState({
            qID: this.props.route.params.data.key
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
                    answerList: snapshot.val()
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
            <Button mode="contained" dark={false} color={'rgba(114, 120, 245, 0.64)'} onPress={() => this.props.navigation.navigate('UpdateAnswerScreen', { question: this.state.question, answer: this.state.answer })}>
                Update/Delete Question
            </Button>
        )
    }

    answerItem = ({ item, index }) => {
        return (
            <View>

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
                <ImageBackground style={{ width: '100%', height: '90%' }} source={require('../../assests/Images/background.png')}>
                    {/* <ScrollView style={{ paddingStart: 30, paddingEnd: 30, marginTop: 30, marginBottom: 20 }}>
                    <Text style={{ color: 'black', fontSize: 23, fontWeight: 'bold' }}>{this.state.question?.title}</Text>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '500', marginTop: 25, lineHeight: 25 }}>{this.state.question? this.state.question.description : "" }</Text>
                    <View style={{ width: '100%', alignItems: 'flex-end', paddingTop: 20,marginBottom: 10}}>
                    {this.renderBottomButton()}
                    </View>
                    
                </ScrollView> */}
                    <FlatList
                        data={this.state.answerList}
                        ListHeaderComponent={
                            <View style={{ paddingStart: 30, paddingEnd: 30, marginTop: 20, marginBottom: 20 }}>
                                <Text style={{ color: 'black', fontSize: 23, fontWeight: 'bold' }}>{this.state.question?.title}</Text>
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: '500', marginTop: 25, lineHeight: 25 }}>{this.state.question ? this.state.question.description : ""}</Text>
                                <View style={{ width: '100%', alignItems: 'flex-end', paddingTop: 20, marginBottom: 10 }}>
                                    {this.renderBottomButton()}
                                </View>
                            </View>}
                        renderItem={this.answerItem}
                        keyExtractor={(item, index) => index}
                    />
                </ImageBackground>
            </View>
        )
    }
}