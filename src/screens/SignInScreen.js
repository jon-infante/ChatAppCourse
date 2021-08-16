import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, Alert, SafeAreaView, Image, KeyboardAvoidingView} from 'react-native'
import Button from '../components/Button'
import EmailTextField from '../components/EmailTextField'
import Color from '../utils/Colors'
import DismissKeyboard from '../components/DismissKeyboard'
import Utility from '../utils/Utility'
import PasswordtextField from '../components/PasswordTextField'
import Strings from '../const/String'
import Images from '../const/Images'
import Constants from '../const/Constants'
import firebase from '../firebase/Firebase'
import { CommonActions } from '@react-navigation/native'


function SignInScreen({navigation}){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState('')

    validateEmailAddress = () => {
        const isValidEmail = Utility.isEmailValid(email)
        isValidEmail ? setEmailError('') : setEmailError(Strings.InvalidEmailAddress)
        return isValidEmail
    }

    validatePasswordField = () => {
        const isValidField = Utility.isValidField(password)
        isValidField ? setPasswordError(''): setPasswordError(Strings.PasswordFieldEmpty)
        return isValidField
    }

    performAuth = () => {
        const isValidEmail = validateEmailAddress()
        const isValidPassword = validatePasswordField()

        if(isValidEmail && isValidPassword){
            setEmailError('')
            setPasswordError('')
            registration(email, password)
        }
    }

    registration = (email, password) => {
        try{
            setIsLoading(true)
            
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                setIsLoading(false)
                    // Alert.alert('Logged In')
                    navigation.dispatch(
                        CommonActions.reset({
                        index: 0,
                        routes: [{name: 'Group Screen'}]
                    }))
            }).catch((error) => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => {
                        setIsLoading(false)
                        // Alert.alert('Created a New User')
                        navigation.dispatch(
                            CommonActions.reset({
                            index: 0,
                            routes: [{name: 'Group Screen'}]
                        }))
                }).catch((error) => {
                    setIsLoading(false)
                    console.log(error.message)
                    Alert.alert(error.message)
                })
            })
        }
        catch(error){ // except
            setIsLoading(false)
            // Alert.alert(error.message)

        }
    }


    return (
    <DismissKeyboard>
        <KeyboardAvoidingView style = {styles.container} behavior= "height" enabled>
            <View>
            <SafeAreaView>
                <Image style = {styles.logo} source= {Images.logo}></Image>

                <EmailTextField
                    term = {email}
                    error = {emailError}
                    placeHolder = {Strings.EmailPlaceHolder}
                    onTermChange = {newEmail => setEmail(newEmail)}
                    onValidateEmailAddress = {validateEmailAddress}
                />
                <PasswordtextField
                    term= {password}
                    error = {passwordError}
                    placeHolder = {Strings.PasswordPlaceholder}
                    onTermChange = {newPassword => setPassword(newPassword)}
                    onValidatePasswordField = {validatePasswordField}
                />
                <Button title = {Strings.Join} onPress = {performAuth} isLoading = {isLoading}/>
            </SafeAreaView>
            </View>

        </KeyboardAvoidingView>

    </DismissKeyboard> 
   
)};

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        margin: 0.05 * Constants.screenHeight,
        width: Constants.screenHeight * 0.3,
        height: Constants.screenWidth * 0.3
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.charcoal,
    }
})

export default SignInScreen