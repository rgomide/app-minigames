import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import img0 from '../../img/img0.png';
import img1 from '../../img/img1.png';
import img2 from '../../img/img2.png';
import img3 from '../../img/img3.png';
import img4 from '../../img/img4.png';
import img5 from '../../img/img5.png';
import img6 from '../../img/img6.png';
import '../../components/visual/ForcaGameVisual.css';
import infoIcon from '../../img/duvida.png';
import corretoSound from '../../sounds/correto.mp3';
import erradoSound from '../../sounds/errado.mp3'; 

const ForcaGameScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { tema } = route.params;

  const [teclas, setTeclas] = useState([
    { letra: 'A', clicado: false },
    { letra: 'B', clicado: false },
    { letra: 'C', clicado: false },
    { letra: 'D', clicado: false },
    { letra: 'E', clicado: false },
    { letra: 'F', clicado: false },
    { letra: 'G', clicado: false },
    { letra: 'H', clicado: false },
    { letra: 'I', clicado: false },
    { letra: 'J', clicado: false },
    { letra: 'K', clicado: false },
    { letra: 'L', clicado: false },
    { letra: 'M', clicado: false },
    { letra: 'N', clicado: false },
    { letra: 'O', clicado: false },
    { letra: 'P', clicado: false },
    { letra: 'Q', clicado: false },
    { letra: 'R', clicado: false },
    { letra: 'S', clicado: false },
    { letra: 'T', clicado: false },
    { letra: 'U', clicado: false },
    { letra: 'V', clicado: false },
    { letra: 'W', clicado: false },
    { letra: 'X', clicado: false },
    { letra: 'Y', clicado: false },
    { letra: 'Z', clicado: false }
  ]);

  const corretoAudio = new Audio(corretoSound);
  const erradoAudio = new Audio(erradoSound);

  const [grupoAtual] = useState(tema.grupos[Math.floor(Math.random() * tema.grupos.length)]);
  const [palavraAtual] = useState(
    grupoAtual.palavras[Math.floor(Math.random() * grupoAtual.palavras.length)]
  );
  const [tentativas, setTentativas] = useState([]);
  const [erros, setErros] = useState(0);
  const [mensagem, setMensagem] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const forcaImagens = [img0, img1, img2, img3, img4, img5, img6];

  const renderPalavra = () => {
    return palavraAtual
      .toUpperCase()
      .split('')
      .map((letra) => (tentativas.includes(letra) ? letra : '_'))
      .join(' ');
  };

  const playSound = (isCorrect) => {
    if (isCorrect) {
      corretoAudio.play();
    } else {
      erradoAudio.play();
    }
  };

  const onClickTecla = (teclaClicada) => {
    const letraUpper = teclaClicada.letra.toUpperCase();

    const tentativasAtualizado = [...tentativas, letraUpper];

    let erroAtualizado = erros;

    if (palavraAtual.toUpperCase().includes(letraUpper)) {
      setTentativas(tentativasAtualizado);
      setMensagem(`A letra ${letraUpper} está correta!`);
      playSound(true);
    } else {
      erroAtualizado = erros + 1;
      setErros(erroAtualizado);
      setTentativas(tentativasAtualizado);
      setMensagem(`A letra ${letraUpper} está incorreta.`);
      playSound(false);
    }

    const teclasAtualizadas = teclas.map((teclaOriginal) => {
      if (teclaOriginal.letra === teclaClicada.letra) {
        return { ...teclaOriginal, clicado: true };
      } else {
        return teclaOriginal;
      }
    });

    setTeclas(teclasAtualizadas);

    const pontuacaoMaxima = 100;
    const pontosPerdidosPorErro = pontuacaoMaxima / 6;
    const pontosPerdidos = erroAtualizado * pontosPerdidosPorErro;
    const pontuacao = Math.floor(pontuacaoMaxima - pontosPerdidos);

    if (erroAtualizado >= 6) {
      setTimeout(() => {
        navigation.navigate('ForcaEndScreen', { resultado: 'perdeu', pontuacao, palavraAtual });
      }, 1000);
    } else if (
      palavraAtual
        .toUpperCase()
        .split('')
        .every((l) => tentativasAtualizado.includes(l))
    ) {
      navigation.navigate('ForcaEndScreen', { resultado: 'ganhou', pontuacao, palavraAtual });
    }
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="forca-container">
      
      <div className="info-icon" onClick={toggleInfo}>
        <img src={infoIcon} alt="Informação" />
      </div>


      <div className={`info-bubble ${showInfo ? 'show' : ''}`}>
        <p>Adivinhe a palavra secreta, antes de atingir os seis erros.</p>
      </div>

      <img
        src={forcaImagens[erros]} 
        alt="Imagem da Forca"
        className="forca-imagem"
      />
      <p className="dica">Dica: {grupoAtual.dica}</p>
      <p className="palavra">Palavra: {renderPalavra()}</p>
      <p className="erros">Erros: {erros} de 6</p>

      <div className="teclado">
        {teclas.map((tecla, index) => (
          <button
            key={index}
            className="tecla"
            disabled={tecla.clicado || erros >= 6}
            onClick={() => onClickTecla(tecla)}
          >
            {tecla.letra}
          </button>
        ))}
      </div>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
};

export default ForcaGameScreen;
