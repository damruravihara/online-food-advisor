import { View, Text, ImageBackground, FlatList, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, ThemeProvider } from 'react-native-paper'


export default function SingleArticle({ navigation, route }) {
    return (
        <SafeAreaView style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#FBFCFC" }}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: '13%', height: 70, alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                    <Ionicons color={"rgb(224, 100, 115)"} size={26} name={"chevron-back"} />
                </TouchableOpacity>
                <View style={{ width: '60%', height: 70, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ color: 'rgb(224, 100, 115)', fontWeight: 'bold', fontSize: 20, paddingStart: 5 }}>{'Blog Article'}</Text>
                </View>
            </View>
            {/* <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assets/Images/background2.png')}> */}
            <Card elevation={5}>
                <Card.Cover source={{ uri: route.params.image }} />
                <Card.Title title={route.params.title} />
                <Card.Content>
                    <Text variant="bodyMedium">{route.params.content}</Text>
                </Card.Content>
            </Card>
            {/* </ImageBackground> */}
        </SafeAreaView>
    )
}