import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%'
    },
    gameName: {
        fontSize: 24,
        textAlign: 'center',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        marginTop: 10
    },
    button: {
        flex: 1,
        marginBottom: 0,
        margin: 5,
    },
    deleteButton: {
        backgroundColor: 'red'
    }
});