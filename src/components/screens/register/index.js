import React, { useState } from 'react';
import { View, Text } from 'react-native';

import FormField from '../../ui/form-field';
import FormButton from '../../ui/form-button';

import auth from '@react-native-firebase/auth';

import screens from '../../../constants/screens';
import styles from './styles';

const PASSWORDS_ERROR = "Password and Confirm password fields must match.";
const CAN_NOT_BE_EMPTY = "Can not be empty";
const INVALID_EMAIL_ERROR = "That email address is invalid!";
const USED_EMAIL_ERROR = "That email address is already in use!";
const WEEK_PASSWORD_ERROR = "Password is too week";

function Register(props) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const onLoginLinkPress = () => {
        props.navigation.navigate(screens.login);
    }

    const onRegisterPress = () => {
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');

        if (email == '') {
            setEmailError(CAN_NOT_BE_EMPTY);

            return;
        } else if (password == '') {
            setPasswordError(CAN_NOT_BE_EMPTY);

            return;
        } else if (confirmPassword == '') {
            setConfirmPasswordError(CAN_NOT_BE_EMPTY);

            return;
        }

        if (password != confirmPassword) {
            setConfirmPasswordError(PASSWORDS_ERROR);
            setPasswordError(PASSWORDS_ERROR);

            return;
        }

        createUser(email, password);
    }

    const createUser = async (email, password) => {
        try {
            let response = await auth().createUserWithEmailAndPassword(email, password);

            if (response) {
                props.navigation.navigate(screens.login);
            }

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setEmailError(USED_EMAIL_ERROR);
            }

            if (error.code === 'auth/invalid-email') {
                setEmailError(INVALID_EMAIL_ERROR);
            }

            if (error.code === 'auth/weak-password') {
                setPasswordError(WEEK_PASSWORD_ERROR);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <View style={styles.form}>
                <FormField
                    labelName="Email"
                    inputValue={email}
                    onChangeInput={setEmail}
                    inputError={emailError}
                />

                <FormField
                    labelName='Password'
                    inputValue={password}
                    onChangeInput={setPassword}
                    inputError={passwordError}
                    isPasswordField={true}
                />

                <FormField
                    labelName='Confirm Password'
                    inputValue={confirmPassword}
                    onChangeInput={setConfirmPassword}
                    inputError={confirmPasswordError}
                    isPasswordField={true}
                />

                <FormButton
                    buttonText='Register'
                    onPressFunc={onRegisterPress}
                />
            </View>

            <View>
                <Text>Already got an account? <Text onPress={onLoginLinkPress} style={styles.link}>Login</Text> </Text>
            </View>
        </View>
    )
}

export default Register;