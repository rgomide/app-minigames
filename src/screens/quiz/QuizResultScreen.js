import QuizResultCard from '../../components/quiz/QuizResultCard'
import React, { useEffect } from 'react'
import confeteGif from '../../img/confete.gif'
import vitoriaIcon from '../../img/vitoriaIcon.png'
import derrotaIcon from '../../img/derrotaIcon.png'
import { playWinGameSound, playLoseGameSound } from '../../services/util/audio'
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'

const QuizResultScreen = (props) => {
  const {
    navigation,
    route: {
      params: { topic, answers, questions }
    }
  } = props

  const totalCorrectAnswers = answers.reduce((acc, answer) => {
    return answer.correct ? acc + 1 : acc
  }, 0)

  const totalCorrectAnswerTitle =
    totalCorrectAnswers === 1 ? 'resposta correta' : 'respostas corretas'

  const score = Math.floor(totalCorrectAnswers * (100 / questions.length))

  useEffect(() => {
    if (totalCorrectAnswers > 0) {
      playWinGameSound()
    } else if (totalCorrectAnswers < 1) {
      playLoseGameSound()
    }
  }, [totalCorrectAnswers])

  return (
    <ScrollView contentContainerStyle={styles.endScreenContainer}>
      {totalCorrectAnswers > 0 && (
        <View>
          <Image source={vitoriaIcon} alt="Vitória" style={styles.resultadoIcone} />
        </View>
      )}

      {totalCorrectAnswers > 0 && (
        <View style={styles.confettiWrapper}>
          <Image source={confeteGif} alt="Confete" style={styles.confettiGif} />
          <Text style={[styles.quizResultTitle, styles.quizResultTitleVitoria]}>Você ganhou!</Text>
          <Image source={confeteGif} alt="Confete" style={styles.confettiGif} />
        </View>
      )}

      {totalCorrectAnswers == 0 && (
        <View>
          <Image source={derrotaIcon} alt="Derrota" style={styles.resultadoIcone} />
          <Text style={[styles.quizResultTitle, styles.quizResultTitleDerrota]}>Você perdeu!</Text>
        </View>
      )}

      <View style={styles.quizResultRow}>
        <Text style={styles.quizResultTotal}>
          {totalCorrectAnswers} {totalCorrectAnswerTitle}
        </Text>
      </View>
      <Text style={styles.pontuacao}>Pontuação Final: {score}</Text>

      <View style={styles.quizResultList}>
        {questions.map((question, index) => (
          <QuizResultCard key={index} question={question} answer={answers[index]} />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonJogarNovamente]}
          onPress={() => navigation.navigate('QuizStartScreen')}
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    backgroundColor: '#F2E8DF',
    textAlign: 'center',
    gap: 20,
    paddingHorizontal: 20
  },
  quizResultList: {
    width: '100%'
  },
  quizResultTotal: {
    fontSize: 24,
    fontFamily: 'Poppins'
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
  quizResultTitleDerrota: {
    fontSize: 36,
    color: '#f44336',
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginVertical: 20
  },
  quizResultTitleVitoria: {
    fontSize: 36,
    color: '#4caf50',
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginHorizontal: 10
  },
  quizResultTitle: {
    fontSize: 36,
    fontFamily: 'Poppins',
    textAlign: 'center'
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

export default QuizResultScreen
