import { Button, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { getAnagrama } from '../../services/anagrama/anagramaService'
import { ANAGRAMA_GAME_SCREEN } from '../../constants/screens'

const AnagramaStartScreen = (props) => {
  const navigation = props.navigation
  const [selectedAnagrama, setSelectedAnagrama] = useState(null)
  const anagramaList = [{ label: 'Facil', value: 'anagrama01' },{ label: 'Medio', value: 'anagrama02' },{ label: 'Dificil', value: 'anagrama03' }]

  const startAnagrama = async () => {
    const anagrama = await getAnagrama(selectedAnagrama)
    navigation.navigate(ANAGRAMA_GAME_SCREEN, { anagramaSettings: anagrama })
  }

  return (
    <View style={styles.mainView}>
      <RNPickerSelect
        placeholder={{ label: 'Selecione um nível de dificuldade...' }}
        onValueChange={setSelectedAnagrama}
        items={anagramaList}
      />
      <Button title="Iniciar Anagrama" disabled={!selectedAnagrama} onPress={startAnagrama} />
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

export default AnagramaStartScreen
