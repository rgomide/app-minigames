import { Button, StyleSheet, Text, View } from 'react-native'
import {
  ANAGRAMA_START_SCREEN,
  ASSOCIACAO_START_SCREEN,
  FORCA_START_SCREEN,
  QUIZ_START_SCREEN
} from '../constants/screens'

const MainMenuScreen = (props) => {
  const navigation = props.navigation

  const openAnagrama = () => {
    navigation.navigate(ANAGRAMA_START_SCREEN)
  }
  const openAssociacao = () => {
    navigation.navigate(ASSOCIACAO_START_SCREEN)
  }
  const openForca = () => {
    navigation.navigate(FORCA_START_SCREEN)
  }
  const openQuiz = () => {
    navigation.navigate(QUIZ_START_SCREEN)
  }

  return (
    <View style={styles.mainView}>
      <Button title="Abrir Anagrama" onPress={openAnagrama} />
      <Button title="Abrir Associação" onPress={openAssociacao} />
      <Button title="Abrir Forca" onPress={openForca} />
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