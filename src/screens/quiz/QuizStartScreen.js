import { useState } from 'react'
import { getQuiz } from '../../services/quiz/quisService'
import { QUIZ_GAME_SCREEN } from '../../constants/screens'
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import TooltipIcon from '../../components/TooltipIcon'

const QuizStartScreen = (props) => {
  const navigation = props.navigation
  const [selectedQuiz, setSelectedQuiz] = useState('')
  const quizList = [{ label: 'Capitais', value: 'quiz01' }, { label: 'Animais', value: 'quiz02' }, { label: 'Frutas', value: 'quiz03' }]

  const handleStartGame = async () => {
    if (selectedQuiz) {
      const quiz = await getQuiz(selectedQuiz)
      navigation.navigate(QUIZ_GAME_SCREEN, { quizSettings: quiz })
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TooltipIcon text="Responda as perguntas escolhendo a alternativa correta entre as opções." />

      <Text style={styles.title}>QUIZ</Text>

      <Text style={styles.label}>Selecione o tema: </Text>

      <Picker
        style={styles.picker}
        selectedValue={selectedQuiz}
        onValueChange={(itemValue) => {
          setSelectedQuiz(itemValue)
        }}
      >
        <Picker.Item label="Selecione um tema" value="" />
        {quizList.map((temaObj, index) => (
          <Picker.Item key={index} label={temaObj.label} value={temaObj.value} />
        ))}
      </Picker>

      <TouchableOpacity
        style={selectedQuiz ? styles.startButton : styles.startButtonDisabled}
        onPress={handleStartGame}
        disabled={!selectedQuiz}
      >
        <Text style={styles.buttonText}>Iniciar Quiz</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F2E8DF'
  },
  title: {
    fontSize: 50,
    fontFamily: 'Poppins',
    marginBottom: 16,
    color: '#a99be0'
  },
  label: {
    fontSize: 20,
    marginBottom: 16,
    color: '#333333',
    fontFamily: 'Poppins'
  },
  picker: {
    height: 45,
    width: '100%',
    maxWidth: 350,
    marginBottom: 20,
    backgroundColor: '#bab1e0',
    borderRadius: 8,
    padding: 5,
    fontSize: 16,
    fontFamily: 'Poppins'
  },
  startButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#bab1e0',
    border: 'none',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    maxWidth: 350,
    width: '100%',
    fontFamily: 'Poppins'
  },
  startButtonDisabled: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#b5aae0',
    border: 'none',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    maxWidth: 350,
    width: '100%',
    fontFamily: 'Poppins'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins',
    textAlign: 'center'
  }
})

export default QuizStartScreen
