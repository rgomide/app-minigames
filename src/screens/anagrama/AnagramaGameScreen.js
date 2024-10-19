import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Alert } from 'react-native'
import RenderizarLetras from '../../components/anagrama/AnagramaLetraRender'
import RenderizarPalavrasEscondidas from '../../components/anagrama/AnagramaRevelaPalavra'
import ImagemIcone from '../../components/anagrama/AnagramaImagemIcone'
import AnagramaBotoes from '../../components/anagrama/AnagramaBotoes'
import { ANAGRAMA_RESULT_SCREEN } from '../../constants/screens'

const AnagramaGameScreen = ({ navigation, route }) => {
  const { anagramaSettings } = route.params

  const [pontuacao, setPontuacao] = useState(anagramaSettings.pontuacaoMaxima)
  const [letrasEmbaralhadas, setLetrasEmbaralhadas] = useState(anagramaSettings.letras)
  const [palavraAtual, setPalavraAtual] = useState('')
  const [erros, setErros] = useState(0)
  const [palavrasDescobertas, setPalavrasDescobertas] = useState([])
  const [dicasUsadas, setDicasUsadas] = useState(0)

  useEffect(() => {
    if (palavrasDescobertas.length === anagramaSettings.palavrasEscondidas.length) {
      navigation.navigate(ANAGRAMA_RESULT_SCREEN, { pontuacao })
    }
  }, [palavrasDescobertas, anagramaSettings.palavrasEscondidas.length, pontuacao, navigation])

  const verificarPalavra = () => {
    const palavraFormada = palavraAtual.toUpperCase()
    const palavraEscondida = anagramaSettings.palavrasEscondidas.find(
      (palavraObj) => palavraObj.palavra === palavraFormada
    )

    if (palavraEscondida) {
      if (!palavrasDescobertas.includes(palavraFormada)) {
        setPalavrasDescobertas([...palavrasDescobertas, palavraFormada])
      } else {
        Alert.alert('Você já descobriu essa palavra.')
      }
    } else {
      setErros((prevErros) => prevErros + 1)
      setPontuacao((prevPontuacao) => Math.max(0, prevPontuacao - anagramaSettings.perdaPorErro))
      Alert.alert('Palavra incorreta.')
    }

    setPalavraAtual('')
  }

  const incrementarDicasUsadas = () => {
    setDicasUsadas((prevDicasUsadas) => prevDicasUsadas + 1)
    setPontuacao((prevPontuacao) => Math.max(0, prevPontuacao - anagramaSettings.perdaPorDica))
  }

  const reiniciarNivel = () => {
    setErros(0)
    setPalavraAtual('')
    setPalavrasDescobertas([])
    setDicasUsadas(0)
    setPontuacao(anagramaSettings.pontuacaoMaxima)
    setLetrasEmbaralhadas(anagramaSettings.letras)
  }

  return (
    <View style={{ padding: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ fontSize: 16 }}>Tema: {anagramaSettings.tema}</Text>
        <Text style={{ fontSize: 16 }}>Erros: {erros}</Text>
        <Text style={{ fontSize: 16 }}>Dicas usadas: {dicasUsadas}</Text>
      </View>

      <Text style={{ fontSize: 16 }}>{anagramaSettings.enunciado}</Text>

      <ImagemIcone imagens={anagramaSettings.imagens} />

      <Text style={{ fontSize: 18, marginVertical: 8 }}>Palavras Escondidas:</Text>

      <FlatList
        data={anagramaSettings.palavrasEscondidas}
        keyExtractor={(item) => item.palavra}
        renderItem={({ item }) => (
          <RenderizarPalavrasEscondidas
            item={item}
            palavrasDescobertas={palavrasDescobertas}
            onDicaUsada={incrementarDicasUsadas}
            resetDicas={dicasUsadas === 0}
          />
        )}
      />

<Text
  style={{
    padding: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    textAlign: 'center',
    minHeight: 40, 
    fontSize: 16, 
    fontWeight: 'bold',
    borderRadius:8 
  }}
>
  {palavraAtual || ' '}
</Text>


      <View style={{ alignItems: 'center' }}>
        <RenderizarLetras
          letrasEmbaralhadas={letrasEmbaralhadas}
          onLetraPress={(letra) => setPalavraAtual(palavraAtual + letra)}
        />
      </View>

      <AnagramaBotoes
        onEnviarPress={verificarPalavra}
        onApagarPress={() => setPalavraAtual('')}
        onReiniciarPress={reiniciarNivel}
      />
    </View>
  )
}

export default AnagramaGameScreen
