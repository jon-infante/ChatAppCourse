import React, {useLayoutEffect, useState, useEffect} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import ButtonWithBackground from '../components/ButtonWithBackground'
import Images from '../const/Images'

function GroupScreen({navigation}){

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
              
                }}
                image = {Images.logout}
                />
            )
        })
    })

return (
    <View style={styles.container}>
        <Text style={styles.text}>Group Screen</Text>

    </View>
)};

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