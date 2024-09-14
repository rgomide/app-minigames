import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ForcaGameScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { tema } = route.params;

   const [grupoAtual] = useState(
    tema.grupos[Math.floor(Math.random() * tema.grupos.length)]
  );

  const [palavraAtual] = useState(
    grupoAtual.palavras[Math.floor(Math.random() * grupoAtual.palavras.length)]
  );

  const [tentativas, setTentativas] = useState([]); 
  const [letra, setLetra] = useState('');
  const [erros, setErros] = useState(0);
  const [mensagem, setMensagem] = useState('');

  const handleTentativa = () => {
    const letraUpper = letra.toUpperCase();

    if (tentativas.includes(letraUpper)) {
      setMensagem(`Você já tentou a letra ${letraUpper}.`);
    } else if (palavraAtual.toUpperCase().includes(letraUpper)) {
      setTentativas([...tentativas, letraUpper]);
      setMensagem(`A letra ${letraUpper} está correta!`);
    } else {
      setErros(erros + 1);
      setTentativas([...tentativas, letraUpper]);
      setMensagem(`A letra ${letraUpper} está incorreta.`);
    }

    setLetra('');

    if (erros + 1 >= 6) {
      navigation.navigate('ForcaEndScreen', { resultado: 'perdeu' });
    } else if (palavraAtual.toUpperCase().split('').every((l) => tentativas.includes(l))) {
      navigation.navigate('ForcaEndScreen', { resultado: 'ganhou' });
    }
  };

  const renderPalavra = () => {
    return palavraAtual
      .toUpperCase()
      .split('')
      .map((letra) => (tentativas.includes(letra) ? letra : '_'))
      .join(' ');
  };

  return (
    <View>
      <Text>Tema: {tema.tema}</Text>
      
      <Text>Dica: {grupoAtual.dica}</Text>

      {grupoAtual.imagem ? (
        <Image
          source={{ uri: grupoAtual.imagem }}
          style={{ width: 200, height: 200, marginBottom: 20 }}
          resizeMode="contain"
        />
      ) : null}

      <Text>Palavra: {renderPalavra()}</Text>
      <Text>Erros: {erros} de 6</Text>

      <TextInput
        value={letra}
        onChangeText={setLetra}
        maxLength={1}
        placeholder="Digite uma letra"
        style={{ borderBottomWidth: 1, marginBottom: 20, textAlign: 'center', fontSize: 24 }}
      />
      
      <Button title="Tentar Letra" onPress={handleTentativa} />

      {mensagem && <Text>{mensagem}</Text>}
    </View>
  );
};

export default ForcaGameScreen;
