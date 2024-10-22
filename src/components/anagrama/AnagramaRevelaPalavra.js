import React, { useState, useEffect } from 'react';
import '../../components/visual/AnagramaGameVisual.css'

const RenderizarPalavrasEscondidas = ({ item, palavrasDescobertas, onDicaUsada, resetDicas }) => {
  const [dicaVisivel, setDicaVisivel] = useState(false);
  const palavraEncontrada = palavrasDescobertas.includes(item.palavra);

  useEffect(() => {
    if (resetDicas) {
      setDicaVisivel(false); 
    }
  }, [resetDicas]);

  const exibirDica = () => {
    setDicaVisivel(true);
    onDicaUsada(); 
  };

  return (
    <div className="palavra-escondida-container">
      <div className="palavra-letras">
        {item.palavra.split('').map((letra, index) => (
          <div key={index} className="letra-caixa">
            <span className="letra-texto">{palavraEncontrada ? letra : '_'}</span>
          </div>
        ))}

        <button
          onClick={exibirDica}
          className={`dica-botao ${dicaVisivel ? 'dica-desabilitada' : 'dica-habilitada'}`}
          disabled={dicaVisivel}
        >
          ?
        </button>
      </div>

      <div className="dica-texto-container">
        {dicaVisivel && <span className="dica-texto">{item.dica}</span>}
      </div>
    </div>
  );
};

export default RenderizarPalavrasEscondidas;
