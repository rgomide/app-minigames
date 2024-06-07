import { Text, View, StyleSheet } from 'react-native'

const QuizResultCard = ({ answer, question }) => {
  const { title, answers: questionAnswers } = question
  const correctAnswer = questionAnswers.find((questionAnswer) => questionAnswer.correct)
  const isCorrect = correctAnswer.id === answer.id

  const answerStyle = isCorrect ? styles.correctText : styles.wrongText

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={[answerStyle]}>Respondida: {answer.answer}</Text>
      {!isCorrect && <Text style={[styles.suggestionText]}>Correta: {correctAnswer.answer}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 3
  },
  correctText: {
    color: 'green'
  },
  suggestionText: {
    color: '#999'
  },
  wrongText: {
    color: 'red'
  }
})

export default QuizResultCard
