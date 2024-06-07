import { Button, StyleSheet, Text, View } from 'react-native'
import { QUIZ_START_SCREEN } from '../../constants/screens'

const MainMenuScreen = (props) => {
  const navigation = props.navigation

  const openQuiz = () => {
    navigation.navigate(QUIZ_START_SCREEN)
  }

  return (
    <View style={styles.mainView}>
      <Button title="Abrir Quiz" onPress={openQuiz} />
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

export default MainMenuScreen
