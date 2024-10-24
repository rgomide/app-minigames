import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { playWinGameSound, playLoseGameSound } from '../../services/util/audio';

const derrotaIcon = require('../../img/derrotaIcon.png')
const confeteGif = require('../../img/confete.gif')
const vitoriaIcon = require('../../img/vitoriaIcon.png')

const ForcaEndScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { resultado, pontuacao } = route.params;

  useEffect(() => {
    if (resultado === 'ganhou') {
      playWinGameSound();
    } else if (resultado === 'perdeu') {
      playLoseGameSound();
    }
  }, [resultado]);

  return (
    <ScrollView contentContainerStyle={styles.endScreenContainer}>

      {resultado === 'ganhou' && (
        <View><Image source={vitoriaIcon} alt="Vitória" style={styles.resultadoIcone} /></View>
      )}
      {resultado === 'ganhou' && (
        <View style={styles.confettiWrapper}>
          <Image source={confeteGif} alt="Confete" style={styles.confettiGif} />
          <Text style={[styles.quizResultTitle, styles.quizResultTitleVitoria]}>Você ganhou!</Text>
          <Image source={confeteGif} alt="Confete" style={styles.confettiGif} />

        </View>
      )}

      {resultado === 'perdeu' && (
        <View>
          <Image source={derrotaIcon} alt="Derrota" style={styles.resultadoIcone} />
          <Text style={[styles.quizResultTitle, styles.quizResultTitleDerrota]}>Você perdeu!</Text>
        </View>
      )}

      <Text style={styles.pontuacao}>Pontuação Final: {pontuacao}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonJogarNovamente]}
          onPress={() => navigation.navigate('ForcaStartScreen')}
        >
          <Text style={styles.buttonTextJogarNovamente}>
            Jogar Novamente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVoltarInicio]}
          onPress={() => navigation.navigate('MainMenuScreen')}
        >
          <Text style={styles.buttonTextInicio}>
            Voltar ao início
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  endScreenContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    backgroundColor: '#F2E8DF',
    textAlign: 'center',
    gap: 20,
    paddingHorizontal: 20
  },
  confettiWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  confettiGif: {
    width: 70,
    height: 70
  },
  resultadoIcone: {
    width: 260,
    height: 150,
    objectFit: 'contain'
  },
  quizResultTitleDerrota: {
    color: '#f44336',
  },
  quizResultTitleVitoria: {
    color: '#4caf50',
  },
  quizResultTitle: {
    fontSize: 36,
    fontFamily: 'Fredoka',
    textAlign: 'center'
  },
  pontuacao: {
    fontSize: 24,
    color: '#333',
    marginBottom: 15,
    fontFamily: 'Fredoka',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    textAlign: 'center',
    width: '100%',
    cursor: 'pointer',
    border: 'none',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    width: '100%'
  },
  buttonJogarNovamente: {
    backgroundColor: '#4caf50',
  },
  buttonVoltarInicio: {
    backgroundColor: '#f44336',
  },
  buttonTextJogarNovamente: {
    color: 'white',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontFamily: 'Fredoka',
  },
  buttonTextInicio: {
    color: 'white',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontFamily: 'Fredoka',
  }
})

export default ForcaEndScreen;
