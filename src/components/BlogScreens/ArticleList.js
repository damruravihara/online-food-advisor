import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ImageBackground, Pressable, Image, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB, IconButton, List, Searchbar } from 'react-native-paper';
import { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';



export default function ArticleList({ navigation }) {
    const [articles, setArticles] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [UserID, setUserID] = React.useState(firebase.auth().currentUser?.uid);


    // temporary till the firebase is set up
    const getArticles = () => {
        setArticles([{ title: 'Article 1', content: 'Content of article 1', date: '24/03/2023', image: 'https://picsum.photos/340' }, { title: 'Article 2', content: 'Content of article 2', date: '24/03/2023', image: 'https://picsum.photos/270' }])
    }



    useEffect(() => {
        setUserID(firebase.auth().currentUser?.uid)
    }, [])

    useEffect(() => {
        const onValueChange = database()
            .ref(`/articals`)
            .on('value', snapshot => {
                if (snapshot.val() !== null) {
                    setArticles(Object.values(snapshot.val()))
                }
                else{
                    setArticles([])
                }
            });

        // Stop listening for updates when no longer required
        return () => database().ref(`/articals`).off('value', onValueChange);
    }, [articles]);

    // useEffect(() => {
    //     getArticles()
    // }, [articles])

    const fabBtn = () => {
        return (
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('AddBlogPost')}
            />
        )
    }

    const deletePress = (item) => {
        console.log(item.key, '---------------')
        database()
            .ref(`/articals/${item.key}`)
            .remove()
            .then((val) => {
                console.log(val)
                ToastAndroid.show("Artical Removed", ToastAndroid.SHORT)
            }).catch(err => {
                console.log(err)
            })
    }

    const search = (searchKeyword) => {
        setFilteredList(articles.filter(article => article.title.toLowerCase().includes(searchKeyword.toLowerCase())))
    }
    return (
        <SafeAreaView style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#FBFCFC" }}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: '13%', height: 70, alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                    <Ionicons color={"rgb(224, 100, 115)"} size={26} name={"chevron-back"} />
                </TouchableOpacity>
                <View style={{ width: '60%', height: 70, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ color: 'rgb(224, 100, 115)', fontWeight: 'bold', fontSize: 20, paddingStart: 5 }}>{'Blog Articles'}</Text>
                </View>
            </View>

            <Searchbar placeholder='Search Articles' onChangeText={text => { search(text) }} />
            <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assests/Images/background.png')}>
                <FlatList style={{ marginTop: 60 }}
                    data={filteredList.length > 0 ? filteredList : articles}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <Pressable style={{ backgroundColor: 'rgba(224, 100, 115, 0.74)', borderRadius: 10, marginTop: 10, padding: 10, borderColor: 'whitesmoke', borderWidth: 1 }} onPress={() => { navigation.navigate('Article', item) }}  >
                            <List.Item title={item.title} description={item.content} left={() => <List.Icon icon="newspaper" color='white' />} right={() => <Text>{item.createdDate}</Text>} />
                            <List.Item left={() => <IconButton icon='pen' color='yellow' onPress={() => navigation.navigate('EditArticle', item)} />} right={() => <IconButton icon='delete' color='darkred' onPress={() => deletePress(item)} />} />
                        </Pressable>
                    )}
                />
            </ImageBackground>
            {fabBtn()}

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 19,
        bottom: 50,
    },
})