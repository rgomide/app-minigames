const getQuiz = (name) => {
  const quiz = require(`../../db/quiz/${name}.json`)
  return new Promise((resolve) => {
    resolve(quiz)
  })
}

export { getQuiz }
