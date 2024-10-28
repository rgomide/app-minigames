import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
    <View style={styles.palavraEscondidaContainer}>
      <View style={styles.palavraLetras}>
        {item.palavra.split('').map((letra, index) => (
          <View key={index} style={styles.letraCaixa}>
            <Text style={styles.letraTexto}>{palavraEncontrada ? letra : '_'}</Text>
          </View>
        ))}

        <TouchableOpacity
          onPress={exibirDica}
          style={[styles.dicaBotao, dicaVisivel && styles.dicaDesabilitada]}
          disabled={dicaVisivel}
        >
          <Text style={styles.dicaTexto}>?</Text>
        </TouchableOpacity>
      </View>

      {dicaVisivel && (
        <View style={styles.dicaTextoContainer}>
          <Text style={styles.dicaTextoDescricao}>{item.dica}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  palavraEscondidaContainer: {
    marginVertical: 8,
    alignItems: 'center',
  },
  palavraLetras: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  letraCaixa: {
    padding: 12,
    backgroundColor: '#f7d0a1',
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  letraTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  dicaBotao: {
    backgroundColor: '#f4c182',
    borderRadius: 50,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  dicaDesabilitada: {
    backgroundColor: 'gray',
  },
  dicaTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dicaTextoContainer: {
    marginTop: 5,
  },
  dicaTextoDescricao: {
    color: 'gray',
    fontStyle: 'italic',
    fontSize: 14,
    fontFamily: 'Fredoka One',
  },
});

export default RenderizarPalavrasEscondidas;
