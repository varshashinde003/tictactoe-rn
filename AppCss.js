import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    head: {
        padding: 10,
        fontSize: 24,
    },
    selectPlayerBox: {
        height: 50,
        width: "80%"
    },
    board: {
        flexDirection: 'row', width: 150, height: 150, flexWrap: 'wrap', marginTop: 30
    },
    square: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#000',
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 50
    },
    footer: {
        marginTop: 30
    },
    result: {
        marginTop: 20
    },
    nextPlayer: {
        marginBottom: 30
    }
});      

module.exports = styles;