import React, {useEffect} from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import Color from '../utils/Colors'
import Images from '../const/Images'
import Constants from '../const/Constants'
import firebase from '../firebase/Firebase'
import LottieView from 'lottie-react-native'


function SplashScreen({navigation}){
    useEffect(() => {
        NavigateToAuthORGroupScreen()
    }, [navigation])

    function NavigateToAuthORGroupScreen(){

        setTimeout(function () {
            firebase.auth().onAuthStateChanged((user) => {
                if (user != null){
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Group Screen'}]
                    })
                }else{
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'SignInScreen'}]
                    })
                }
            })
        },1000)
    }


    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={Images.logo}></Image>

            <View style = {styles.lottieView}>
                <LottieView source = {require('../../assets/working.json')} autoPlay loop>

                </LottieView>
            </View>
        </View>
    )
}


const styles  = StyleSheet.create({
    lottieView: {
        width: '100%',
        height: 0.6 * Constants.screenHeight
    },
    logo: {
        alignSelf: 'center',
        margin: 0.1 * Constants.screenHeight,
        height: 0.4 * Constants.screenHeight

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.theme
    }
})

export default SplashScreen