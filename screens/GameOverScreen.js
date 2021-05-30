import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const GameOver = props => {

    return(
        <View style={StyleSheet.screen}>
            <Text> The Game is Over!</Text>
            <Text> Number of rounds: {props.roundsNumber} </Text>
            <Text> The number was: {props.userNumber} </Text>
            <Button title="New game" onPress={ props.onRestart} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default GameOver