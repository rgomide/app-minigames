import React from 'react'
import '../../components/visual/AnagramaGameVisual.css'

const RenderizarLetras = ({ letrasEmbaralhadas, onLetraPress }) => {
  return (
    <div className="letras-container">
      {letrasEmbaralhadas.map((letra, index) => (
        <div
          key={index}
          className="letra-item"
          onClick={() => onLetraPress(letra)}
        >
          {letra}
        </div>
      ))}
    </div>
  );
};

export default RenderizarLetras;
