import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateProfile from './UpdateProfile';
import MyProfileScreen from './MyProfileScreen';
import UserManagement from './UserManagement';


const Stack = createNativeStackNavigator()

export default class ProfileNavigation extends Component {
    render() {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
                <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
                <Stack.Screen name="UserManagement" component={UserManagement} />

            </Stack.Navigator>
        )
    }
}