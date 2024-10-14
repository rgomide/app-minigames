import { Button, StyleSheet, View, Text } from 'react-native'
import { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { getAnagrama } from '../../services/anagrama/anagramaService'
import { ANAGRAMA_GAME_SCREEN } from '../../constants/screens'

const AnagramaStartScreen = (props) => {
  const navigation = props.navigation
  const [selectedAnagrama, setSelectedAnagrama] = useState(null)
  const anagramaList = [
    { label: 'Geral 1', value: 'anagrama01' },
    { label: 'Geral 2', value: 'anagrama02' },
    { label: 'Geral 3', value: 'anagrama03' }
  ];

  const startAnagrama = async () => {
    const anagrama = await getAnagrama(selectedAnagrama)
    navigation.navigate(ANAGRAMA_GAME_SCREEN, { anagramaSettings: anagrama })
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.title}>ANAGRAMA</Text>

      <Text>Reorganize as letras embaralhadas para formar palavras válidas. </Text>

      <Text>Selecione o tema: </Text>

      <RNPickerSelect
        placeholder={{ label: 'Selecione um tema...' }}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
})

export default AnagramaStartScreen
