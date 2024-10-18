import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Chessboard from 'react-native-chessboard';
import { Chess } from 'chess.js';

export default function ChesBoard() {
  const [game, setGame] = useState(new Chess());
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const safeGameMutate = (modify) => {
    const updatedGame = { ...game };
    modify(updatedGame);
    setGame(updatedGame);
  };

  // Function for computer to make random moves
  const makeRandomMove = () => {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
      setGameOver(true);
      const winner = game.turn() === 'w' ? 'Black' : 'White';
      setWinner(winner);
      return;
    }
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  };
  const onMove = (sourceSquare, targetSquare) => {
    console.log("Source:", sourceSquare, "Target:", targetSquare);  // Should log the simple square names like "d2" and "d3"
  
    try {
      const move = game.move({
        from: sourceSquare,  // This should be something like "d2"
        to: targetSquare,    // This should be something like "d3"
        promotion: 'q',      // Always promote to a queen
      });
  
      if (!move) {
        console.log("Invalid move");
        return;
      }
  
      setTimeout(makeRandomMove, 500);  // Delay for computer's random move
    } catch (error) {
      console.error("Move error:", error);
    }
  };
  
  // Reset the game
  const resetGame = () => {
    setGame(new Chess());
    setGameOver(false);
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <Chessboard onMove={onMove} />
      {gameOver && (
        <View style={styles.overlay}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <Text style={styles.winnerText}>Winner: {winner}</Text>
          <TouchableOpacity onPress={resetGame} style={styles.button}>
            <Text style={styles.buttonText}>Restart Game</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16213e',
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -150 }],
    width: 300,
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  gameOverText: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 10,
  },
  winnerText: {
    color: '#e94560',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e94560',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
