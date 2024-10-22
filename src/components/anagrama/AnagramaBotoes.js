import React from 'react';
import '../../components/visual/AnagramaGameVisual.css'; // Certifique-se que este arquivo está com os estilos atualizados

const AnagramaBotoes = ({ onEnviarPress, onApagarPress }) => {
  return (
    <div className="button-row">
      <button className="enviar-button" onClick={onEnviarPress}>
        Enviar Palavra
      </button>
      <button className="apagar-button" onClick={onApagarPress}>
        <img src={require('../../../assets/backspace.png')} alt="Apagar" className='apagar-button-img'/>
      </button>
    </div>
  );
};

export default AnagramaBotoes;
