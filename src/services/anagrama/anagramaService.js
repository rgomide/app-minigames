import anagrama01 from '../../db/anagrama/anagrama01.json'
import anagrama02 from '../../db/anagrama/anagrama02.json'
import anagrama03 from '../../db/anagrama/anagrama03.json'

const anagramaSummary = {
  anagrama01: anagrama01,
  anagrama02: anagrama02,
  anagrama03: anagrama03
}

const getAnagrama = (name) => {
  const clonedAnagrama = JSON.parse(JSON.stringify(anagramaSummary[name]))
  return new Promise((resolve) => {
    resolve(clonedAnagrama)
  })
}

export { getAnagrama }
