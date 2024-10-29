import quiz01 from '../../db/quiz/quiz01.json'
import quiz02 from '../../db/quiz/quiz02.json'
import quiz03 from '../../db/quiz/quiz03.json'

const quizSummary = {
  quiz01: quiz01,
  quiz02: quiz02,
  quiz03: quiz03
}

const getQuiz = (name) => {
  const clonedQuiz = JSON.parse(JSON.stringify(quizSummary[name]))
  return new Promise((resolve) => {
    resolve(clonedQuiz)
  })
}

export { getQuiz }
