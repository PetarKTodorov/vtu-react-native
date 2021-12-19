import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { firebase } from '@react-native-firebase/database';

import MainNavigation from '../../main-navigation';
import GameCard from '../../game-card';

import screens from '../../../constants/screens';
import styles from './styles';

function MyGames(props) {
    const [userGames, setUserGames] = useState([]);

    useEffect(() => {
        if (userGames.length === 0) {
            getUserGames();
        }

    }, [userGames]);

    const getUserGames = () => {
        const database = firebase
            .app()
            .database('https://gettoknowusdatabase-default-rtdb.europe-west1.firebasedatabase.app')
            .ref('games');

        database.on('value', snapshot => {
            const userGames = Object.values(snapshot.val()).filter(game => game.userId === props.userId);

            setUserGames(userGames);
        });
    }

    const deleteGame = async (gameId) => {
        try {
            const database = await firebase
                .app()
                .database('https://gettoknowusdatabase-default-rtdb.europe-west1.firebasedatabase.app')
                .ref(`/games/${gameId}`).remove();
        } catch (error) {
            console.log(error);
        }
    }

    const onPlayPress = (gameId) => {
        props.setCurrentGameId(gameId);

        props.navigation.navigate(screens.playGame);
    }

    return (
        <>
            <MainNavigation navigation={props.navigation} userId={props.userId} setUserId={props.setUserId} />
            <View style={styles.container}>
                <Text style={styles.title}>My Games</Text>

                <ScrollView style={styles.scrollContainer}>
                {
                    userGames.map(game => {
                        return (
                            <GameCard
                                key={game.id}
                                gameName={game.name}
                                gameParticipants={game.participants}
                                onDelete={() => deleteGame(game.id)}
                                onPlay={() => onPlayPress(game.id)}
                            />
                        )
                    })
                }
                </ScrollView>
            </View>
        </>
    );

}

export default MyGames;
