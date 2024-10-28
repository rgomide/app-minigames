import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import RenderizarLetras from '../../components/anagrama/AnagramaLetraRender'
import RenderizarPalavrasEscondidas from '../../components/anagrama/AnagramaRevelaPalavra'
import ImagemIcone from '../../components/anagrama/AnagramaImagemIcone'
import AnagramaBotoes from '../../components/anagrama/AnagramaBotoes'
import { ANAGRAMA_RESULT_SCREEN } from '../../constants/screens'
import TooltipIcon from '../../components/TooltipIcon'
import { playCorrectAnswerSound, playWrongAnswerSound } from '../../services/util/audio'

const AnagramaGameScreen = ({ navigation, route }) => {
  const { anagramaSettings } = route.params
  const maxErros = anagramaSettings.palavrasEscondidas.length + 1
  const maxDicas = anagramaSettings.palavrasEscondidas.length
  const [pontuacao, setPontuacao] = useState(100)
  const [letrasEmbaralhadas, setLetrasEmbaralhadas] = useState(anagramaSettings.letras)
  const [palavraAtual, setPalavraAtual] = useState('')
  const [erros, setErros] = useState(0)
  const [dicasUsadas, setDicasUsadas] = useState(0)
  const [palavrasDescobertas, setPalavrasDescobertas] = useState([])
  const [mensagem, setMensagem] = useState('')
  const [showMensagem, setShowMensagem] = useState(false)

  const playSound = (isCorrect) => {
    if (isCorrect) {
      playCorrectAnswerSound()
    } else {
      playWrongAnswerSound()
    }
  }

  useEffect(() => {
    if (palavrasDescobertas.length === anagramaSettings.palavrasEscondidas.length) {
      navigation.navigate(ANAGRAMA_RESULT_SCREEN, { pontuacao })
    }
  }, [palavrasDescobertas, anagramaSettings.palavrasEscondidas.length, pontuacao, navigation])

  useEffect(() => {
    if (erros >= maxErros) {
      navigation.navigate(ANAGRAMA_RESULT_SCREEN, { pontuacao: 0, mensagem: 'Você perdeu!' })
    }
  }, [erros, maxErros, navigation])

  const exibirMensagem = (texto) => {
    setMensagem(texto)
    setShowMensagem(true)
    setTimeout(() => {
      setShowMensagem(false)
    }, 1000)
  }

  const calcularPerdaPorErro = () => {
    return 100 / maxErros
  }

  const verificarPalavra = () => {
    const palavraFormada = palavraAtual.toUpperCase()
    const palavraEscondida = anagramaSettings.palavrasEscondidas.find(
      (palavraObj) => palavraObj.palavra === palavraFormada
    )

    if (palavraEscondida) {
      if (!palavrasDescobertas.includes(palavraFormada)) {
        playSound(true)
        setPalavrasDescobertas([...palavrasDescobertas, palavraFormada])
        exibirMensagem('Você acertou!')
      } else {
        playSound(false)
        exibirMensagem('Você já descobriu essa palavra.')
      }
    } else {
      playSound(false)
      const perda = calcularPerdaPorErro()
      setErros((prevErros) => prevErros + 1)
      setPontuacao((prevPontuacao) => Math.max(0, Math.ceil(prevPontuacao - perda)))
      exibirMensagem('Palavra incorreta.')
    }

    setPalavraAtual('')
  }

  const incrementarDicasUsadas = () => {
    setDicasUsadas((prevDicasUsadas) => prevDicasUsadas + 1)
  }

  return (
    <ScrollView contentContainerStyle={styles.anagramaGameContainer}>
      <TooltipIcon text="Reorganize as letras embaralhadas para formar palavras válidas." />

      <Text style={styles.texto}>Tema: {anagramaSettings.tema}</Text>
      <Text style={styles.texto}>
        Erros: {erros}/{maxErros}
      </Text>
      <Text style={styles.texto}>
        Dicas usadas: {dicasUsadas}/{maxDicas}
      </Text>

      <ImagemIcone imagens={anagramaSettings.imagens} />

      <Text style={styles.hiddenWordsTitle}>Palavras Escondidas:</Text>

      <View style={styles.hiddenWordsContainer}>
        {anagramaSettings.palavrasEscondidas.map((item, index) => {
          return (
            <RenderizarPalavrasEscondidas
              key={index}
              item={item}
              palavrasDescobertas={palavrasDescobertas}
              onDicaUsada={incrementarDicasUsadas}
            />
          )
        })}
      </View>

      <View style={styles.currentWord}>
        <Text>{palavraAtual || ' '}</Text>
      </View>

      <RenderizarLetras
        letrasEmbaralhadas={letrasEmbaralhadas}
        onLetraPress={(letra) => setPalavraAtual(palavraAtual + letra)}
      />

      <AnagramaBotoes onEnviarPress={verificarPalavra} onApagarPress={() => setPalavraAtual('')} />

      {showMensagem && (
        <View style={styles.messageBalloon}>
          <Text style={styles.messageText}>{mensagem}</Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  anagramaGameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#F2E8DF'
  },
  infoIcon: {
    marginBottom: 10
  },
  infoImage: {
    width: 60,
    height: 60
  },
  infoBubble: {
    backgroundColor: '#F9E0C0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center'
  },
  infoText: {
    fontSize: 14,
    color: '#916a3b',
    textAlign: 'center'
  },
  texto: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#916a3b',
    marginBottom: 5
  },
  hiddenWordsTitle: {
    fontSize: 20,
    marginBottom: 8,
    color: '#916a3b',
    textAlign: 'center',
    fontFamily: 'Poppins'
  },
  hiddenWordsContainer: {
    backgroundColor: '#F9E0C0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20
  },
  currentWord: {
    backgroundColor: '#F2B263',
    fontFamily: 'Poppins',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white'
  },
  messageBalloon: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(238, 208, 170, 0.8)',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: 'center'
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Poppins'
  }
})

export default AnagramaGameScreen
