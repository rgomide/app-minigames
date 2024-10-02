import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import RenderizarLetras from '../../components/anagrama/AnagramaLetraRender';
import RenderizarPalavrasEscondidas from '../../components/anagrama/AnagramaRevelaPalavra';
import { ANAGRAMA_RESULT_SCREEN } from '../../constants/screens'

const AnagramaGameScreen = ({ navigation, route }) => {
  const { anagramaSettings } = route.params;

  const [letrasEmbaralhadas, setLetrasEmbaralhadas] = useState(anagramaSettings.letras);
  const [palavraAtual, setPalavraAtual] = useState('');
  const [erros, setErros] = useState(0);
  const [palavrasDescobertas, setPalavrasDescobertas] = useState([]);
  const [dicasUsadas, setDicasUsadas] = useState(0);

  useEffect(() => {
    if (palavrasDescobertas.length === anagramaSettings.palavrasEscondidas.length) {
      navigation.navigate(ANAGRAMA_RESULT_SCREEN);
    }
  }, [palavrasDescobertas, anagramaSettings.palavrasEscondidas.length, navigation]);
  const verificarPalavra = () => {
    const palavraFormada = palavraAtual.toUpperCase();
    const palavraEscondida = anagramaSettings.palavrasEscondidas.find(
      palavraObj => palavraObj.palavra === palavraFormada
    );

    if (palavraEscondida) {
      if (!palavrasDescobertas.includes(palavraFormada)) {
        setPalavrasDescobertas([...palavrasDescobertas, palavraFormada]);
      } else {
        Alert.alert('Você já descobriu essa palavra.');
      }
    } else {
      setErros(prevErros => prevErros + 1);
      Alert.alert('Palavra incorreta.');
    }

    setPalavraAtual('');  
  };

  const usarDica = (idDica) => {
    const dica = anagramaSettings.dicas.find(d => d.idDica === idDica);
    Alert.alert('Dica:', dica.textoDica);
    setDicasUsadas(prevDicasUsadas => prevDicasUsadas + 1);
  };

  const reiniciarNivel = () => {
    setErros(0);
    setPalavraAtual('');
    setPalavrasDescobertas([]);
    setDicasUsadas(0);
    setLetrasEmbaralhadas(anagramaSettings.letras);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Nível: {anagramaSettings.dificuldade}</Text>
      <Text style={{ fontSize: 16 }}>Erros: {erros}</Text>
      <Text style={{ fontSize: 18, marginVertical: 20 }}>Palavras Escondidas:</Text>

      <FlatList
        data={anagramaSettings.palavrasEscondidas}
        keyExtractor={(item) => item.palavra}
        renderItem={({ item }) => (
          <RenderizarPalavrasEscondidas item={item} palavrasDescobertas={palavrasDescobertas} />
        )}
      />

      <Text style={{
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 1
      }}>{palavraAtual}</Text>

      <View style={{ alignItems: 'center' }}>
        <RenderizarLetras letrasEmbaralhadas={letrasEmbaralhadas} onLetraPress={(letra) => setPalavraAtual(palavraAtual + letra)} />
      </View>

      <Button title="Enviar Palavra" onPress={verificarPalavra} />
      <Button title="Apagar" onPress={() => setPalavraAtual('')} color="red" />
      <Button title="Reiniciar Nível" onPress={reiniciarNivel} color="orange" />
    </View>
  );
};

export default AnagramaGameScreen;
