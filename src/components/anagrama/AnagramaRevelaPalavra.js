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
    <View style={{ marginVertical: 10, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {item.palavra.split('').map((letra, index) => (
          <View key={index} style={{ margin: 5, padding: 10, backgroundColor: 'lightgray' }}>
            <Text style={{ fontSize: 20 }}>{palavraEncontrada ? letra : '_'}</Text>
          </View>
        ))}

        
        <TouchableOpacity
          onPress={exibirDica}
          style={{
            marginLeft: 10,
            backgroundColor: dicaVisivel ? 'gray' : 'blue',
            borderRadius: 25,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          disabled={dicaVisivel} 
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>?</Text>
        </TouchableOpacity>
      </View>


      {dicaVisivel && (
        <Text style={{ marginTop: 5, color: 'gray', fontStyle: 'italic' }}>{item.dica}</Text>
      )}
    </View>
  );
};

export default RenderizarPalavrasEscondidas;
