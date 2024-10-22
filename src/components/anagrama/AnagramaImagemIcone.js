import React from 'react'
import '../../components/visual/AnagramaGameVisual.css'

const ImagemIcone = ({ imagens = [] }) => {
  if (imagens.length === 0) {
    return null;
  }

  return (
    <div className="anagrama-imagem-container">
      {imagens.map((imagem, index) => (
        <img
          key={index}
          src={imagem}
          alt={`Ícone ${index}`}
          className="anagrama-imagem"
        />
      ))}
    </div>
  );
};

export default ImagemIcone;
