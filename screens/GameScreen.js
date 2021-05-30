import React, {useState, useRef, useEffect} from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rdmNum = Math.floor(Math.random() * (max-min) + min)

    if (rdmNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    }
    return rdmNum
}


const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoise))

    const [rounds, setRounds] = useState(0)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoise, onGameOver} = props

    useEffect( () => {
        if (currentGuess == userChoise) {
            onGameOver(rounds)
        }
    }, [currentGuess, userChoise, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction == 'lower' && currentGuess < props.userChoise) || (direction == 'greater' && currentGuess > props.userChoise)) {
            Alert.alert("Don't lie you little bastard", "You know that this is wrong...", [{text: ' sorry', style: "cancel"}])
            return
        }
        if (direction == 'lower') {
            currentHigh.current = currentGuess
        }else {
            currentLow.current = currentGuess
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setRounds( currentRounds => currentRounds+1)   
    }

    return(
        <View style={styles.screen} >
            <Text>Opponent's guess</Text>
            <NumberContainer> {currentGuess} </NumberContainer>
            <Card style={ styles.buttonContainer}>
                <Button title="LOWER" onPress={ nextGuessHandler.bind (this, 'lower')} />
                <Button title="GREATER" onPress={ nextGuessHandler.bind (this, 'greater')} />
                
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
})

export default GameScreen