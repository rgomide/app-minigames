import React, { useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import confeteGif from '../../img/confete.gif'
import vitoriaIcon from '../../img/vitoriaIcon.png'
import derrotaIcon from '../../img/derrotaIcon.png'
import { playWinGameSound, playLoseGameSound } from '../../services/util/audio'

const AnagramaResultScreen = ({ route, navigation }) => {
  const { pontuacao } = route.params

  useEffect(() => {
    if (pontuacao > 0) {
      playWinGameSound()
    } else {
      playLoseGameSound()
    }
  }, [pontuacao])

  return (
    <ScrollView contentContainerStyle={styles.endScreenContainer}>
      {pontuacao > 0 && (
        <View>
          <Image source={vitoriaIcon} style={styles.resultadoIcone} />
        </View>
      )}
      {pontuacao > 0 && (
        <View style={styles.confettiWrapper}>
          <Image source={confeteGif} style={styles.confettiGif} />
          <Text style={[styles.resultTitle, styles.resultTitleVitoria]}>Você ganhou!</Text>
          <Image source={confeteGif} style={styles.confettiGif} />
        </View>
      )}

      {pontuacao === 0 && (
        <View>
          <Image source={derrotaIcon} style={styles.resultadoIcone} />
          <Text style={[styles.resultTitle, styles.resultTitleDerrota]}>Você perdeu!</Text>
        </View>
      )}

      <Text style={styles.pontuacao}>Pontuação Final: {pontuacao}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonJogarNovamente]}
          onPress={() => navigation.navigate('AnagramaStartScreen')}
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
    textAlign: 'center',
    gap: 20,
    paddingHorizontal: 20
  },
  resultadoIcone: {
    width: 260,
    height: 150,
    resizeMode: 'contain'
  },
  confettiWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  confettiGif: {
    width: 70,
    height: 70
  },
  resultTitle: {
    fontSize: 36,
    fontFamily: 'Poppins',
    textAlign: 'center'
  },
  resultTitleDerrota: {
    color: '#f44336'
  },
  resultTitleVitoria: {
    color: '#4caf50',
    marginHorizontal: 10
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

export default AnagramaResultScreen
