import { ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';

export default class ViewQuestionScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: this.props.route.params.data,
            qID: '',
            answer: null,
            isAnswerd: false,
            UserID: firebase.auth().currentUser?.uid,

        }


    }

    componentDidMount() {
        this.setState({
            qID: this.props.route.params.data.key,
            UserID: firebase.auth().currentUser?.uid,
        },()=>{
            this.getQuestionList()
            this.getAnswer()
        })
        
    }

    getAnswer = () => {
        this.onAnswerChange = database()
        .ref(`/answers/${this.state.UserID}/${this.state.qID}`)
        .on('value', snapshot => {
            this.setState({
                answer: snapshot.val()
            }, () =>{
                this.setState({
                    isAnswerd: this.state.answer !== null? true: false 
                })
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
        database().ref(`/answers/${this.state.UserID}/${this.state.qID}`).off('value', this.onAnswerChange)
    }

    renderBottomButton = () => {
        if (this.state.isAnswerd) {
            return (
                <Button mode="contained" dark={false} color={'rgba(114, 120, 245, 0.64)'} onPress={() => this.props.navigation.navigate('UpdateAnswerScreen', {question: this.state.question, answer: this.state.answer})}>
                    Update/Delete Answer
                </Button>
            )
        }
        else {
            return (
                <Button mode="contained" dark={false} color={'rgba(114, 120, 245, 0.64)'}onPress={() => this.props.navigation.navigate('AddAnswerScreen', {data: this.state.question})} >
                    Give Answer
                </Button>
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#FBFCFC", paddingTop: StatusBar.currentHeight }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: '13%', height: 70, alignItems: 'flex-end', justifyContent: 'center' }} onPress={()=> this.props.navigation.goBack()}>
                        <Ionicons color={"rgba(114, 120, 245, 1)"} size={26} name={"chevron-back"} />
                    </TouchableOpacity>
                    <View style={{ width: '60%', height: 70, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ color: 'rgba(114, 120, 245, 1)', fontWeight: 'bold', fontSize: 20, paddingStart: 5 }}>{this.state.isAnswerd ? 'Update  or  Delete Answer' : 'Give Answer'}</Text>
                    </View>
                </View>
                <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assests/Images/background.png')}>
                <ScrollView style={{ paddingStart: 30, paddingEnd: 30, marginTop: 30, marginBottom: 20 }}>
                    <Text style={{ color: 'black', fontSize: 23, fontWeight: 'bold' }}>{this.state.question?.title}</Text>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '500', marginTop: 25, lineHeight: 25 }}>{this.state.question? this.state.question.description : "" }</Text>
                    <View style={{ width: '100%', alignItems: 'flex-end', paddingTop: 20,marginBottom: 10}}>
                    {this.renderBottomButton()}
                    </View>
                    
                </ScrollView>
                </ImageBackground>
            </View>
        )
    }
}