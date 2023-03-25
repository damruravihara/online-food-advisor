import { Image, View, Text, StyleSheet, TouchableOpacity, ImageBackground, StatusBar, Modal } from 'react-native'
import React, { useState } from 'react'
import { Button, Card, HelperText, List, Portal, TextInput } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';


export default function EditBlogPost({ route, navigation }) {
    const [title, setTitle] = useState(route.params.title);
    const [content, setContent] = useState(route.params.content);
    const [image, setImage] = useState(route.params.image);
    const [showModal, setShowModal] = useState(false);

    // rendering the modal
    const renderModal = () => {
        return (
            <Portal>
                <Modal
                    style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        zIndex: 10,
                        flex: 1,
                    }}
                    // modal fades into view
                    animationType="fade"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => {
                        setShowModal(false)
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ alignItems: 'center', paddingTop: 30 }}>
                                <Image source={require('../../assests/Images/succuess.png')} style={{ height: 60, width: 60 }} />
                            </View>
                            <View>
                                <List.Item
                                    style={{ marginTop: 10, marginBottom: 20 }}
                                    title={"Posted!"}
                                    titleNumberOfLines={1}
                                    titleStyle={[{ fontSize: 20, fontWeight: '800', textAlign: 'center', color: 'black' }]}
                                    description={"Blog article was posted successfully"}
                                    descriptionNumberOfLines={2}
                                    descriptionStyle={[{ fontSize: 16, textAlign: 'center', color: 'black', marginTop: 10 }]}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </Portal>
        )
    }
    const onSubmit = () => { 
        database()
        .ref('/articals/' + route.params.key)
        .update({
            title: title,
            content: content,
            image: image
        })
        .then(() => {
            setShowModal(true)

            setTimeout(() => {
                setShowModal(false)
                navigation.goBack();
            }, 1000)
        });
     }


    return (
        <View style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#FBFCFC", paddingTop: StatusBar.currentHeight }}>
            {renderModal()}
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: '13%', height: 70, alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => props.navigation.goBack()}>
                    <Ionicons color={"rgb(224, 100, 115)"} size={26} name={"chevron-back"} />
                </TouchableOpacity>
                <View style={{ width: '60%', height: 70, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ color: 'rgb(224, 100, 115)', fontWeight: 'bold', fontSize: 20, paddingStart: 5 }}>{'Edit Blog Article'}</Text>
                </View>
            </View>
            <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assests/Images/background.png')}>
                <KeyboardAwareScrollView style={{ paddingStart: 14, paddingEnd: 14 }}>
                    <View style={{ padding: 13, }}>
                        <TextInput
                            label="Topic of the article"
                            value={title}
                            onChangeText={text => setTitle(text)}
                            activeUnderlineColor='black'
                        />
                        <HelperText type='error' visible={!title || title.length === 0} > Please enter the topic of the article </HelperText>
                    </View>
                    <View style={{ padding: 13, }}>
                        <TextInput
                            label="Content of the article"
                            value={content}
                            onChangeText={text => setContent(text)}
                            multiline={true}
                            numberOfLines={3}
                            activeUnderlineColor='black'
                        />
                        <HelperText type='error' visible={!content || content.length === 0} > Please enter content for the article </HelperText>
                    </View>
                    <View style={{ padding: 13, }}>
                        <TextInput
                            label="URL for the cover image (optional)"
                            value={image}
                            onChangeText={text => setImage(text)}
                            multiline={true}
                            activeUnderlineColor='black'
                            right={<TextInput.Icon icon="image" />}
                        />
                    </View>
                    <Card mode='contained'>
                        <Card.Cover source={{ uri: image.length === 0 ? 'https://' : image }} />
                        <Text style={{ alignSelf: "center", fontSize: 18 }}>Preview of the image </Text>
                    </Card>
                    <View style={{ width: '100%', alignItems: 'center', paddingTop: 20, marginBottom: 1, padding: 13 }}>
                        <Button
                            mode="contained"
                            dark={false}
                            color={'rgba(224, 100, 115, 0.74)'}
                            // making sure the user is not capable of publishing an article with no title or no content
                            disabled={!content || !title || title.length === 0 || content.length === 0 ? true : false}
                            onPress={() => {
                                // do something for real in the near future
                                onSubmit()
                            }} >
                            Post Article
                        </Button>
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        borderColor: "#DAE3EC",
        borderWidth: 1.3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})
