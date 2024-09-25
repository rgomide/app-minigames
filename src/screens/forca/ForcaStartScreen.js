import React, { useState } from 'react'
import { View, Text, Button, Picker, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import forcaData from '../../db/forca/forca01.json'

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
      <Text style={styles.label}>Selecione um tema:</Text>
      <Picker
        selectedValue={selectedTheme}
        onValueChange={(itemValue) => setSelectedTheme(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um tema" value="" />
        {forcaData.forca.temas.map((temaObj, index) => (
          <Picker.Item key={index} label={temaObj.tema} value={temaObj.tema} />
        ))}
      </Picker>
      <Button title="Iniciar Forca" onPress={handleStartGame} disabled={!selectedTheme} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  label: {
    fontSize: 18,
    marginBottom: 10
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20
  }
})

export default SelectForcaThemeScreen
