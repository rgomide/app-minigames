import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { playCorrectAnswerSound, playWrongAnswerSound } from '../../services/util/audio';
import TooltipIcon from '../../components/TooltipIcon';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const AssociacaoGameScreen = ({ route, navigation }) => {
  const { associacaoSettings, selectedTheme } = route.params;
  const [itens, setItens] = useState([]);
  const [relacoes, setRelacoes] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRelacao, setSelectedRelacao] = useState(null);
  const [correctMatches, setCorrectMatches] = useState([]);
  const [feedbackClass, setFeedbackClass] = useState('');
  const [isClickable, setIsClickable] = useState(true);
  const [score, setScore] = useState(100);
  const [showInfo, setShowInfo] = useState(false);

  const playSound = (isCorrect) => {
    if (isCorrect) {
      playCorrectAnswerSound();
    } else {
      playWrongAnswerSound();
    }
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  useEffect(() => {
    const itemsList = associacaoSettings.items.map((item) => ({
      id: item.id,
      content: item.associar[0].titulo,
      imagem: item.associar[0].imagem,
    }));

    const relationsList = associacaoSettings.items.map((item) => ({
      id: item.id,
      content: item.associar[1].titulo,
      imagem: item.associar[1].imagem,
    }));

    setItens(shuffleArray(itemsList));
    setRelacoes(shuffleArray(relationsList));
  }, [associacaoSettings]);

  useEffect(() => {
    if (selectedItem && selectedRelacao) {
      const isCorrect = selectedItem.id === selectedRelacao.id;
      playSound(isCorrect);
      setFeedbackClass(isCorrect ? 'correct' : 'incorrect');

      setIsClickable(false);
      const pointsPerWrong = 100 / (2 * associacaoSettings.items.length);

      const timeout = setTimeout(() => {
        if (isCorrect) {
          setCorrectMatches((prevMatches) => [...prevMatches, selectedItem.id]);
        } else {
          setScore((prevScore) => Math.max(prevScore - pointsPerWrong, 0));
        }
        setSelectedItem(null);
        setSelectedRelacao(null);
        setFeedbackClass('');
        setIsClickable(true);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [selectedItem, selectedRelacao]);

  useEffect(() => {
    if (correctMatches.length === associacaoSettings.items.length) {
      const finalScore = Math.max(Math.round(score), 0);
      navigation.navigate('AssociacaoResultScreen', { finalScore });
    }
  }, [correctMatches, associacaoSettings.items.length, navigation, score]);

  const isItemDisabled = (id) => correctMatches.includes(id);

  return (
    <ScrollView contentContainerStyle={styles.associacaoGameContainer}>
        <TooltipIcon text="Relacione os itens da coluna da direita com os itens da coluna da esquerda." />

      <Text style={styles.associacaoTitle}>{selectedTheme}</Text>

      <View style={styles.associacaoGameArea}>
        <View style={styles.associacaoColumnContainer}>
          <View style={styles.associacaoColumn}>
            {itens.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.associacaoItem,
                  selectedItem && selectedItem.id === item.id && styles.selected,
                  feedbackClass === 'correct' && selectedItem && selectedItem.id === item.id
                    ? styles.correct
                    : feedbackClass === 'incorrect' && selectedItem && selectedItem.id === item.id
                    ? styles.incorrect
                    : null,
                  isItemDisabled(item.id) && styles.disabled,
                ]}
                onPress={() => isClickable && !isItemDisabled(item.id) && setSelectedItem(item)}
                disabled={isItemDisabled(item.id)}
              >
                <View style={styles.associacaoContentContainer}>
                  {item.content && <Text>{item.content}</Text>}
                  {item.imagem && (
                    <Image
                      source={{ uri: item.imagem }}
                      style={[
                        styles.associacaoImage,
                        isItemDisabled(item.id) && styles.disabledImage,
                      ]}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.associacaoDivider} />

          <View style={styles.associacaoColumn}>
            {relacoes.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.associacaoItem,
                  selectedRelacao && selectedRelacao.id === item.id && styles.selected,
                  feedbackClass === 'correct' && selectedRelacao && selectedRelacao.id === item.id
                    ? styles.correct
                    : feedbackClass === 'incorrect' && selectedRelacao && selectedRelacao.id === item.id
                    ? styles.incorrect
                    : null,
                  isItemDisabled(item.id) && styles.disabled,
                ]}
                onPress={() => isClickable && !isItemDisabled(item.id) && setSelectedRelacao(item)}
                disabled={isItemDisabled(item.id)}
              >
                <View style={styles.associacaoContentContainer}>
                  {item.content && <Text>{item.content}</Text>}
                  {item.imagem && (
                    <Image
                      source={{ uri: item.imagem }}
                      style={[
                        styles.associacaoImage,
                        isItemDisabled(item.id) && styles.disabledImage,
                      ]}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  associacaoGameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F2E8DF',
  },
  associacaoGameArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  associacaoColumnContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 800,
  },
  associacaoColumn: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    gap: 10,
  },
  associacaoDivider: {
    width: 2,
    backgroundColor: '#433d59',
  },
  associacaoItem: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#7c9a96',
    color: 'white',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: '#4e6f6a',
  },
  correct: {
    borderColor: 'green',
    borderWidth: 2,
  },
  incorrect: {
    borderColor: 'red',
    borderWidth: 2,
  },
  disabled: {
    backgroundColor: '#e0e0e0',
  },
  associacaoImage: {
    width: 80,
    height: 80,
    marginTop: 10,
  },
  disabledImage: {
    opacity: 0.5,
  },
  associacaoContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  associacaoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AssociacaoGameScreen;
