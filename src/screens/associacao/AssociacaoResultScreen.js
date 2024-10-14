import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const AssociacaoResultScreen = ({ route, navigation }) => {
  const { finalScore } = route.params

  const displayScore = finalScore < 0 ? 0 : finalScore

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Você concluiu o jogo!</Text>
      <Text style={styles.score}>Pontuação final: {displayScore}</Text>

      <Button title="Jogar Novamente" onPress={() => navigation.navigate('AssociacaoStartScreen')} />
      <Button title="Voltar ao início" onPress={() => navigation.navigate('MainMenuScreen')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
  },
})

export default AssociacaoResultScreen