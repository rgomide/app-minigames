import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { getAssociacao } from '../../services/associacao/associacaoService'
import { ASSOCIACAO_GAME_SCREEN } from '../../constants/screens'
import TooltipIcon from '../../components/TooltipIcon'

const AssociacaoStartScreen = (props) => {
  const navigation = props.navigation
  const [selectedAssociacao, setSelectedAssociacao] = useState('')
  const [showInfo, setShowInfo] = useState(false)

  const associacaoList = [
    { label: 'Animais', value: 'associacao01' },
    { label: 'Instrumentos Musicais', value: 'associacao02' },
    { label: 'Países', value: 'associacao03' }
  ]

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const startAssociacao = async () => {
    const associacao = await getAssociacao(selectedAssociacao)
    const selectedThemeLabel = associacaoList.find(
      (option) => option.value === selectedAssociacao
    )?.label
    navigation.navigate(ASSOCIACAO_GAME_SCREEN, {
      associacaoSettings: associacao,
      selectedTheme: selectedThemeLabel
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TooltipIcon text="Relacione os itens da coluna da direita com os itens da coluna da esquerda." />

      <Text style={styles.title}>ASSOCIAÇÃO</Text>

      <Text style={styles.label}>Selecione o tema:</Text>

      <Picker
        selectedValue={selectedAssociacao}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedAssociacao(itemValue)}
      >
        <Picker.Item label="Selecione um tema..." value="" />
        {associacaoList.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>

      <TouchableOpacity
        style={selectedAssociacao ? styles.startButton : styles.startButtonDisabled}
        disabled={!selectedAssociacao}
        onPress={startAssociacao}
      >
        <Text style={styles.buttonText}>Iniciar Associação</Text>
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
    color: '#5d7370'
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
    backgroundColor: '#91c1bb',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Poppins'
  },
  startButton: {
    alignItems: 'center',
    backgroundColor: '#5d7370',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    maxWidth: 350,
    width: '100%',
    marginTop: 10
  },
  startButtonDisabled: {
    alignItems: 'center',
    backgroundColor: '#7c9a96',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    maxWidth: 350,
    width: '100%',
    marginTop: 10
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Poppins'
  }
})

export default AssociacaoStartScreen
