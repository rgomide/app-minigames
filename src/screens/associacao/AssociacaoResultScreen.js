import React, { useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import confeteGif from '../../img/confete.gif'
import vitoriaIcon from '../../img/vitoriaIcon.png'
import derrotaIcon from '../../img/derrotaIcon.png'
import { playWinGameSound, playLoseGameSound } from '../../services/util/audio'

const AssociacaoResultScreen = ({ route, navigation }) => {
  const { finalScore } = route.params
  const displayScore = finalScore < 0 ? 0 : finalScore

  useEffect(() => {
    if (displayScore > 0) {
      playWinGameSound()
    } else {
      playLoseGameSound()
    }
  }, [displayScore])

  return (
    <ScrollView contentContainerStyle={styles.endScreenContainer}>
      {displayScore > 0 && (
        <View style={styles.resultContainer}>
          <Image source={vitoriaIcon} style={styles.resultadoIcone} />
          <View style={styles.confettiWrapper}>
            <Image source={confeteGif} style={styles.confettiGif} />
            <Text style={styles.quizResultTitleVitoria}>Você ganhou!</Text>
            <Image source={confeteGif} style={styles.confettiGif} />
          </View>
        </View>
      )}

      {displayScore === 0 && (
        <View style={styles.resultContainer}>
          <Image source={derrotaIcon} style={styles.resultadoIcone} />
          <Text style={styles.quizResultTitleDerrota}>Você perdeu!</Text>
        </View>
      )}

      <Text style={styles.pontuacao}>Pontuação Final: {displayScore}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonJogarNovamente]}
          onPress={() => navigation.navigate('AssociacaoStartScreen')}
        >
          <Text style={styles.buttonText}>Jogar Novamente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVoltarInicio]}
          onPress={() => navigation.navigate('MainMenuScreen')}
        >
          <Text style={styles.buttonText}>Voltar ao início</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  endScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    backgroundColor: '#F2E8DF',
    paddingHorizontal: 20
  },
  resultContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20
  },
  resultadoIcone: {
    width: 260,
    height: 150,
    resizeMode: 'contain'
  },
  confettiWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  confettiGif: {
    width: 70,
    height: 70
  },
  quizResultTitleVitoria: {
    fontSize: 36,
    color: '#4caf50',
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginHorizontal: 10
  },
  quizResultTitleDerrota: {
    fontSize: 36,
    color: '#f44336',
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginVertical: 20
  },
  pontuacao: {
    fontSize: 24,
    color: '#333',
    marginBottom: 15,
    fontFamily: 'Poppins'
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
    width: '100%'
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonJogarNovamente: {
    backgroundColor: '#4caf50',
    marginBottom: 15
  },
  buttonVoltarInicio: {
    backgroundColor: '#f44336'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontFamily: 'Poppins'
  }
})

export default AssociacaoResultScreen
