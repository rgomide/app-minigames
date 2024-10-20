import { useState } from 'react';
import QuizCard from '../../components/quiz/QuizCard';
import { QUIZ_RESULT_SCREEN } from '../../constants/screens';
import '../../components/visual/QuizGameVisual.css';
import infoIcon from '../../img/duvida.png';

const QuizGameScreen = (props) => {
  const {
    navigation,
    route: {
      params: {
        quizSettings: { topic, questions },
      },
    },
  } = props;

  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showInfo, setShowInfo] = useState(false); 

  const onSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const onNextPressed = () => {
    if (questionCounter < questions.length - 1) {
      processNextQuestion();
    } else {
      processEndGame();
    }
  };

  const processNextQuestion = () => {
    setAnswers([...answers, selectedAnswer]);
    setQuestionCounter(questionCounter + 1);
    setCurrentQuestion(questions[questionCounter + 1]);
    setSelectedAnswer(null);
  };

  const processEndGame = () => {
    const allAnswers = [...answers, selectedAnswer];

    setCurrentQuestion(questions[0]);
    setQuestionCounter(0);
    setSelectedAnswer(null);
    setAnswers([]);

    navigation.navigate(QUIZ_RESULT_SCREEN, { topic, questions, answers: allAnswers });
  };

  const getButtonTitle = () => {
    if (questionCounter === questions.length - 1) {
      return 'Finalizar';
    }
    return 'Próxima';
  };

  return (
    <div className="quiz-game-container">
      <div className="info-icon" onClick={toggleInfo}>
        <img src={infoIcon} alt="Informação" />
      </div>


      <div className={`info-bubble ${showInfo ? 'show' : ''}`}>
        <p>Responda as perguntas escolhendo a alternativa correta entre as opções.</p>
      </div>
      <h2 className="quiz-topic">Tema: {topic}</h2>
      <p className="quiz-counter">
        Questões: {questionCounter + 1}/{questions.length}
      </p>

      <QuizCard question={currentQuestion} onChange={onSelectAnswer} />

      <button
        className="quiz-next-button"
        onClick={onNextPressed}
        disabled={!selectedAnswer}
      >
        {getButtonTitle()}
      </button>
    </div>
  );
};

export default QuizGameScreen;
