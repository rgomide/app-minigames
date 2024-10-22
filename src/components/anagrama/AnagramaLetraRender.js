import React from 'react';
import '../../components/visual/AnagramaBotao.css'

const RenderizarLetras = ({ letrasEmbaralhadas, onLetraPress }) => {
  if (!letrasEmbaralhadas || !Array.isArray(letrasEmbaralhadas)) {
    return null;
  }

  return (
    <div className="letrasContainer">
      {letrasEmbaralhadas.map((letra, index) => (
        <button
          key={index}
          className="letraButton"
          onClick={() => onLetraPress(letra)}
        >
          {letra}
        </button>
      ))}
    </div>
  );
};

export default RenderizarLetras;
