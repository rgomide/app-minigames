import React from 'react'
import { Text, View, Button } from 'react-native'
import { ANAGRAMA_START_SCREEN } from '../../constants/screens'

const AnagramaResultScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Parabéns, você ganhou!</Text>
      <Button title="Voltar ao Menu" onPress={() => navigation.navigate(ANAGRAMA_START_SCREEN)} />
    </View>
  )
}

export default AnagramaResultScreen
