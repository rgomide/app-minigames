import React, { useState } from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native'
import forcaData from '../../db/forca/forca01.json'
import TooltipIcon from '../../components/TooltipIcon'

const SelectForcaThemeScreen = () => {
  const navigation = useNavigation()
  const [selectedTheme, setSelectedTheme] = useState('')

  const handleStartGame = () => {
    const temaSelecionado = forcaData.forca.temas.find((t) => t.tema === selectedTheme)
    if (temaSelecionado) {
      navigation.navigate('ForcaGameScreen', { tema: temaSelecionado })
    }
  }

  return (
    <View style={styles.container}>
      <TooltipIcon text="Adivinhe a palavra secreta, antes de atingir os seis erros." />

      <Text style={styles.title}>FORCA</Text>

      <Text style={styles.label}>Selecione o tema: </Text>

      <Picker
        style={styles.picker}
        selectedValue={selectedTheme}
        onValueChange={(itemValue) => {
          setSelectedTheme(itemValue)
        }}
      >
        <Picker.Item label="Selecione um tema" value="" />
        {forcaData.forca.temas.map((temaObj, index) => (
          <Picker.Item key={index} label={temaObj.tema} value={temaObj.tema} />
        ))}
      </Picker>

      <TouchableOpacity
        style={selectedTheme ? styles.startButton : styles.startButtonDisabled}
        onPress={handleStartGame}
        disabled={!selectedTheme}
      >
        <Text>Iniciar Forca</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F2E8DF',
    fontFamily: 'Poppins'
  },
  title: {
    fontSize: 50,
    fontFamily: 'Poppins',
    marginBottom: 16,
    color: '#F28585'
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
    backgroundColor: '#f2bcbc',
    borderRadius: 8,
    padding: 5,
    fontSize: 16,
    fontFamily: 'Poppins'
  },
  startButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f28585',
    color: '#ffffff',
    border: 'none',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 10,
    maxWidth: 350,
    width: '100%',
    fontFamily: 'Poppins'
  },
  startButtonDisabled: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f2baba',
    color: '#ffffff',
    border: 'none',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    fontSize: 16,
    cursor: 'not-allowed',
    marginTop: 10,
    maxWidth: 350,
    width: '100%',
    fontFamily: 'Poppins'
  }
})

export default SelectForcaThemeScreen
