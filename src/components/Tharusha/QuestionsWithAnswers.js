import { FlatList, Image, ImageBackground, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { Card, Divider, List, Paragraph } from 'react-native-paper'
import database from '@react-native-firebase/database';

const Filter = [
    {
        id: 0,
        name: 'All'
    }
]

export default class QuestionsWithAnswers extends Component {


    constructor(props) {
        super(props);

        this.state = {
            filterTypes: [
                {
                    id: 0,
                    name: 'All'
                }
            ],
            selectedFilter: {
                id: 0,
                name: 'All'
            },
            questionList: [],
            filteredQuestionList: [],
            isExpanded: true

        }


    }

    componentDidMount() {
        this.getFilterList()
        this.getQuestionList()

    }

    getFilterList = () => {
        this.onGetFilter = database()
            .ref(`/categories`)
            .on('value', snapshot => {
                this.setState({
                    filterTypes: snapshot.val() !== null ? Object.values(snapshot.val()) : Filter
                })
            })
    }

    getQuestionList = () => {
        this.onValueChange = database()
            .ref(`/answerwithquestion`)
            .on('value', snapshot => {
                this.setState({
                    questionList: snapshot.val() !== null ? Object.values(snapshot.val()) : []
                }, () => {
                    if (this.state.selectedFilter.id !== 0) {
                        const arr = this.state.questionList.filter(ele => {
                            if (ele !== null) {
                                return ele.categoryName === this.state.selectedFilter.name
                            }
                        })
                        this.setState({
                            filteredQuestionList: arr
                        })
                    }
                    else {
                        this.setState({
                            filteredQuestionList: this.state.questionList
                        })
                        console.log(this.state.questionList)
                    }
                })
            })
    }

    getAnswers = () => {
        this.onGetAnswer = database()
            .ref(`/answers`)
            .on('value', snapshot => {
                console.log(snapshot.val())

            })
    }

    componentWillUnmount() {
        database().ref(`/answerwithquestion`).off('value', this.onValueChange)
        database().ref(`/categories`).off('value', this.onGetFilter)


    }

    renderFilterItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{
                borderColor: item.id == this.state.selectedFilter.id ? "rgba(114, 120, 245, 1)" : "rgba(114, 120, 245, 0.64)",
                borderWidth: 0.5,
                margin: 6,
                padding: 5,
                paddingEnd: 15,
                paddingStart: 15,
                minWidth: 80,
                alignContent: "center",
                alignItems: "center",
                backgroundColor: item.id == this.state.selectedFilter.id ? "rgba(114, 120, 245, 1)" : "rgba(114, 120, 245, 0.64)",
                flexDirection: "row", borderRadius: 10, justifyContent: "center"
            }}
                onPress={() => {
                    this.setState({
                        selectedFilter: item,
                        filteredQuestionList: [],
                    }, () => {
                        this.getQuestionList()
                        this.flatListFilterRef.scrollToIndex({
                            animated: true,
                            index: index
                        })
                    })
                }}
            >

                <Text numberOfLines={1} ellipsizeMode="tail" style={[{
                    fontSize: 14,
                    fontWeight: '600',
                    maxWidth: 150,
                    color: item.id == this.state.selectedFilter.id ? "#FFFFFF" : "#03314B",
                }]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    renderQuestionList = () => {
        if (this.state.filteredQuestionList === undefined || this.state.filteredQuestionList === null || this.state.filteredQuestionList.length === 0) {
            return (
                <View style={{ width: "100%", height: '75%', justifyContent: "center", alignItems: "center", flexDirection: 'column' }}>
                    {/* #7278F5 */}
                    <Image style={{ width: 200, height: 200 }}
                        source={require('../../assests/Images/no-data-cuate.png')} />
                    <Text style={[{
                        fontSize: 16,
                        fontWeight: '800', color: '#141222', marginHorizontal: '17%', marginVertical: 26,
                        textAlign: "center"
                    }]}>
                        {"No Questions Found"}
                    </Text>
                    <Text style={[{
                        fontSize: 14,
                        textAlign: "center",
                        fontWeight: '400', color: '#72819D', marginHorizontal: '12%'
                    }]}>
                        {'Looks like there are no questions'}
                    </Text>

                </View>
            )
        }
        return (
            <SafeAreaView style={{ flex: 1, width: "100%", paddingTop: 10, height: '100%', paddingBottom: 90 }}>
                <FlatList
                    ref={(ref) => this.flatListRef = ref}
                    data={this.state.filteredQuestionList}

                    renderItem={this.renderQueItem}

                    keyExtractor={(item, index) => index}
                />
            </SafeAreaView>
        )
    }


    renderQueItem = ({ item, index }) => {
        console.log(item)
        if (item !== null) {
            return (
                <View style={{ padding: 13, paddingStart: 30, paddingEnd: 30 }}>
                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewQuestionScreen', {
                        data: item
                    })}> */}
                    <List.Accordion
                        expanded={this.state.isExpanded}
                        onPress={() => {
                            this.setState({
                                isExpanded: !this.state.isExpanded
                            })
                        }}
                        titleNumberOfLines={1}
                        style={{
                            paddingStart: 15,
                            paddingEnd: 15,
                            backgroundColor: 'rgba(217, 217, 217, 1)',

                        }}
                        title={item.questionTitle}
                        titleStyle={[ {
                            fontSize: 16,
                            fontWeight: 'bold',
                            color:  'black',
                        }]}
                        description={item.categoryName}
                    >
                        <Card style={{ backgroundColor: 'rgba(217, 217, 217, 1)', }}>
                            {/* <Card.Title
                                title={""}
                                titleNumberOfLines={1}
                                subtitleNumberOfLines={1}
                                titleStyle={{ color: 'rgba(0, 0, 0, 1)', fontSize: 20 }}
                                subtitle={item.categoryName}
                                subtitleStyle={{ color: 'rgba(0, 0, 0, 1)', fontSize: 18 }}
                            /> */}
                            <Card.Content>
                                <Text style={{ color: 'rgba(0, 0, 0, 1)', fontSize: 16, lineHeight: 24 }}>Answer :</Text>
                                <Paragraph numberOfLines={2} style={{ color: 'rgba(0, 0, 0, 1)', fontSize: 16, lineHeight: 24, fontWeight: 'bold' }}>
                                    {item.answer}
                                </Paragraph>
                            </Card.Content>
                        </Card>

                    </List.Accordion>

                    {/* </TouchableOpacity> */}
                </View >
            )
        }


    }

    render() {
        return (
            <View style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#FBFCFC", paddingTop: StatusBar.currentHeight }}>
                <View style={{ padding: 5, paddingTop: 30, paddingHorizontal: 12, width: "100%", alignSelf: 'center', justifyContent: "space-between", flexDirection: "row" }}>
                    <FlatList
                        ref={(ref) => this.flatListFilterRef = ref}
                        data={this.state.filterTypes}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={this.renderFilterItem}
                        keyExtractor={(item, index) => index}
                        style={{ width: "80%" }}
                    />
                </View>
                <Divider style={{ marginTop: 5 }} />
                <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assests/Images/background.png')}>
                    {this.renderQuestionList()}
                </ImageBackground>
            </View>

        )
    }
}