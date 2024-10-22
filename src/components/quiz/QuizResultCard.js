import React from 'react';
import '../../components/visual/QuizEndVisual.css';

const QuizResultCard = ({ answer, question }) => {
  const { title, answers: questionAnswers } = question;
  const correctAnswer = questionAnswers.find((questionAnswer) => questionAnswer.correct);
  const isCorrect = correctAnswer.id === answer.id;

  const answerStyle = isCorrect ? 'correct-text' : 'wrong-text';

  return (
    <div className="quiz-card-container">
      <p className="quiz-card-title">{title}</p>
      <p className={answerStyle}>Respondida: {answer.answer}</p>
      {!isCorrect && <p className="suggestion-text">Correta: {correctAnswer.answer}</p>}
    </div>
  );
};

export default QuizResultCard;