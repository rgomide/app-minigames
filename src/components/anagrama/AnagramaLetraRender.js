import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

const RenderizarLetras = ({ letrasEmbaralhadas, onLetraPress }) => {
  if (!letrasEmbaralhadas || !Array.isArray(letrasEmbaralhadas)) {
    return null
  }

  return (
    <View style={{ flexDirection: 'row', marginVertical: 20 }}>
      {letrasEmbaralhadas.map((letra, index) => (
        <TouchableOpacity
          key={index}
          style={{
            marginHorizontal: 16,
            padding: 10,
            backgroundColor: 'lightgray',
            borderRadius: 10
          }}
          onPress={() => onLetraPress(letra)}
        >
          <Text style={{ fontSize: 20 }}>{letra}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default RenderizarLetras
