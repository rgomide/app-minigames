import { Button, StyleSheet, Text, View } from 'react-native'
import { MAIN_MENU_SCREEN, QUIZ_HOME_SCREEN } from '../../../contants/screens'

const QuizResultScreen = (props) => {
  const {
    navigation,
    route: {
      params: { topic, questions, answers }
    }
  } = props

  const navigateToMainMenu = () => {
    navigation.navigate(MAIN_MENU_SCREEN, { key: Math.random().toString() })
  }

  return (
    <View style={styles.mainView}>
      <Text>Resultado</Text>
      <Text>Tema:</Text>
      <Text>{topic}</Text>
      <Button title="Menu Principal" onPress={() => navigateToMainMenu()} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    padding: 10,
    gap: 5
  }
})

export default QuizResultScreen
