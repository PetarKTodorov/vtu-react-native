import React from 'react';
import { Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

function FormField(props) {
    
    const error = props.inputError == '' ? null : (<Text style={styles.error}>{props.inputError}</Text>);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.labelName}</Text>
            <TextInput
                style={styles.input}
                onChangeText={props.onChangeInput}
                value={props.inputValue}
                secureTextEntry={props.isPasswordField}
            />
            {error}
        </View>
    )
}

FormField.propTypes = {
    labelName: PropTypes.string.isRequired,
    inputValue: PropTypes.any.isRequired,
    onChangeInput: PropTypes.func.isRequired,
    inputError: PropTypes.string,
    isPasswordField: PropTypes.bool,
};

export default FormField;