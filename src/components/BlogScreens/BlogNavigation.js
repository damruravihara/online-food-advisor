import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleList from './ArticleList';
import AddBlogPost from './AddBlogPost';
import EditBlogPost from './EditBlogPost';
import SingleArticle from './SingleArticle';


const Stack = createNativeStackNavigator()

export default class BlogNavigation extends Component {
    render() {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Articles" component={ArticleList} />
                <Stack.Screen name="AddBlogPost" component={AddBlogPost} />
                <Stack.Screen name="EditArticle" component={EditBlogPost} />
                <Stack.Screen name="Article" component={SingleArticle} />
            </Stack.Navigator>
        )
    }
}