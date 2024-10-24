import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import RenderizarLetras from '../../components/anagrama/AnagramaLetraRender';
import RenderizarPalavrasEscondidas from '../../components/anagrama/AnagramaRevelaPalavra';
import ImagemIcone from '../../components/anagrama/AnagramaImagemIcone';
import AnagramaBotoes from '../../components/anagrama/AnagramaBotoes';
import { ANAGRAMA_RESULT_SCREEN } from '../../constants/screens';
import '../../components/visual/AnagramaGameVisual.css';
import infoIcon from '../../img/duvida.png';
import { playCorrectAnswerSound, playWrongAnswerSound } from '../../services/util/audio';

const AnagramaGameScreen = ({ navigation, route }) => {
  const { anagramaSettings } = route.params;
  const [showInfo, setShowInfo] = useState(false);
  const [pontuacao, setPontuacao] = useState(anagramaSettings.pontuacaoMaxima);
  const [letrasEmbaralhadas, setLetrasEmbaralhadas] = useState(anagramaSettings.letras);
  const [palavraAtual, setPalavraAtual] = useState('');
  const [erros, setErros] = useState(0);
  const [palavrasDescobertas, setPalavrasDescobertas] = useState([]);
  const [dicasUsadas, setDicasUsadas] = useState(0);
  const [mensagem, setMensagem] = useState(''); // Estado para a mensagem
  const [showMensagem, setShowMensagem] = useState(false); // Controla a exibição do balão
  
  const playSound = (isCorrect) => {
    if (isCorrect) {
      playCorrectAnswerSound();
    } else {
      playWrongAnswerSound();
    }
  };

  useEffect(() => {
    if (palavrasDescobertas.length === anagramaSettings.palavrasEscondidas.length) {
      navigation.navigate(ANAGRAMA_RESULT_SCREEN, { pontuacao });
    }
  }, [palavrasDescobertas, anagramaSettings.palavrasEscondidas.length, pontuacao, navigation]);

  const exibirMensagem = (texto) => {
    setMensagem(texto);
    setShowMensagem(true);
    setTimeout(() => {
      setShowMensagem(false);
    }, 3000); // Mostra a mensagem por 3 segundos
  };

  const verificarPalavra = () => {
    const palavraFormada = palavraAtual.toUpperCase();
    const palavraEscondida = anagramaSettings.palavrasEscondidas.find(
      (palavraObj) => palavraObj.palavra === palavraFormada
    );

    if (palavraEscondida) {
      if (!palavrasDescobertas.includes(palavraFormada)) {
        playSound(true);
        setPalavrasDescobertas([...palavrasDescobertas, palavraFormada]);
        exibirMensagem('Você Acertou!');
      } else {
        playSound(false);
        exibirMensagem('Você já descobriu essa palavra.');
      }
    } else {
      playSound(false);
      setErros((prevErros) => prevErros + 1);
      setPontuacao((prevPontuacao) => Math.max(0, prevPontuacao - anagramaSettings.perdaPorErro));
      exibirMensagem('Palavra incorreta.');
    }

    setPalavraAtual('');
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const incrementarDicasUsadas = () => {
    setDicasUsadas((prevDicasUsadas) => prevDicasUsadas + 1);
    setPontuacao((prevPontuacao) => Math.max(0, prevPontuacao - anagramaSettings.perdaPorDica));
  };

  return (
    <div className="anagrama-game-container">
      <div className="info-icon" onClick={toggleInfo}>
        <img src={infoIcon} alt="Informação" />
      </div>
      <div className={`info-bubble ${showInfo ? 'show' : ''}`}>
        <p>Reorganize as letras embaralhadas para formar palavras válidas.</p>
      </div>

      <p className='texto'>Tema: {anagramaSettings.tema}</p>
      <p className='texto'>Erros: {erros}</p>

      <p className='texto'> Dicas usadas: {dicasUsadas}</p>

      <ImagemIcone imagens={anagramaSettings.imagens} />

      <p className="hidden-words-title">Palavras Escondidas:</p>

      <div className="hidden-words-container">
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
      </div>

      <div className="current-word">
        {palavraAtual || ' '}
      </div>

      <div className="letras-container">
        <RenderizarLetras
          letrasEmbaralhadas={letrasEmbaralhadas}
          onLetraPress={(letra) => setPalavraAtual(palavraAtual + letra)}
        />
      </div>

      <AnagramaBotoes
        onEnviarPress={verificarPalavra}
        onApagarPress={() => setPalavraAtual('')}
      />

      {/* Balão de mensagem */}
      {showMensagem && (
        <div className="message-balloon">
          <p>{mensagem}</p>
        </div>
      )}
    </div>
  );
};

export default AnagramaGameScreen;
