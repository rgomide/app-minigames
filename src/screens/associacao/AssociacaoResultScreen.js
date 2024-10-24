import React, { useEffect } from 'react';
import '../../components/visual/AssociacaoEndVisual.css';
import confeteGif from '../../img/confete.gif';
import vitoriaIcon from '../../img/vitoriaIcon.png';
import derrotaIcon from '../../img/derrotaIcon.png';
import { playWinGameSound, playLoseGameSound } from '../../services/util/audio';

const AssociacaoResultScreen = ({ route, navigation }) => {
  const { finalScore } = route.params;
  const displayScore = finalScore < 0 ? 0 : finalScore;

  useEffect(() => {
    if (displayScore > 0) {
      playWinGameSound();
    } else {
      playLoseGameSound();
    }
  }, [displayScore]);

  return (
    <div className="end-screen-container">
      {displayScore > 0 && (
        <div><img src={vitoriaIcon} alt="Vitória" className="resultado-icone" /></div>
      )}

      {displayScore > 0 && (
        <div className="confetti-wrapper">
          <img src={confeteGif} alt="Confete" className="confetti-gif-left" />
          <h1 className="quiz-result-title-vitoria">Você ganhou!</h1>
          <img src={confeteGif} alt="Confete" className="confetti-gif-right" />
        </div>
      )}

      {displayScore === 0 && (
        <div>
          <img src={derrotaIcon} alt="Derrota" className="resultado-icone" />
          <h1 className="quiz-result-title-derrota">Você perdeu!</h1>
        </div>
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
