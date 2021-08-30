import React, {useLayoutEffect, useState, useEffect} from 'react'
import {StyleSheet, View, Text, FlatList, TouchableOpacity, Alert} from 'react-native'
import ButtonWithBackground from '../components/ButtonWithBackground'
import GroupsItem from '../components/GroupsItems'
import Images from '../const/Images'
import firebase, {firestore} from '../firebase/Firebase'
import LottieView from 'lottie-react-native'

function GroupScreen({navigation}){
    const [groups, setGroups] = useState([])
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight:()=>(
                <ButtonWithBackground onPress= {() => {
                    navigation.navigate('Add Group Screen')
                }}
                image = {Images.add}
                />
            ),
            headerLeft:()=>(
                <ButtonWithBackground onPress= {() => {
                    signOutUser()
                }}
                image = {Images.logout}
                />
            )
        })
    })

    signOutUser = async () => {
        try{
            await firebase.auth().signOut()
            // navigation.reset({
            //     index: 0,
            //     routes: [{name: 'SplashScreen'}]
            // })
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getChats()
    }, [])

function getChats(){
    const db = firestore
    var groupArray = []

    db.collection('groups')
    .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function(change){
            setIsDataLoaded(true)
            if(change.type == 'added'){
                console.log('New Group: ', change.doc.data())
                groupArray.push(change.doc.data())
            }
            if (change.type == 'modified'){
                console.log('Modified Group: ', change.doc.data())
            }
            if (change.type == 'removed'){
                console.log('Removed Group', change.doc.data())
            }
            setGroups(groupArray)
        })
    })
}

function showSkeletonView(){
    return(
        <View style = {{height:'50%', width:'100%'}}>
            <LottieView source = {require('../../assets/skeleton-loader.json')} autoPlay loop>
            </LottieView>
         </View>
    )
}   

function showGroupsView(){

    return (
        <View style={styles.container}>
            <FlatList 
                data = {groups}
                keyExtractor = {(item, index) => 'key' + index}
                renderItem = {({item}) => {
                    return (
                        <TouchableOpacity onPress = {() => {
                            navigation.navigate('Chat Screen', {
                                item
                            })
                        }}>
                        <GroupsItem item={item}></GroupsItem>
                        </TouchableOpacity>
                    )
                }}>
                
            </FlatList>

        </View>
    )}
    return  (
            isDataLoaded ? showGroupsView() : showSkeletonView() 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebeb'
    },
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default GroupScreen