import React, { useState } from 'react'
import { Text, TouchableOpacity, Image, View, ScrollView, StyleSheet } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { playCorrectAnswerSound, playWrongAnswerSound } from '../../services/util/audio';

const img0 = require('../../img/img0.png')
const img1 = require('../../img/img1.png')
const img2 = require('../../img/img2.png')
const img3 = require('../../img/img3.png')
const img4 = require('../../img/img4.png')
const img5 = require('../../img/img5.png')
const img6 = require('../../img/img6.png')

const infoIcon = require('../../img/duvida.png')


const ForcaGameScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { tema } = route.params

  const [teclas, setTeclas] = useState([
    { letra: 'A', clicado: false },
    { letra: 'B', clicado: false },
    { letra: 'C', clicado: false },
    { letra: 'D', clicado: false },
    { letra: 'E', clicado: false },
    { letra: 'F', clicado: false },
    { letra: 'G', clicado: false },
    { letra: 'H', clicado: false },
    { letra: 'I', clicado: false },
    { letra: 'J', clicado: false },
    { letra: 'K', clicado: false },
    { letra: 'L', clicado: false },
    { letra: 'M', clicado: false },
    { letra: 'N', clicado: false },
    { letra: 'O', clicado: false },
    { letra: 'P', clicado: false },
    { letra: 'Q', clicado: false },
    { letra: 'R', clicado: false },
    { letra: 'S', clicado: false },
    { letra: 'T', clicado: false },
    { letra: 'U', clicado: false },
    { letra: 'V', clicado: false },
    { letra: 'W', clicado: false },
    { letra: 'X', clicado: false },
    { letra: 'Y', clicado: false },
    { letra: 'Z', clicado: false }
  ]);

  const [grupoAtual] = useState(tema.grupos[Math.floor(Math.random() * tema.grupos.length)])
  const [palavraAtual] = useState(
    grupoAtual.palavras[Math.floor(Math.random() * grupoAtual.palavras.length)]
  );
  const [tentativas, setTentativas] = useState([])
  const [erros, setErros] = useState(0)
  const [mensagem, setMensagem] = useState('')
  const [showInfo, setShowInfo] = useState(false)

  const forcaImagens = [img0, img1, img2, img3, img4, img5, img6]

  const renderPalavra = () => {
    return palavraAtual
      .toUpperCase()
      .split('')
      .map((letra) => (tentativas.includes(letra) ? letra : '_'))
      .join(' ')
  };

  const playSound = (isCorrect) => {
    if (isCorrect) {
      playCorrectAnswerSound();
    } else {
      playWrongAnswerSound();
    }
  }

  const onClickTecla = (teclaClicada) => {
    const letraUpper = teclaClicada.letra.toUpperCase()

    const tentativasAtualizado = [...tentativas, letraUpper]

    let erroAtualizado = erros

    if (palavraAtual.toUpperCase().includes(letraUpper)) {
      setTentativas(tentativasAtualizado)
      setMensagem(`A letra ${letraUpper} está correta!`)
      playSound(true)
    } else {
      erroAtualizado = erros + 1
      setErros(erroAtualizado)
      setTentativas(tentativasAtualizado)
      setMensagem(`A letra ${letraUpper} está incorreta.`)
      playSound(false)
    }

    const teclasAtualizadas = teclas.map((teclaOriginal) => {
      if (teclaOriginal.letra === teclaClicada.letra) {
        return { ...teclaOriginal, clicado: true }
      } else {
        return teclaOriginal
      }
    });

    setTeclas(teclasAtualizadas)

    const pontuacaoMaxima = 100
    const pontosPerdidosPorErro = pontuacaoMaxima / 6
    const pontosPerdidos = erroAtualizado * pontosPerdidosPorErro
    const pontuacao = Math.floor(pontuacaoMaxima - pontosPerdidos)

    if (erroAtualizado >= 6) {
      setTimeout(() => {
        navigation.navigate('ForcaEndScreen', { resultado: 'perdeu', pontuacao, palavraAtual })
      }, 1000)
    } else if (
      palavraAtual
        .toUpperCase()
        .split('')
        .every((l) => tentativasAtualizado.includes(l))
    ) {
      navigation.navigate('ForcaEndScreen', { resultado: 'ganhou', pontuacao, palavraAtual })
    }
  }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <ScrollView style={styles.forcaContainer} contentContainerStyle={styles.forcaContent}>

      <TouchableOpacity style={styles.infoIcon} onPress={toggleInfo}>
        <Image style={styles.infoIcon} source={infoIcon} alt="Informação" />
      </TouchableOpacity>


      <View style={showInfo ? styles.infoBubbleShow : styles.infoBubble}>
        <Text>Adivinhe a palavra secreta, antes de atingir os seis erros.</Text>
      </View>

      <Image
        source={forcaImagens[erros]}
        alt="Imagem da Forca"
        style={styles.forcaImagem}
      />
      <Text style={styles.dica}>Dica: {grupoAtual.dica}</Text>
      <Text style={styles.palavra}>Palavra: {renderPalavra()}</Text>
      <Text style={styles.erros}>Erros: {erros} de 6</Text>

      <View style={styles.teclado}>
        {teclas.map((tecla, index) => (
          <TouchableOpacity
            key={index}
            style={tecla.clicado ? styles.teclaDisabled : styles.tecla}
            disabled={tecla.clicado || erros >= 6}
            onPress={() => onClickTecla(tecla)}
          >
            <Text>{tecla.letra}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {mensagem && <Text className="mensagem">{mensagem}</Text>}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  forcaContainer: {
    flex: 1,
    backgroundColor: '#F2E8DF',
  },
  forcaContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  infoIcon: {
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    cursor: 'pointer',
  },
  infoBubble: {
    top: 60,
    right: 20,
    backgroundColor: '#FFEE81',
    fontFamily: 'Fredoka',
    color: '#333333',
    padding: 10,
    paddingRight: 20,
    borderRadius: 8,
    width: 250,
    opacity: 0
  },
  infoBubbleShow: {
    top: 0,
    right: 0,
    backgroundColor: '#FFEE81',
    fontFamily: 'Fredoka',
    color: '#333333',
    padding: 10,
    paddingRight: 20,
    borderRadius: 8,
    width: 250,
    opacity: 1
  },
  forcaImagem: {
    width: 400,
    height: 300,
    objectFit: 'contain',
    marginBottom: 10,
  },
  teclado: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    maxWidth: '100%',
  },
  tecla: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f2bcbc',
    border: '2px solid #333333',
    fontFamily: 'Fredoka',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    cursor: 'pointer',
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 24,
  },
  teclaDisabled: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#dddddd',
    border: '2px solid #333333',
    fontFamily: 'Fredoka',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    cursor: 'not-allowed',
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 24,
  },
  dica: {
    fontSize: 14,
    fontFamily: 'Fredoka',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  palavra: {
    fontSize: 16,
    fontFamily: 'Fredoka',
    color: '#333333',
    letterSpacing: 4,
    marginBottom: 10,
    textAlign: 'center',
  },
  erros: {
    fontSize: 14,
    fontFamily: 'Fredoka',
    color: '#f28585',
    marginBottom: 10,
    textAlign: 'center',
  }
});

export default ForcaGameScreen
