import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const QuizResultCard = ({ answer, question }) => {
  const { title, answers: questionAnswers } = question
  const correctAnswer = questionAnswers.find((questionAnswer) => questionAnswer.correct)
  const isCorrect = correctAnswer.id === answer.id

  return (
    <View style={styles.quizCardContainer}>
      <Text style={styles.quizCardTitle}>{title[0].value}</Text>
      <Text style={[styles.answerText, isCorrect ? styles.correctText : styles.wrongText]}>
        Respondida: {answer.answer}
      </Text>
      {!isCorrect && <Text style={[styles.suggestionText]}>Correta: {correctAnswer.answer}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  quizCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#d4d2da',
    borderWidth: 2,
    borderColor: '#877cb3',
    borderRadius: 12,
    marginBottom: 15,
    maxWidth: 800,
    width: '100%'
  },
  quizCardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: '#433d59',
    fontFamily: 'Fredoka'
  },
  answerText: {
    fontSize: 16,
    marginBottom: 5
  },
  correctText: {
    color: '#7c9a96'
  },
  wrongText: {
    color: '#f28585'
  },
  suggestionText: {
    color: '#655d86',
    fontStyle: 'italic',
    fontSize: 15,
    fontFamily: 'Fredoka'
  }
})

export default QuizResultCard
