import associacao01 from '../../db/associacao/associacao01.json'
import associacao02 from '../../db/associacao/associacao02.json'
import associacao03 from '../../db/associacao/associacao03.json'

const associacaoSummary = {
  associacao01: associacao01,
  associacao02: associacao02,
  associacao03: associacao03
}

const getAssociacao = (name) => {
  const clonedAssociacao = JSON.parse(JSON.stringify(associacaoSummary[name]))
  return new Promise((resolve) => {
    resolve(clonedAssociacao)
  })
}

export { getAssociacao }
