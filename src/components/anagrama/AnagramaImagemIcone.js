import React from 'react';
import '../../components/visual/AnagramaImagem.css'

const ImagemIcone = ({ imagens = [] }) => {
  if (imagens.length === 0) {
    return null;
  }

  return (
    <div className="imagemIconeContainer">
      {imagens.map((imagem, index) => (
        <img
          key={index}
          src={imagem}
          alt={`Ícone ${index}`}
          className="imagemIcone"
          onError={(e) => console.log(`Erro ao carregar imagem ${imagem}:`, e.nativeEvent.error)}
        />
      ))}
    </div>
  );
};

export default ImagemIcone;
