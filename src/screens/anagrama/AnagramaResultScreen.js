import React from 'react'
import { View, Text, Button } from 'react-native'

const AnagramaResultScreen = ({ route, navigation }) => {

  const { pontuacao } = route.params

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Parabéns, você ganhou!!!</Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Aqui está sua pontuação:</Text>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'green' }}>{pontuacao} Pontos</Text>

      <Button title="Jogar Novamente" onPress={() => navigation.navigate('AnagramaStartScreen')} />
      <Button title="Voltar ao início" onPress={() => navigation.navigate('MainMenuScreen')} />
    </View>
  )
}

export default AnagramaResultScreen
