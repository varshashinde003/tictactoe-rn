import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, Picker, TouchableOpacity } from 'react-native';

import styles from "../AppCss";

export default class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: null,
            isGameEnded: false,
            winner: null,
            resultToBeDeclared: "",
            board: (new Array(9)).fill(""),
            counter: 0,
            playerSelected: null
        }
        this.selectPlayer = this.selectPlayer.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.checkWinner = this.checkWinner.bind(this);
        this.restartGame = this.restartGame.bind(this);
    }


    selectPlayer(player) {
        this.setState({
            player: player,
            playerSelected: player
        })
    }

    handleClick(index) {
        if (!this.state.board[index] && !this.state.winner) {
            let newBoard = this.state.board;
            newBoard[index] = this.state.player;
            this.setState({
                ...this.state,
                board: newBoard,
                player: this.state.player === "X" ? "O" : "X",
                counter: this.state.counter + 1,
            });
            const result = this.checkWinner()
            if (result === "X") {
                this.setState({
                    isGameEnded: true,
                    winner: "X",
                    resultToBeDeclared: "Match Won By X",
                })
            } else if (result === "O") {
                this.setState({
                    isGameEnded: true,
                    winner: "O",
                    resultToBeDeclared: "Match Won By O",
                })
            } else if (result === "draw") {
                this.setState({
                    isGameEnded: true,
                    winner: "DRAW",
                    resultToBeDeclared: "Game is Drawn",
                })
            }
        }
    }

    checkWinner() {
        const moves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        const { board, counter } = this.state;
        for (let i = 0; i < moves.length; i++) {
            if (board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]]) {
                return board[moves[i][2]];
            } else if (counter === 9) {
                return "draw";
            }
        }

    }

    restartGame() {
        this.setState({
            player: null,
            isGameEnded: false,
            winner: null,
            resultToBeDeclared: "",
            board: (new Array(9)).fill(""),
            counter: 0
        })
    }


    render() {
        const { resultToBeDeclared, winner, player, playerSelected } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.head}>
                    TIC-TAC-TOE BY VARSHA
              </Text>

                {!player ? <Player onChange={this.selectPlayer} player={player} /> : <Text>You have selected Player: {playerSelected}</Text>}

                {resultToBeDeclared || false ? <Text style={styles.result}>{resultToBeDeclared}</Text> : <Text></Text>}

                {player ? <ShowBoard board={this.state.board} onClick={this.handleClick} restartGame={this.restartGame} winner={winner} player={player} /> : <Text></Text>}
            </View>
        );
    }
}

const ShowBoard = props => {
    const { winner, board, onClick, restartGame, player } = props;
    return (
        <>
            {winner ? <Text></Text> : <Text style={styles.nextPlayer}>Next Player is {player} </Text>}
            <View style={styles.board}>
                {board.map((item, index) => <TouchableOpacity onPress={() => onClick(index)} key={index} style={styles.square}>
                    <Text style={styles.buttonText}>{item}</Text>
                </TouchableOpacity>)}
            </View>
            <View style={styles.footer}>
                <Button title="Restart" disabled={!winner || winner === "DRAW"} onPress={restartGame} />
            </View>
        </>
    )
}


class Player extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.setPlayer = this.setPlayer.bind(this);
        this.state = {
            player: "X"
        }
    }
    handleChange() {
        this.props.onChange(this.state.player)
    }
    setPlayer(value) {
        this.setState({
            player: value,
        })
    }
    render() {
        return (
            <>
                <Picker selectedValue={this.state.player} style={styles.selectPlayerBox} onValueChange={this.setPlayer}>
                    <Picker.Item label="Player X" value="X" />
                    <Picker.Item label="Player O" value="O" />
                </Picker>
                <Button title="Start" onPress={this.handleChange} />
            </>
        )
    }
}
