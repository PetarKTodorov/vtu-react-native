import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import FormButton from '../ui/form-button';

import styles from './styles';

function GameCard(props) {

    return (
        <View style={styles.container}>
            <Text style={styles.gameName}>{props.gameName}</Text>
            <Text>Participants: {props.gameParticipants}</Text>
            <View style={styles.buttonContainer}>
                <FormButton 
                    buttonContainerClass={styles.button} 
                    buttonText='Play' 
                    onPressFunc={props.onPlay} 
                />
                <FormButton 
                    buttonContainerClass={{...styles.button, ...styles.deleteButton}} 
                    buttonText='Delete' 
                    onPressFunc={props.onDelete} 
                />
            </View>
        </View>
    );

}

GameCard.propTypes = {
    gameName: PropTypes.string,
    gameParticipants: PropTypes.string,
    onPlay: PropTypes.func,
    onDelete: PropTypes.func
};

export default GameCard;
