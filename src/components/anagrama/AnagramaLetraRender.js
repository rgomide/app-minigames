import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RenderizarLetras = ({ letrasEmbaralhadas, onLetraPress }) => {
  return (
    <View style={styles.letrasContainer}>
      {letrasEmbaralhadas.map((letra, index) => (
        <TouchableOpacity
          key={index}
          style={styles.letraItem}
          onPress={() => onLetraPress(letra)}
        >
          <Text style={styles.letraTexto}>{letra}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  letrasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
    
  },
  letraItem: {
    backgroundColor: '#f4c182',
    fontFamily: 'Poppins',
    borderRadius: 8,
    padding: 12,
    textAlign: 'center',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 0px #b88e5b',
    cursor: 'pointer',
    transition: 'transform 0.1s ease, box-shadow 0.1s ease',
  },
  letraTexto: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#333',
    textAlign: 'center',
  },
});

export default RenderizarLetras;
