
import { useState } from 'react';
import { getQuiz } from '../../services/quiz/quisService';
import { QUIZ_GAME_SCREEN } from '../../constants/screens';
import '../../components/visual/QuizStartVisual.css'; 
import infoIcon from '../../img/duvida.png'; 

const QuizStartScreen = (props) => {
  const navigation = props.navigation;
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showInfo, setShowInfo] = useState(false); 
  const quizList = [{ label: 'Capitais', value: 'quiz01' }];

  const startQuiz = async () => {
    const quiz = await getQuiz('quiz01');
    navigation.navigate(QUIZ_GAME_SCREEN, { quizSettings: quiz });
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="quiz-container">
      <div className="info-icon" onClick={toggleInfo}>
        <img src={infoIcon} alt="Informação" />
      </div>


      <div className={`info-bubble ${showInfo ? 'show' : ''}`}>
        <p>Responda as perguntas escolhendo a alternativa correta entre as opções.</p>
      </div>
      <h1 className="quiz-title">QUIZ</h1>

      <p className="quiz-label">Selecione o tema:</p>

      <select
        className="picker-quiz"
        value={selectedQuiz}
        onChange={(e) => setSelectedQuiz(e.target.value)}
      >
        <option value="">Selecione um tema</option>
        {quizList.map((quiz, index) => (
          <option key={index} value={quiz.value}>
            {quiz.label}
          </option>
        ))}
      </select>
       
      <button
        className="quiz-button"
        disabled={!selectedQuiz}
        onClick={startQuiz}
      >
        Iniciar Quiz
      </button>
    </div>
  );
};

export default QuizStartScreen;
