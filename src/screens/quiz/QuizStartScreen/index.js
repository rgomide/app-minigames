import { Button, StyleSheet, View } from 'react-native'
import { QUIZ_GAME_SCREEN } from '../../../contants/screens'
import { getQuiz } from '../../../services/quiz/quisService'

const QuizStartScreen = (props) => {
  const navigation = props.navigation

  const startQuiz = async () => {
    const quiz = await getQuiz('quiz01')

    quiz.questions.forEach((question) => {
      question.answers.forEach((answer) => (delete answer.pressed))
    })

    navigation.navigate(QUIZ_GAME_SCREEN, { quizSettings: quiz })
  }

  return (
    <View style={styles.mainView}>
      <Button title="Iniciar Quiz" onPress={startQuiz} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    gap: 3,
    padding: 10,
    justifyContent: 'center'
  }
})

export default QuizStartScreen
