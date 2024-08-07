import { Button, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { getQuiz } from '../../services/quiz/quisService'
import { QUIZ_GAME_SCREEN } from '../../constants/screens'

const QuizStartScreen = (props) => {
  const navigation = props.navigation
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const quizList = [{ label: 'Capitais', value: 'quiz01' }]

  const startQuiz = async () => {
    const quiz = await getQuiz('quiz01')
    navigation.navigate(QUIZ_GAME_SCREEN, { quizSettings: quiz })
  }

  return (
    <View style={styles.mainView}>
      <RNPickerSelect
        placeholder={{ label: 'Selecione um tema...' }}
        onValueChange={setSelectedQuiz}
        items={quizList}
      />
      <Button title="Iniciar Quiz" disabled={!selectedQuiz} onPress={startQuiz} />
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
