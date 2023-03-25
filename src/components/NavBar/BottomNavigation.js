import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TharushaRootNavigator from '../AnswerScreens/TharushaRootNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QuestionsWithAnswers from '../AnswerScreens/QuestionsWithAnswers';
import AddQuestionNavigation from '../QuestionScreens/AddQuestionNavigation';
import AddNewQuestion from '../QuestionScreens/AddNewQuestion';
import MyQuestions from '../QuestionScreens/MyQuestions';
import MyProfileScreen from '../UserProfileScreens/MyProfileScreen';



const Tab = createMaterialBottomTabNavigator();

export default class BottomNavigation extends Component {
    render() {
        return (
            <Tab.Navigator
                activeColor="rgba(0, 0, 0, 1)"
                barStyle={{ backgroundColor: 'rgba(182, 208, 226, 0.69)' }}
            >
                <Tab.Screen
                    name="TharushaRootNavigator"
                    component={TharushaRootNavigator}
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="QuestionsWithAnswers"
                    component={QuestionsWithAnswers}
                    options={{
                        title: "My Answers",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="format-list-numbered" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="AddNewQuestion"
                    component={AddNewQuestion}
                    options={{
                        title: "Add New",
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="add" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="MyQuestions"
                    component={MyQuestions}
                    options={{
                        title: "My Questions",
                        tabBarIcon: ({ color }) => (
                            <Zocial name="blogger" color={color} size={20} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="MyProfileScreen"
                    component={MyProfileScreen}
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="user" color={color} size={26} />
                        ),
                    }}
                />
                {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
            </Tab.Navigator>
        )
    }
}