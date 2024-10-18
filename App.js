import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';
import ChesBoard from './ChesBoard';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ChesBoard/>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
