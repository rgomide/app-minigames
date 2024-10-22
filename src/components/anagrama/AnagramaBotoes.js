import React from 'react';
import '../../components/visual/AnagramaBotao.css'

const AnagramaBotoes = ({ onEnviarPress, onApagarPress }) => {
  return (
    <div className="buttonRow">
      <button className="enviarButton" onClick={onEnviarPress}>
        Enviar Palavra
      </button>

      <button className="iconButton apagarButton" onClick={onApagarPress}>
        <img src={require('../../../assets/backspace.png')} alt="Apagar" className="iconImage" />
      </button>
    </div>
  );
};

export default AnagramaBotoes;
