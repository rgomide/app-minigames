import React from 'react'
import { View, Text, Button } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'

const ForcaEndScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { resultado, pontuacao } = route.params // Recebe a pontuação passada

  return (
    <View>
      <Text>Você {resultado}!</Text>
      <Text>Pontuação Final: {pontuacao}</Text> {/* Exibe a pontuação */}
      <Button title="Jogar Novamente" onPress={() => navigation.navigate('ForcaStartScreen')} />
      <Button title="Voltar ao início" onPress={() => navigation.navigate('MainMenuScreen')} />
    </View>
  )
}

export default ForcaEndScreen
