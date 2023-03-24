import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionListScreen from './QuestionListScreen';
import ViewQuestionScreen from './ViewQuestionScreen';
import AddAnswerScreen from './AddAnswerScreen';
import UpdateAnswerScreen from './UpdateAnswerScreen';

const Stack = createNativeStackNavigator()

export default class TharushaRootNavigator extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="QuestionListScreen" component={QuestionListScreen} />
        <Stack.Screen name="ViewQuestionScreen" component={ViewQuestionScreen} />
        <Stack.Screen name="AddAnswerScreen" component={AddAnswerScreen} />
        <Stack.Screen name="UpdateAnswerScreen" component={UpdateAnswerScreen} />

      </Stack.Navigator>
    )
  }
}