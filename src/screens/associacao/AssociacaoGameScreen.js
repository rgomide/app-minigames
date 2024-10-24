import React, { useState, useEffect } from 'react'
import '../../components/visual/AssociacaoGameVisual.css'
import infoIcon from '../../img/duvida.png'
import { playCorrectAnswerSound, playWrongAnswerSound } from '../../services/util/audio';

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
  const [showInfo, setShowInfo] = useState(false)

  const playSound = (isCorrect) => {
    if (isCorrect) {
      playCorrectAnswerSound();
    } else {
      playWrongAnswerSound();
    }
  }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

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
      if (isCorrect) {
        playSound(true)
        setFeedbackClass('correct');
      } else {
        playSound(false)
        setFeedbackClass('incorrect');
      }

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
    <div className="associacao-game-container">

      <div className="info-icon" onClick={toggleInfo}>
        <img src={infoIcon} alt="Informação" />
      </div>
      <div className={`info-bubble ${showInfo ? 'show' : ''}`}>
        <p>Relacione os itens da coluna da direita com os itens da coluna da esquerda.</p>
      </div>

      <p className="associacao-title">{selectedTheme}</p>

      <div className="associacao-game-area">
        <div className="associacao-column-container">
          <div className="associacao-column">
            {itens.map((item) => (
              <button
                key={item.id}
                className={`associacao-item ${selectedItem && selectedItem.id === item.id ? feedbackClass : ''} ${isItemDisabled(item.id) ? 'disabled' : ''}`}
                onClick={() => isClickable && !isItemDisabled(item.id) && setSelectedItem(item)}
                disabled={isItemDisabled(item.id)}
              >
                <div className="associacao-content-container">
                  {item.content && <p>{item.content}</p>}
                  {item.imagem && <img src={item.imagem} alt={item.content} className={`associacao-image ${isItemDisabled(item.id) ? 'disabled-image' : ''}`} />}
                </div>
              </button>
            ))}
          </div>

          <div className="associacao-divider" />

          <div className="associacao-column">
            {relacoes.map((item) => (
              <button
                key={item.id}
                className={`associacao-item ${selectedRelacao && selectedRelacao.id === item.id ? feedbackClass : ''} ${isItemDisabled(item.id) ? 'disabled' : ''}`}
                onClick={() => isClickable && !isItemDisabled(item.id) && setSelectedRelacao(item)}
                disabled={isItemDisabled(item.id)}
              >
                <div className="associacao-content-container">
                  {item.content && <p>{item.content}</p>}
                  {item.imagem && <img src={item.imagem} alt={item.content} className={`associacao-image ${isItemDisabled(item.id) ? 'disabled-image' : ''}`} />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssociacaoGameScreen;
