import React from 'react';
import { View, Image } from 'react-native';

const ImagemIcone = ({ imagens = [] }) => {
  if (imagens.length === 0) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' , marginVertical: 8 }}>
      {imagens.map((imagem, index) => (
        <Image
          key={index}
          source={{ uri: imagem }}
          style={{
            width: 50,
            height: 50,
            marginHorizontal: 4,
            borderRadius: 6
          }}
          onError={(e) => console.log(`Erro ao carregar imagem ${imagem}:`, e.nativeEvent.error)}
        />
      ))}
    </View>
  );
};

export default ImagemIcone;
