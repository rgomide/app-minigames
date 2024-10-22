import React, { useState, useEffect } from 'react';
import RenderizarLetras from '../../components/anagrama/AnagramaLetraRender';
import RenderizarPalavrasEscondidas from '../../components/anagrama/AnagramaRevelaPalavra';
import ImagemIcone from '../../components/anagrama/AnagramaImagemIcone';
import AnagramaBotoes from '../../components/anagrama/AnagramaBotoes';
import { ANAGRAMA_RESULT_SCREEN } from '../../constants/screens';
import '../../components/visual/AnagramaBotao.css';

const AnagramaGameScreen = ({ navigation, route }) => {
  const { anagramaSettings } = route.params;

  const [pontuacao, setPontuacao] = useState(anagramaSettings.pontuacaoMaxima);
  const [letrasEmbaralhadas, setLetrasEmbaralhadas] = useState(anagramaSettings.letras);
  const [palavraAtual, setPalavraAtual] = useState('');
  const [erros, setErros] = useState(0);
  const [palavrasDescobertas, setPalavrasDescobertas] = useState([]);
  const [dicasUsadas, setDicasUsadas] = useState(0);

  useEffect(() => {
    if (palavrasDescobertas.length === anagramaSettings.palavrasEscondidas.length) {
      navigation.navigate(ANAGRAMA_RESULT_SCREEN, { pontuacao });
    }
  }, [palavrasDescobertas, anagramaSettings.palavrasEscondidas.length, pontuacao, navigation]);

  const verificarPalavra = () => {
    const palavraFormada = palavraAtual.toUpperCase();
    const palavraEscondida = anagramaSettings.palavrasEscondidas.find(
      (palavraObj) => palavraObj.palavra === palavraFormada
    );

    if (palavraEscondida) {
      if (!palavrasDescobertas.includes(palavraFormada)) {
        setPalavrasDescobertas([...palavrasDescobertas, palavraFormada]);
      } else {
        alert('Você já descobriu essa palavra.');
      }
    } else {
      setErros((prevErros) => prevErros + 1);
      setPontuacao((prevPontuacao) => Math.max(0, prevPontuacao - anagramaSettings.perdaPorErro));
      alert('Palavra incorreta.');
    }

    setPalavraAtual('');
  };

  const incrementarDicasUsadas = () => {
    setDicasUsadas((prevDicasUsadas) => prevDicasUsadas + 1);
    setPontuacao((prevPontuacao) => Math.max(0, prevPontuacao - anagramaSettings.perdaPorDica));
  };

  return (
    <div className="anagrama-game-container">
      <div className="game-header">
        <p className="header-text">Tema: {anagramaSettings.tema}</p>
        <p className="header-text">Erros: {erros}</p>
        <p className="header-text">Dicas usadas: {dicasUsadas}</p>
      </div>

      <p className="game-enunciado">{anagramaSettings.enunciado}</p>

      <ImagemIcone imagens={anagramaSettings.imagens} />

      <p className="hidden-words-title">Palavras Escondidas:</p>

      <div className="hidden-words-container">
        {anagramaSettings.palavrasEscondidas.map((item, index) => (
          <RenderizarPalavrasEscondidas
            key={index}
            item={item}
            palavrasDescobertas={palavrasDescobertas}
            onDicaUsada={incrementarDicasUsadas}
            resetDicas={dicasUsadas === 0}
          />
        ))}
      </div>

      <div className="current-word">
        <span>{palavraAtual || ' '}</span>
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
    </div>
  );
};

export default AnagramaGameScreen;
