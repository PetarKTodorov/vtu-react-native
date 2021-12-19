import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { firebase } from '@react-native-firebase/database';

import screens from '../../constants/screens';
import styles from './styles';

function MainNavigation(props) {

    const onLogoutLinkPress = async () => {
        try {
            await firebase.auth().signOut();

            props.setUserId('');
        } catch (error) {
            console.log(error);
        }
    }

    const onCreateNewGameLinkPress = () => {
        props.navigation.navigate(screens.createGame);
    }

    const onMyGamesLinkPress = () => {
        props.navigation.navigate(screens.myGames);
    }

    return (
        <View style={styles.container}>
            <View style={styles.miniContainer}>
                <Text style={styles.link} onPress={onMyGamesLinkPress}>My Games</Text>
                <Text style={styles.link} onPress={onCreateNewGameLinkPress}>Create Game</Text>
            </View>

            <Text style={styles.link} onPress={onLogoutLinkPress}>Logout</Text>
        </View>
    );

}

MainNavigation.propTypes = {
    navigation: PropTypes.object,
    setUserId: PropTypes.func,
};

export default MainNavigation;
