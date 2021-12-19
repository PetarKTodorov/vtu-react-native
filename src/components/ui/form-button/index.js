import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import PropTypes from 'prop-types';

import styles from './styles';

function FormButton(props) {

    const buttonContainerStyles = { ...styles.container, ...props.buttonContainerClass };

    return (
        <View style={buttonContainerStyles}>
            <TouchableOpacity
                style={styles.button}
                onPress={props.onPressFunc}>
                <Text>{props.buttonText}</Text>
            </TouchableOpacity>
        </View>
    )
}

FormButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    onPressFunc: PropTypes.func.isRequired,
    buttonContainerClass: PropTypes.object,
};

export default FormButton;