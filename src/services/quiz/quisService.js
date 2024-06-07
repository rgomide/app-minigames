import quiz01 from '../../db/quiz/quiz01.json'

const quizSummary = {
  quiz01: quiz01
}

const getQuiz = (name) => {
  const clonedQuiz = JSON.parse(JSON.stringify(quizSummary[name]))
  return new Promise((resolve) => {
    resolve(clonedQuiz)
  })
}

export { getQuiz }
