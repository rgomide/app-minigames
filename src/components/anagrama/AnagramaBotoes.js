import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'

const AnagramaBotoes = ({ onEnviarPress, onApagarPress, onReiniciarPress }) => {
  return (
    <View style={styles.buttonRow}>
  
      <TouchableOpacity style={[styles.iconButton, styles.refreshButton]} onPress={onReiniciarPress}>
        <Image source={require('../../../assets/refresh.png')} style={styles.iconImage} />
      </TouchableOpacity>

     
      <TouchableOpacity style={[styles.enviarButton]} onPress={onEnviarPress}>
        <Text style={styles.enviarButtonText}>Enviar Palavra</Text> 
      </TouchableOpacity>

      <TouchableOpacity style={[styles.iconButton, styles.apagarButton]} onPress={onApagarPress}>
        <Image source={require('../../../assets/backspace.png')} style={styles.iconImage} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    width: '100%'
  },
  iconButton: {
    padding: 12,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  apagarButton: {
    backgroundColor: 'red'
  },
  refreshButton: {
    backgroundColor: 'orange'
  },
  enviarButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
    borderRadius:8
  },
  enviarButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  }
})

export default AnagramaBotoes
