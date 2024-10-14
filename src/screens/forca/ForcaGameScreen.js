import React, { useState } from 'react'
import { View, Text, Button, Image } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'

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
  ])

  const [grupoAtual] = useState(tema.grupos[Math.floor(Math.random() * tema.grupos.length)])
  const [palavraAtual] = useState(
    grupoAtual.palavras[Math.floor(Math.random() * grupoAtual.palavras.length)]
  )
  const [tentativas, setTentativas] = useState([])
  const [erros, setErros] = useState(0)
  const [mensagem, setMensagem] = useState('')

  const renderPalavra = () => {
    return palavraAtual
      .toUpperCase()
      .split('')
      .map((letra) => (tentativas.includes(letra) ? letra : '_'))
      .join(' ')
  }

  const onClickTecla = (teclaClicada) => {
    const letraUpper = teclaClicada.letra.toUpperCase()

    const tentativasAtualizado = [...tentativas, letraUpper]

    let erroAtualizado = erros

    if (palavraAtual.toUpperCase().includes(letraUpper)) {
      setTentativas(tentativasAtualizado)
      setMensagem(`A letra ${letraUpper} está correta!`)
    } else {
      erroAtualizado = erros + 1
      setErros(erroAtualizado)
      setTentativas(tentativasAtualizado)
      setMensagem(`A letra ${letraUpper} está incorreta.`)
    }

    const teclasAtualizadas = teclas.map((teclaOriginal) => {
      if (teclaOriginal.letra === teclaClicada.letra) {
        return { ...teclaOriginal, clicado: true }
      } else {
        return teclaOriginal
      }
    })

    setTeclas(teclasAtualizadas)

  // Cálculo da pontuação
  const pontuacaoMaxima = 100
  const pontosPerdidosPorErro = pontuacaoMaxima / 6 
  const pontosPerdidos = erroAtualizado * pontosPerdidosPorErro
  const pontuacao = Math.floor(pontuacaoMaxima - pontosPerdidos)  

  if (erroAtualizado >= 6) {
    navigation.navigate('ForcaEndScreen', { resultado: 'perdeu', pontuacao, palavraAtual })  // Passa a pontuação
  } else if (
    palavraAtual
      .toUpperCase()
      .split('')
      .every((l) => tentativasAtualizado.includes(l))
  ) {
    navigation.navigate('ForcaEndScreen', { resultado: 'ganhou', pontuacao })  // Passa a pontuação
  }
}

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

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {teclas.map((tecla) => (
          <Button
            title={tecla.letra}
            disabled={tecla.clicado}
            onPress={() => onClickTecla(tecla)}
          />
        ))}
      </View>
    </View>
  )
}

export default ForcaGameScreen
