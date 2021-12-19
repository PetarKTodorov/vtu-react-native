import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { firebase } from '@react-native-firebase/database';

import FormField from '../../ui/form-field';
import FormButton from '../../ui/form-button';
import MainNavigation from '../../main-navigation';

import screens from '../../../constants/screens';
import styles from './styles';

const CAN_NOT_BE_EMPTY = "Can not be empty";

function CreateGame(props) {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [participants, setParticipants] = useState('');
    const [participantsError, setParticipantsError] = useState('');

    const onCreatePress = () => {
        setNameError('');
        setParticipantsError('');

        if (name == '') {
            setNameError(CAN_NOT_BE_EMPTY);

            return;
        } else if (participants == '') {
            setParticipantsError(CAN_NOT_BE_EMPTY);

            return;
        }

        createGame(name, participants);
    }

    const createGame = async (name, participants) => {
        try {
            var myRef = firebase.database().ref('games/');

            const key = await myRef.push().key;

            const newGame = {
                id: key,
                name,
                participants,
                userId: props.userId
            };

            await myRef.child(key).set(newGame);

            props.navigation.navigate(screens.myGames);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <MainNavigation navigation={props.navigation} userId={props.userId} setUserId={props.setUserId} />
            <View style={styles.container}>
                <Text style={styles.title}>Create Game</Text>

                <View style={styles.form}>
                    <FormField
                        labelName="Name"
                        inputValue={name}
                        onChangeInput={setName}
                        inputError={nameError}
                    />

                    <FormField
                        labelName='Participants'
                        inputValue={participants}
                        onChangeInput={setParticipants}
                        inputError={participantsError}
                    />

                    <FormButton
                        buttonText='Create'
                        onPressFunc={onCreatePress}
                    />
                </View>
            </View>
        </>
    )
}

export default CreateGame;