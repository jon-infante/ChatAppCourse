import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Alert} from 'react-native'
import CustomTextField from '../components/CustomTextField'
import Button from '../components/Button'
import Color from '../utils/Colors'
import Strings from '../const/String'
import Utility from '../utils/Utility'
import firebase, { firestore } from '../firebase/Firebase'
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme'


function AddGroupScreen({navigation}){

    const [groupName, setGroupName] = useState('')
    const [fieldError, setFieldError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    validateField = () => {
        const isValidField = Utility.isValidField(groupName)
        isValidField ? setFieldError('') : setFieldError(Strings.GroupNameEmpty)
        return isValidField
    }

    function createGroupToFirebase() {
        setIsLoading(true)
        const groupsRef = firestore.collection('groups').doc()
        const userID = firebase.auth().currentUser.uid
        const data = {
            groupID: groupsRef.id,
            groupName: groupName,
            userID: userID
        }

        groupsRef.set(data).then((docRef) => {
            setIsLoading(false)
            console.log('Document written with ID:', groupsRef.id)
            addMembersOfChatToFirebase(groupsRef.id, userID)
        }).catch((error) => {
            Alert.alert(error.message)  
            setIsLoading(false)
            console.error('Error adding document: ', error)
        })
    }

    function addMembersOfChatToFirebase(groupId, userID){
        const membersRef = firestore.collection('members').doc(groupId).collection('member').doc()
        membersRef.set({
            userID: userID
        }).then(function(docRef){
            navigation.goBack()
        }).catch(function(error){
            setIsLoading(false)
            console.log("Error adding document: ", error)
        })
    }

    performCreateGroup = () => {
        const isValidField = validateField()
        if (isValidField){
            createGroupToFirebase()
        }
    }


    return (
        <View style={styles.container}>
            <CustomTextField
                term = {groupName}
                error = {fieldError}
                placeHolder = {Strings.EnterYourGroupName} 
                onTermChange = {newGroupName => setGroupName(newGroupName)}
                onValidateTextField = {validateField}
                />

                <Button title = {Strings.CreateGroup} onPress= {performCreateGroup} isLoading = {isLoading}/>
        </View>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AddGroupScreen