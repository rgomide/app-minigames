import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import RenderizarLetras from '../../components/anagrama/AnagramaLetraRender';
import RenderizarPalavrasEscondidas from '../../components/anagrama/AnagramaRevelaPalavra';

const AnagramaGameScreen = (props) => {
  const { anagramaSettings } = props.route.params;

  const [letrasEmbaralhadas, setLetrasEmbaralhadas] = useState(anagramaSettings.letras);
  const [palavraAtual, setPalavraAtual] = useState('');
  const [erros, setErros] = useState(0);
  const [palavrasDescobertas, setPalavrasDescobertas] = useState([]);
  const [dicasUsadas, setDicasUsadas] = useState(0);

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

      <TextInput
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 10 }}
        value={palavraAtual}
        onChangeText={setPalavraAtual}
        placeholder="Forme sua palavra"
      />

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
