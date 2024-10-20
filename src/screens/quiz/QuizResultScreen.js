import QuizResultCard from '../../components/quiz/QuizResultCard';
import '../../components/visual/QuizEndVisual.css'; // Importa o arquivo CSS

const QuizResultScreen = (props) => {
  const {
    navigation,
    route: {
      params: { topic, answers, questions }
    }
  } = props;

  const totalCorrectAnswers = answers.reduce((acc, answer) => {
    return answer.correct ? acc + 1 : acc;
  }, 0);

  const totalCorrectAnswerTitle =
    totalCorrectAnswers === 1 ? 'resposta correta' : 'respostas corretas';

  const score = Math.floor(totalCorrectAnswers * (100 / questions.length));

  return (
    <div className="quiz-result-container">
      <h1 className="quiz-result-title">Resultado</h1>

      <div className="quiz-result-row">
        <span className="quiz-result-label">Tema: {topic}</span>
      </div>

      <div className="quiz-result-row">
        <span className="quiz-result-total">{totalCorrectAnswers} {totalCorrectAnswerTitle}</span>
      </div>

      <div className="quiz-result-row">
        <span className="quiz-result-label">Pontuação Final: {score}</span>
      </div>

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
          onClick={() =>  navigation.navigate('MainMenuScreen')}
        >
          Voltar ao início
        </button>
      </div>
    </div>
  );
};

export default QuizResultScreen;
