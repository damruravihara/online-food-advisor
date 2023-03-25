import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider, TextInput, Searchbar
} from 'react-native-paper';
import merge from 'deepmerge';
import BottomNavigation from '../components/NavBar/BottomNavigation';
import auth from '@react-native-firebase/auth';
import Registration from '../components/Auth/Registration';
import Login from '../components/Auth/Login';
import AddQuestionNavigation from '../components/QuestionScreens/AddQuestionNavigation';


const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const Stack = createNativeStackNavigator()

export default class RootNavigator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userData: ""
        }
    }

    componentDidMount() {
        this.userStateChange = auth().onAuthStateChanged(user => {
            this.setState({
                userData: user
            })
        })
    }

    componentWillUnmount() {
        this.userStateChange
    }


    render() {
        if (this.state.userData) {
            return (
                <View style={{ flex: 1, width: "100%", height: "100%" }}>
                    <PaperProvider theme={CombinedDefaultTheme}>
                        <NavigationContainer theme={CombinedDefaultTheme}>
                            <Stack.Navigator screenOptions={{ headerShown: false }}>
                                <Stack.Screen name='BottomNavigation' component={BottomNavigation} />
                                <Stack.Screen name="AddQuestionNavigation" component={AddQuestionNavigation} />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </PaperProvider>
                </View>
            )
        }
        return (
            <View style={{ flex: 1, width: "100%", height: "100%" }}>
                <PaperProvider theme={CombinedDefaultTheme}>
                    <NavigationContainer theme={CombinedDefaultTheme}>
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen name='Login' component={Login} />
                            <Stack.Screen name='Registration' component={Registration} />
                            {/* <Stack.Screen name="TharushaRootNavigator" component={TharushaRootNavigator} /> */}
                        </Stack.Navigator>
                    </NavigationContainer>
                </PaperProvider>
            </View>
        )

    }
}