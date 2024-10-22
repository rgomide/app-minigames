import React, { useState } from 'react';
import '../components/visual/MainMenuScreenVisual.css';
import {
  ANAGRAMA_START_SCREEN,
  ASSOCIACAO_START_SCREEN,
  FORCA_START_SCREEN,
  QUIZ_START_SCREEN
} from '../constants/screens.js';

const GameCard = ({ gameName, iconSrc, description, onPlay, bgColor, gradientColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`game-card ${isExpanded ? 'expanded' : ''}`}
      onClick={handleExpand}
      style={{ background: `linear-gradient(145deg, ${bgColor}, ${gradientColor})` }}
    >
      <div className="game-icon">
        <img src={require(`../img/${iconSrc}`)} alt={gameName} className="game-icon-img" />
      </div>
      <h3 className="game-title">{gameName}</h3>

      {isExpanded && (
        <div className="game-description">
          <p>{description}</p>
          <img 
            src={require('../img/play.png')} 
            alt="Play" 
            className="play-icon" 
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
          />
        </div>
      )}
    </div>
  );
};

const MainMenuScreen = ({ navigation }) => {
  return (
    <div className="game-menu">
      <GameCard
        gameName="Anagrama"
        iconSrc="icone_anagrama.png"
        description="Forme palavras a partir de letras embaralhadas."
        onPlay={() => navigation.navigate(ANAGRAMA_START_SCREEN)}
      />

      <GameCard
        gameName="Associação"
        iconSrc="icone_associacao.png"
        description="Associe corretamente os pares."
        onPlay={() => navigation.navigate(ASSOCIACAO_START_SCREEN)}
      />

      <GameCard
        gameName="Forca"
        iconSrc="icone_forca.png"
        description="Acerte a palavra oculta antes que seja enforcado."
        onPlay={() => navigation.navigate(FORCA_START_SCREEN)}
      />

      <GameCard
        gameName="Quiz"
        iconSrc="icone_quiz.png"
        description="Responda perguntas e teste seus conhecimentos."
        onPlay={() => navigation.navigate(QUIZ_START_SCREEN)}
      />
    </div>
  );
};

export default MainMenuScreen;
