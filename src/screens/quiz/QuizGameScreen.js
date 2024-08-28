import { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import QuizCard from '../../components/quiz/QuizCard'
import { QUIZ_RESULT_SCREEN } from '../../constants/screens'

const QuizGameScreen = (props) => {
  const {
    navigation,
    route: {
      params: {
        quizSettings: { topic, questions }
      }
    }
  } = props

  const [currentQuestion, setCurrentQuestion] = useState(questions[0])
  const [questionCounter, setQuestionCounter] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answers, setAnswers] = useState([])

  const onSelectAnswer = (answer) => {
    setSelectedAnswer(answer)
  }

  const onNextPressed = () => {
    if (questionCounter < questions.length - 1) {
      processNextQuestion()
    } else {
      processEndGame()
    }
  }

  const processNextQuestion = () => {
    setAnswers([...answers, selectedAnswer])
    setQuestionCounter(questionCounter + 1)
    setCurrentQuestion(questions[questionCounter + 1])
    setSelectedAnswer(null)
  }

  const processEndGame = () => {
    const allAnswers = [...answers, selectedAnswer]

    setCurrentQuestion(questions[0])
    setQuestionCounter(0)
    setSelectedAnswer(null)
    setAnswers([])

    navigation.navigate(QUIZ_RESULT_SCREEN, { topic, questions, answers: allAnswers })
  }

  const getButtonTitle = () => {
    if (questionCounter === questions.length - 1) {
      return 'Finalizar'
    }
    return 'Próxima'
  }

  return (
    <View style={styles.mainView}>
      <Text>Tema: {topic}</Text>
      <Text>
        Questões: {questionCounter + 1}/{questions.length}
      </Text>

      <QuizCard question={currentQuestion} onChange={onSelectAnswer} />

      <Button onPress={onNextPressed} disabled={!selectedAnswer} title={getButtonTitle()} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    gap: 5,
    padding: 10,
    backgroundColor: 'white'
  }
})

export default QuizGameScreen
