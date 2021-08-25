import React from 'react'
import {TextInput, Text, StyleSheet, View, Button} from 'react-native'
import Color from '../utils/Colors'
import Constants from '../const/Constants'
import Strings from '../const/String'

const MessageFieldView = ({item, placeHolder, onTermChange, onValidateTextField, error, onSubmit, isJoined, term}) => {
    return (
        <View style = {styles.containterView}>
            <View style={styles.fieldView}>
                <TextInput
                    autoCorrect = {false}
                    style = {styles.textField}
                    placeHolder = {placeHolder}
                    value = {term}
                    onChangeText = {onTermChange}
                    onEndEditing = {onValidateTextField}
                />
                <Button title = {Strings.Send} color = {Color.uaStudiosGreen} onPress = {onSubmit}

                />

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    containterView: {
        backgroundColor: Color.white,
        width: Constants.screenWidth, 
        flex: 1,
        justifyContent: 'space-between'
    },
    fieldView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Color.uaStudiosGreen
    },
    textField: {
        fontSize: 15,
        flex: 1,
        marginRight: 10,
        paddingLeft: 10,
        width: '75%',
        borderColor: Color.gray,
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: Color.smoke
    },
    Button: {
        flex: 1,
        alignSelf: 'center',
        width: '25%',
        height: '100%'
    }

    }
)

export default MessageFieldView