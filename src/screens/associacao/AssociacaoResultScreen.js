import React, { useEffect } from 'react';
import '../../components/visual/AssociacaoEndVisual.css';
import vitoriaSound from '../../sounds/vitoria.mp3';
import derrotaSound from '../../sounds/derrota.mp3';
import confeteGif from '../../img/confete.gif';

const vitoriaAudio = new Audio(vitoriaSound);
const derrotaAudio = new Audio(derrotaSound);

const AssociacaoResultScreen = ({ route, navigation }) => {
  const { finalScore } = route.params;
  const displayScore = finalScore < 0 ? 0 : finalScore;

  useEffect(() => {
    if (displayScore > 0) {
      vitoriaAudio.play();
    } else {
      derrotaAudio.play();
    }
  }, [displayScore]);

  return (
    <div className="end-screen-container">

        {displayScore > 0 && (
          <div className="confetti-wrapper">
          <img src={confeteGif} alt="Confete" className="confetti-gif-left" />
          <h1 className="quiz-result-title-vitoria">Você ganhou!</h1>
          <img src={confeteGif} alt="Confete" className="confetti-gif-right" />
        </div>
        )}

        {displayScore === 0 && (
        <h1 className="quiz-result-title-derrota">Você perdeu!</h1>
        )}

      
        <p className="pontuacao">Pontuação Final: {displayScore}</p>
      

      <div className="button-container">
        <button
          className="btn jogar-novamente"
          onClick={() => navigation.navigate('AssociacaoStartScreen')}
        >
          Jogar Novamente
        </button>

        <button
          className="btn voltar-inicio"
          onClick={() => navigation.navigate('MainMenuScreen')}
        >
          Voltar ao início
        </button>
      </div>
    </div>
  );
};

export default AssociacaoResultScreen;
