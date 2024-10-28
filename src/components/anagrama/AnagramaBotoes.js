import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const AnagramaBotoes = ({ onEnviarPress, onApagarPress }) => {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.enviarButton} onPress={onEnviarPress}>
        <Text style={styles.enviarButtonText}>Enviar Palavra</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.apagarButton} onPress={onApagarPress}>
        <Image
          source={require('../../../assets/backspace.png')}
          style={styles.apagarButtonImg}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Poppins',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    maxWidth: 400,
    marginHorizontal: 'auto',
    
  },
  apagarButton: {
    backgroundColor: '#916a3b',
    padding: 12,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  enviarButton: {
    backgroundColor: '#f2b263',
    fontFamily: 'Poppins',
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: 'white',
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  enviarButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  apagarButtonImg: {
    width: 20,
    height: 20,
  },
});

export default AnagramaBotoes;
