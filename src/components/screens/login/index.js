import React, { useState } from 'react';
import { View, Text } from 'react-native';

import FormField from '../../ui/form-field';
import FormButton from '../../ui/form-button';

import auth from "@react-native-firebase/auth"

import screens from '../../../constants/screens';
import styles from './styles';

const CAN_NOT_BE_EMPTY = "Can not be empty";
const INVALID_CREDENTIALS = "Invalid credentials!";

function Login(props) {
    const [email, setEmail] = useState('123456@abv.bg');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('123456');
    const [passwordError, setPasswordError] = useState('');

    const onRegisterLinkPress = () => {
        props.navigation.navigate(screens.register);
    }

    const onLoginPress = () => {
        setEmailError('');
        setPasswordError('');

        if (email == '') {
            setEmailError(CAN_NOT_BE_EMPTY);

            return;
        } else if (password == '') {
            setPasswordError(CAN_NOT_BE_EMPTY);

            return;
        }

        loginUser(email, password);
    }

    const loginUser = async (email, password) => {
        try {
            let response = await auth().signInWithEmailAndPassword(email, password);

            if (response && response.user) {
                props.setUserId(response.user.uid);
            }
        } catch (error) {
            if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                setEmailError(INVALID_CREDENTIALS);
                setPasswordError(INVALID_CREDENTIALS);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

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

                <FormButton
                    buttonText='Login'
                    onPressFunc={onLoginPress}
                />
            </View>

            <View>
                <Text>Does not have an account? <Text onPress={onRegisterLinkPress} style={styles.link}>Register</Text> </Text>
            </View>
        </View>
    );

}

export default Login;
