import React, { useState } from 'react'
import { View, Text, TextInput, Button, Image } from 'react-native'
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
  const [letra, setLetra] = useState('')
  const [erros, setErros] = useState(0)
  const [mensagem, setMensagem] = useState('')

  const handleTentativa = () => {
    const letraUpper = letra.toUpperCase()

    if (tentativas.includes(letraUpper)) {
      setMensagem(`Você já tentou a letra ${letraUpper}.`)
    } else if (palavraAtual.toUpperCase().includes(letraUpper)) {
      setTentativas([...tentativas, letraUpper])
      setMensagem(`A letra ${letraUpper} está correta!`)
    } else {
      setErros(erros + 1)
      setTentativas([...tentativas, letraUpper])
      setMensagem(`A letra ${letraUpper} está incorreta.`)
    }

    setLetra('')

    if (erros + 1 >= 6) {
      navigation.navigate('ForcaEndScreen', { resultado: 'perdeu' })
    } else if (
      palavraAtual
        .toUpperCase()
        .split('')
        .every((l) => tentativas.includes(l))
    ) {
      navigation.navigate('ForcaEndScreen', { resultado: 'ganhou' })
    }
  }

  const renderPalavra = () => {
    return palavraAtual
      .toUpperCase()
      .split('')
      .map((letra, index) => (
        <Text key={index} style={{ fontSize: 24, marginRight: 5 }}>
          {tentativas.includes(letra) ? letra : '_'}
        </Text>
      ))
  }

  const onClickTecla = (teclaClicada) => {
    const teclasAtualizadas = teclas.map((teclaOriginal) => {
      if (teclaOriginal.letra === teclaClicada.letra) {
        return { ...teclaOriginal, clicado: true }
      } else {
        return teclaOriginal
      }
    })

    setTeclas(teclasAtualizadas)
  }

  return (
    <View>

      <Text>Tema: {tema.tema}</Text>

      <Text>Dica: {grupoAtual.dica}</Text>

      {grupoAtual.imagem && (
        <Image
          source={{ uri: grupoAtual.imagem }}
          style={{ width: 200, height: 200, marginBottom: 20 }}
          resizeMode="contain"
        />
      )}

      <Text>Palavra:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{renderPalavra()}</View>

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

      <TextInput
        value={letra}
        onChangeText={setLetra}
        maxLength={1}
        placeholder="Digite uma letra"
        style={{ borderBottomWidth: 1, marginBottom: 20, textAlign: 'center', fontSize: 24 }}
      />

      <Button title="Tentar Letra" onPress={handleTentativa} />

      {mensagem ? <Text>{mensagem}</Text> : null}
    </View>
  )
}

export default ForcaGameScreen
