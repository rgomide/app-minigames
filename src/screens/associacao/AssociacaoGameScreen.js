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
  const [score, setScore] = useState(0)

  useEffect(() => {
    setItens(
      shuffleArray([...associacaoSettings.items.map((i) => ({ id: i.id, content: i.item }))])
    )
    setRelacoes(
      shuffleArray([...associacaoSettings.items.map((i) => ({ id: i.id, content: i.relacao }))])
    )
  }, [associacaoSettings])

  useEffect(() => {
    if (selectedItem && selectedRelacao) {
      const isCorrect = selectedItem.id === selectedRelacao.id
      setFeedbackColor(isCorrect ? 'green' : 'red')
      setIsClickable(false)

      const timeout = setTimeout(() => {
        if (isCorrect) {
          setCorrectMatches((prevMatches) => [...prevMatches, selectedItem.id])
          setScore((prevScore) => prevScore + 10)
        } else {
          setScore((prevScore) => prevScore - 5)
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
      navigation.navigate('AssociacaoResultScreen', { finalScore: score })
    }
  }, [correctMatches, associacaoSettings.items.length, navigation, score])

  const isItemDisabled = (id) => correctMatches.includes(id)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{associacaoSettings.topic}</Text>

      <View style={styles.gameArea}>
        <View style={styles.column}>
          <FlatList
            data={itens}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.itemContainer,
                  selectedItem && selectedItem.id === item.id
                    ? { backgroundColor: feedbackColor }
                    : null,
                  isItemDisabled(item.id) ? styles.disabled : null
                ]}
                onPress={() => isClickable && !isItemDisabled(item.id) && setSelectedItem(item)}
              >
                {item.content.startsWith('http') ? (
                  <Image
                    source={{ uri: item.content }}
                    style={[styles.image, isItemDisabled(item.id) ? styles.disabledImage : null]}
                  />
                ) : (
                  <Text style={isItemDisabled(item.id) ? styles.disabledText : null}>
                    {item.content}
                  </Text>
                )}
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View style={styles.column}>
          <FlatList
            data={relacoes}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.itemContainer,
                  selectedRelacao && selectedRelacao.id === item.id
                    ? { backgroundColor: feedbackColor }
                    : null,
                  isItemDisabled(item.id) ? styles.disabled : null
                ]}
                onPress={() => isClickable && !isItemDisabled(item.id) && setSelectedRelacao(item)}
              >
                {item.content.startsWith('http') ? (
                  <Image
                    source={{ uri: item.content }}
                    style={[styles.image, isItemDisabled(item.id) ? styles.disabledImage : null]}
                  />
                ) : (
                  <Text style={isItemDisabled(item.id) ? styles.disabledText : null}>
                    {item.content}
                  </Text>
                )}
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  gameArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  column: {
    flex: 1,
    paddingHorizontal: 10
  },
  itemContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  disabled: {
    backgroundColor: '#e0e0e0'
  },
  disabledText: {
    color: '#a0a0a0'
  },
  disabledImage: {
    tintColor: '#a0a0a0'
  }
})

export default AssociacaoGameScreen
