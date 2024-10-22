import React, { useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import '../../components/visual/ForcaEndVisual.css';
import confeteGif from '../../img/confete.gif';
import vitoriaIcon from '../../img/vitoriaIcon.png';  
import derrotaIcon from '../../img/derrotaIcon.png'; 
import vitoriaSound from '../../sounds/vitoria.mp3';
import derrotaSound from '../../sounds/derrota.mp3';

const ForcaEndScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { resultado, pontuacao } = route.params;
  const vitoriaAudio = new Audio(vitoriaSound);
  const derrotaAudio = new Audio(derrotaSound);

  useEffect(() => {
    if (resultado === 'ganhou') {
      vitoriaAudio.play();
    } else if (resultado === 'perdeu') {
      derrotaAudio.play();
    }
  }, [resultado]);

  return (
    <div className="end-screen-container">

      {resultado=== 'ganhou' && (
        <div><img src={vitoriaIcon} alt="Vitória" className="resultado-icone" /></div>   
      )}
      {resultado === 'ganhou' && (
        <div className="confetti-wrapper">
          <img src={confeteGif} alt="Confete" className="confetti-gif-left" />
          <h1 className="quiz-result-title-vitoria">Você ganhou!</h1>
          <img src={confeteGif} alt="Confete" className="confetti-gif-right" />
          
        </div>
      )}

      {resultado === 'perdeu' && (
        <div>
          <img src={derrotaIcon} alt="Derrota" className="resultado-icone" />
          <h1 className="quiz-result-title-derrota">Você perdeu!</h1>       
        </div>
      )}

      <p className="pontuacao">Pontuação Final: {pontuacao}</p>

      <div className="button-container">
        <button
          className="btn jogar-novamente"
          onClick={() => navigation.navigate('ForcaStartScreen')}
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

export default ForcaEndScreen;
