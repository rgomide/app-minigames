import { useState } from 'react';
import QuizCard from '../../components/quiz/QuizCard';
import { QUIZ_RESULT_SCREEN } from '../../constants/screens';
// import '../../components/visual/QuizGameVisual.css';
import TooltipIcon from '../../components/TooltipIcon';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

  const onSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
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
    <ScrollView contentContainerStyle={styles.quizGameContainer}>
      <TooltipIcon text="Responda as perguntas escolhendo a alternativa correta entre as opções." />      
      <Text style={styles.quizTopic}>Tema: {topic}</Text>
      <Text style={styles.quizCounter}>
        Questões: {questionCounter + 1}/{questions.length}
      </Text>

      <QuizCard question={currentQuestion} onChange={onSelectAnswer} />

      <TouchableOpacity
        style={[styles.quizNextButton, !selectedAnswer && styles.quizNextButtonDisabled]}
        onPress={onNextPressed}
        disabled={!selectedAnswer}
      >
        <Text style={styles.quizNextButtonText}>{getButtonTitle()}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  quizGameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#F2E8DF',
    gap: 15
  },
  quizTopic: {
    fontSize: 26,
    color: '#a99be0',
    textAlign: 'center',
    fontFamily: 'Fredoka',
  },
  quizCounter: {
    fontSize: 18,
    color: '#b3a8e0',
    fontFamily: 'Fredoka',
  },
  quizNextButton: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#433d59',
    fontFamily: 'Fredoka',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
  },
  quizNextButtonDisabled: {
    backgroundColor: '#877cb3',
  },
  quizNextButtonText: {
    fontSize: 18,
    fontFamily: 'Fredoka',
    color: '#fff',
  },
})

export default QuizGameScreen;
