import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RenderizarPalavrasEscondidas = ({ item, palavrasDescobertas, onDicaUsada, resetDicas }) => {
  const [dicaVisivel, setDicaVisivel] = useState(false);
  const palavraEncontrada = palavrasDescobertas.includes(item.palavra);

  useEffect(() => {
    if (resetDicas) {
      setDicaVisivel(false); 
    }
  }, [resetDicas]);

  const exibirDica = () => {
    setDicaVisivel(true);
    onDicaUsada(); 
  };

  return (
    <View style={{ marginVertical: 8, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {item.palavra.split('').map((letra, index) => (
          <View key={index} style={{ margin: 5, padding: 12, backgroundColor: 'lightgray', borderRadius: 8 }}>
            <Text style={{ fontSize: 12 }}>{palavraEncontrada ? letra : '_'}</Text>
          </View>
        ))}

        <TouchableOpacity
          onPress={exibirDica}
          style={{
            marginLeft: 10,
            backgroundColor: dicaVisivel ? 'gray' : 'blue',
            borderRadius: 25,
            width: 36,
            height: 36,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 6
          }}
          disabled={dicaVisivel}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>?</Text>
        </TouchableOpacity>
      </View>

      
      <View style={{ marginTop: 4, height: 12, justifyContent: 'center' }}>
        {dicaVisivel ? (
          <Text style={{ color: 'gray', fontStyle: 'italic' }}>{item.dica}</Text>
        ) : (
          <Text>{}</Text>
        )}
      </View>
    </View>
  );
};

export default RenderizarPalavrasEscondidas;
