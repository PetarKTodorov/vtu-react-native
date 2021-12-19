import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import MainNavigation from '../../main-navigation';
import FormButton from '../../ui/form-button';

import { firebase } from '@react-native-firebase/database';

import { getRandomInt } from '../../../constants/functions';
import styles from './styles';

function PlayGame(props) {
    const [questions, setQuestions] = useState([]);
    const [game, setGame] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        if (questions.length === 0) {
            getQuestions();
        }
    }, [questions]);

    useEffect(() => {
        if (game === null) {
            getGame();
        }
    }, [game]);

    const getQuestions = () => {
        const database = firebase
            .app()
            .database('https://gettoknowusdatabase-default-rtdb.europe-west1.firebasedatabase.app')
            .ref('questions');

        database.on('value', snapshot => {
            const questions = Object.values(snapshot.val());

            setQuestions(questions);
        });
    }

    const getGame = () => {
        const database = firebase
            .app()
            .database('https://gettoknowusdatabase-default-rtdb.europe-west1.firebasedatabase.app')
            .ref('games/' + props.currentGameId);

        database.on('value', snapshot => {
            const game = snapshot.val();

            const gameParticipants = game.participants.split(', ');

            setParticipants(gameParticipants);
            setGame(game);
        });

    }

    const getRandomQuestion = () => {
        if (questions.length === 0) {
            return;
        }

        const randomIndex = getRandomInt(0, questions.length);

        const question = questions[randomIndex].title;

        return question;
    }

    const getRandomParticipant = () => {
        if (participants.length === 0) {
            return;
        }

        const randomIndex = getRandomInt(0, participants.length);

        const participant = participants[randomIndex];

        return participant;
    }

    const next = () => {
        setReload(!reload);
    }

    return (
        <>
            <MainNavigation navigation={props.navigation} userId={props.userId} setUserId={props.setUserId} />
            <View style={styles.container}>
                <Text style={styles.title}>{game?.name}</Text>

                <Text style={styles.question}>{getRandomQuestion()}</Text>

                <Text style={styles.answer}>Answer</Text>
                <Text style={styles.participant}>{getRandomParticipant()}</Text>
            </View>

            <FormButton
                buttonText='Next'
                onPressFunc={next}
            />
        </>
    );

}

export default PlayGame;
