import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddNewQuestion from './AddNewQuestion';
import MyQuestions from './MyQuestions';
import ViewMyQuestionWithAnswersScreen from './ViewMyQuestionWithAnswersScreen';
import UpdateMyQuestions from './UpdateMyQuestions';


const Stack = createNativeStackNavigator()

export default class AddQuestionNavigation extends Component {
    render() {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MyQuestions" component={MyQuestions} />
                <Stack.Screen name="AddNewQuestion" component={AddNewQuestion} />
                <Stack.Screen name="ViewMyQuestionWithAnswersScreen" component={ViewMyQuestionWithAnswersScreen} />
                <Stack.Screen name="UpdateMyQuestions" component={UpdateMyQuestions} />
            </Stack.Navigator>
        )
    }
}