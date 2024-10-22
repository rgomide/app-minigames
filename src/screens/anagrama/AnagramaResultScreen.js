import React, { useEffect } from 'react';
import vitoriaSound from '../../sounds/vitoria.mp3';
import derrotaSound from '../../sounds/derrota.mp3'; 
import confeteGif from '../../img/confete.gif';
import vitoriaIcon from '../../img/vitoriaIcon.png';  
import derrotaIcon from '../../img/derrotaIcon.png';

const AnagramaResultScreen = ({ route, navigation }) => {
  const { pontuacao } = route.params;

  useEffect(() => {
    if (pontuacao > 0) {
      const audio = new Audio(vitoriaSound);
      audio.play();
    } else {
      const audio = new Audio(derrotaSound);
      audio.play();
    }
  }, [pontuacao]);

  return (
    <div className="end-screen-container">
      {pontuacao > 0 && (
        <div><img src={vitoriaIcon} alt="Vitória" className="resultado-icone" /></div>   
      )}
      {pontuacao > 0 && (
          <div className="confetti-wrapper">
          <img src={confeteGif} alt="Confete" className="confetti-gif-left" />
          <h1 className="quiz-result-title-vitoria">Você ganhou!</h1>
          <img src={confeteGif} alt="Confete" className="confetti-gif-right" />
        </div>
        )}

      {pontuacao === 0 && (
          <div>
            <img src={derrotaIcon} alt="Derrota" className="resultado-icone" />
            <h1 className="quiz-result-title-derrota">Você perdeu!</h1>
          </div>
      )}
      
      
      <p className="pontuacao">Pontuação Final: {pontuacao}</p>

      <div className="button-container">
        <button
          className="btn jogar-novamente"
          onClick={() => navigation.navigate('AnagramaStartScreen')}
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

export default AnagramaResultScreen;
