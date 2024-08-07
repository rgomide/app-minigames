import { Button, StyleSheet, Text, View } from 'react-native'
import { MAIN_MENU_SCREEN } from '../../constants/screens'
import QuizResultCard from '../../components/quiz/QuizResultCard'

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
    totalCorrectAnswers == 1 ? 'resposta correta' : 'respostas corretas'

  const navigateToMainMenu = () => {
    navigation.navigate(MAIN_MENU_SCREEN, { key: Math.random().toString() })
  }

  return (
    <View style={styles.mainView}>
      <Text style={styles.textTitle}>Resultado</Text>

      <View style={styles.viewRow}>
        <Text style={styles.textTitle}>Tema:</Text>
        <Text style={styles.textTitle}>{topic}</Text>
      </View>

      <View style={styles.viewRow}>
        <Text style={styles.textTotalCorrect}>{totalCorrectAnswers}</Text>
        <Text style={styles.textTitle}>{totalCorrectAnswerTitle}</Text>
      </View>

      <View style={styles.resultView}>
        {questions.map((question, index) => (
          <QuizResultCard key={index} question={question} answer={answers[index]} />
        ))}
      </View>
      <Button title="Voltar" onPress={() => navigateToMainMenu()} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    padding: 10,
    gap: 5
  },
  resultView: {
    padding: 10,
    gap: 10,
    backgroundColor: '#ddd',
    borderRadius: 5
  },
  viewRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'flex-end'
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    includeFontPadding: false,
    textAlignVertical: 'center'
  },
  textTotalCorrect: {
    fontWeight: 'bold',
    fontSize: 25,
    includeFontPadding: false,
    textAlignVertical: 'bottom'
  }
})

export default QuizResultScreen
