const randInt = (h, l = 0) => {
  return l + Math.floor(Math.random() * h)
}

export const randomChoice = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const upperFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const range = (n) => {
  return [...Array(n).keys()]
}

const generatePhrase = (n, wordList, type = 'words') => {
  const phrase = range(n).map((i) => {
    if (type === 'words' || i % 2 === 0) {
      return randomChoice(wordList)
    } else {
      return randInt(9999)
    }
  })
  return phrase.join(' ')
}

export const generatePhrases = (count, phraseLength, wordList, passType) => {
  const phrases = range(count).map((i) => {
    return generatePhrase(phraseLength, wordList, passType)
  })
  return phrases
}
