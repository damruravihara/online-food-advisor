import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TharushaRootNavigator from '../Tharusha/TharushaRootNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QuestionsWithAnswers from '../Tharusha/QuestionsWithAnswers';



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
                        title: "Answers",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="format-list-numbered" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="TharushaRootNavigator1"
                    component={TharushaRootNavigator}
                    options={{
                        title: "Add New",
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="add" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="TharushaRootNavigator2"
                    component={TharushaRootNavigator}
                    options={{
                        title: "Explore",
                        tabBarIcon: ({ color }) => (
                            <Zocial name="blogger" color={color} size={20} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="TharushaRootNavigator4"
                    component={TharushaRootNavigator}
                    options={{
                        title: "Home",
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