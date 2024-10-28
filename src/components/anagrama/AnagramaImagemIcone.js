import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const ImagemIcone = ({ imagens = [] }) => {
  if (imagens.length === 0) {
    return null
  }

  return (
    <View style={styles.imagemContainer}>
      {imagens.map((imagem, index) => (
        <Image key={index} source={{ uri: imagem }} style={styles.imagem} alt={`Ícone ${index}`} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  imagemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    padding: 10
  },
  imagem: {
    width: 50,
    height: 50,
    borderRadius: 8
  }
})

export default ImagemIcone
