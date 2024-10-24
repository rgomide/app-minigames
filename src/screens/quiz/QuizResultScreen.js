import QuizResultCard from '../../components/quiz/QuizResultCard'
import React, { useEffect } from 'react'
import '../../components/visual/QuizEndVisual.css'
import confeteGif from '../../img/confete.gif'
import vitoriaIcon from '../../img/vitoriaIcon.png';
import derrotaIcon from '../../img/derrotaIcon.png';
import { playWinGameSound, playLoseGameSound } from '../../services/util/audio';

const QuizResultScreen = (props) => {
  const {
    navigation,
    route: {
      params: { topic, answers, questions }
    }
  } = props

  const totalCorrectAnswers = answers.reduce((acc, answer) => {
    return answer.correct ? acc + 1 : acc
  }, 0)

  const totalCorrectAnswerTitle =
    totalCorrectAnswers === 1 ? 'resposta correta' : 'respostas corretas'

  const score = Math.floor(totalCorrectAnswers * (100 / questions.length))


  useEffect(() => {
    if (totalCorrectAnswers > 0) {
      playWinGameSound();
    } else if (totalCorrectAnswers < 1) {
      playLoseGameSound();
    }
  }, [totalCorrectAnswers])

  return (
    <div className="end-screen-container">

      {totalCorrectAnswers > 0 && (
        <div><img src={vitoriaIcon} alt="Vitória" className="resultado-icone" /></div>
      )}

      {totalCorrectAnswers > 0 && (
        <div className="confetti-wrapper">
          <img src={confeteGif} alt="Confete" className="confetti-gif-left" />
          <h1 className="quiz-result-title-vitoria">Você ganhou!</h1>
          <img src={confeteGif} alt="Confete" className="confetti-gif-right" />
        </div>
      )}

      {totalCorrectAnswerTitle === 0 && (
        <div>
          <img src={derrotaIcon} alt="Derrota" className="resultado-icone" />
          <h1 className="quiz-result-title-derrota">Você perdeu!</h1>
        </div>
      )}

      <div className="quiz-result-row">
        <span className="quiz-result-total">{totalCorrectAnswers} {totalCorrectAnswerTitle}</span>
      </div>
      <p className="pontuacao">Pontuação Final: {score}</p>


      <div className="quiz-result-list">
        {questions.map((question, index) => (
          <QuizResultCard key={index} question={question} answer={answers[index]} />
        ))}
      </div>

      <div className="button-container">
        <button
          className="btn jogar-novamente"
          onClick={() => navigation.navigate('QuizStartScreen')}
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
  )
}

export default QuizResultScreen
