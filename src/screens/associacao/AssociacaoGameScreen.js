import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5)
}

const AssociacaoGameScreen = ({ route, navigation }) => {
  const { associacaoSettings } = route.params
  const [itens, setItens] = useState([])
  const [relacoes, setRelacoes] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedRelacao, setSelectedRelacao] = useState(null)
  const [correctMatches, setCorrectMatches] = useState([])
  const [feedbackColor, setFeedbackColor] = useState('#ddd')
  const [isClickable, setIsClickable] = useState(true)
  const [score, setScore] = useState(100)

  useEffect(() => {
    const itemsList = associacaoSettings.items.map((item) => ({
      id: item.id,
      content: item.associar[0].titulo,
      imagem: item.associar[0].imagem,
    }))

    const relationsList = associacaoSettings.items.map((item) => ({
      id: item.id,
      content: item.associar[1].titulo,
      imagem: item.associar[1].imagem,
    }))

    setItens(shuffleArray(itemsList))
    setRelacoes(shuffleArray(relationsList))
  }, [associacaoSettings])

  useEffect(() => {
    if (selectedItem && selectedRelacao) {
      const isCorrect = selectedItem.id === selectedRelacao.id
      setFeedbackColor(isCorrect ? 'green' : 'red')
      setIsClickable(false)

      const pointsPerWrong = 100 / (2 * associacaoSettings.items.length) 

      const timeout = setTimeout(() => {
        if (isCorrect) {
          setCorrectMatches((prevMatches) => [...prevMatches, selectedItem.id])
        } else {
          setScore((prevScore) => Math.max(prevScore - pointsPerWrong, 0))
        }
        setSelectedItem(null)
        setSelectedRelacao(null)
        setFeedbackColor('#ddd')
        setIsClickable(true)
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [selectedItem, selectedRelacao])

  useEffect(() => {
    if (correctMatches.length === associacaoSettings.items.length) {
      const finalScore = Math.max(Math.round(score), 0)
      navigation.navigate('AssociacaoResultScreen', { finalScore })
    }
  }, [correctMatches, associacaoSettings.items.length, navigation, score])

  const isItemDisabled = (id) => correctMatches.includes(id)

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Toque em um item da coluna da esquerda e associe-o com um item da coluna da direita. 
      </Text>

      <View style={styles.gameArea}>
        <View style={styles.columnContainer}>
          <View style={styles.column}>
            <FlatList
              data={itens}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.itemContainer,
                    selectedItem && selectedItem.id === item.id ? { backgroundColor: feedbackColor } : null,
                    isItemDisabled(item.id) ? styles.disabled : null,
                  ]}
                  onPress={() => isClickable && !isItemDisabled(item.id) && setSelectedItem(item)}
                >
                  <View style={styles.contentContainer}>
                    {item.content && <Text style={isItemDisabled(item.id) ? styles.disabledText : null}>{item.content}</Text>}
                    {item.imagem && <Image source={{ uri: item.imagem }} style={[styles.image, isItemDisabled(item.id) ? styles.disabledImage : null]} />}
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.column}>
            <FlatList
              data={relacoes}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.itemContainer,
                    selectedRelacao && selectedRelacao.id === item.id ? { backgroundColor: feedbackColor } : null,
                    isItemDisabled(item.id) ? styles.disabled : null,
                  ]}
                  onPress={() => isClickable && !isItemDisabled(item.id) && setSelectedRelacao(item)}
                >
                  <View style={styles.contentContainer}>
                    {item.content && <Text style={isItemDisabled(item.id) ? styles.disabledText : null}>{item.content}</Text>}
                    {item.imagem && <Image source={{ uri: item.imagem }} style={[styles.image, isItemDisabled(item.id) ? styles.disabledImage : null]} />}
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  gameArea: {
    flex: 1,
  },
  columnContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  divider: {
    width: 2,
    backgroundColor: '#000',
    marginHorizontal: 10,
  },
  itemContainer: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 5,
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  disabled: {
    backgroundColor: '#e0e0e0',
  },
  disabledText: {
    color: '#a0a0a0',
  },
  disabledImage: {
    tintColor: '#a0a0a0',
  },
})

export default AssociacaoGameScreen