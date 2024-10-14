import React, { useState } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { getAssociacao } from '../../services/associacao/associacaoService'
import { ASSOCIACAO_GAME_SCREEN } from '../../constants/screens'

const AssociacaoStartScreen = (props) => {
  const navigation = props.navigation;
  const [selectedAssociacao, setSelectedAssociacao] = useState(null)

  const associacaoList = [
    { label: 'Animais e Habitats', value: 'associacao01' },
    { label: 'Instrumentos Musicais e Sons', value: 'associacao02' },
    { label: 'Países e Continentes', value: 'associacao03' },
  ]

  const startAssociacao = async () => {
    const associacao = await getAssociacao(selectedAssociacao)
    navigation.navigate(ASSOCIACAO_GAME_SCREEN, { associacaoSettings: associacao })
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.title}>ASSOCIAÇÃO</Text>

      <Text>Relacione os itens da coluna da direita com os itens da coluna da esquerda. </Text>

      <Text>Selecione o tema: </Text>

      <RNPickerSelect
        placeholder={{ label: 'Selecione um tema...', value: null }}
        onValueChange={setSelectedAssociacao}
        items={associacaoList}
      />

      <Button
        title="Iniciar Jogo de Associação"
        disabled={!selectedAssociacao} 
        onPress={startAssociacao}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
})

export default AssociacaoStartScreen