import React from 'react';
import { View, Text } from 'react-native';

const RenderizarPalavrasEscondidas = ({ item, palavrasDescobertas }) => {
  const palavraEncontrada = palavrasDescobertas.includes(item.palavra);
  return (
    <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'center' }}>
      {item.palavra.split('').map((letra, index) => (
        <View key={index} style={{ margin: 5, padding: 10, backgroundColor: 'lightgray' }}>
          <Text style={{ fontSize: 20 }}>
            {palavraEncontrada ? letra : '_'}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default RenderizarPalavrasEscondidas;
