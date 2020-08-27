const wordlist = require('./data/got-long-words.json')
const { generatePhrases, upperFirst, randomChoice } = require('./utils')
const { program } = require('commander')
const specialCharacters = ['!','@','#']

program
  .option('-m, --mixed', 'Use mix of words and numbers', false)
  .option('-n, --num <number>', 'Number of phrases to create', '5')
  .option('-l, --len <number>', 'Length of each phrase', '5')
  .option('-s, --symbol', 'Include a special character (#)', false)
  .option('-u, --upper', 'Include an uppercase letter', false)

program.parse(process.argv)

const run = () => {
  const phrases = generatePhrases(
    parseInt(program.num),
    parseInt(program.len),
    wordlist,
    program.mixed ? 'mixed' : 'words'
  )
  let longest = Math.max(...phrases.map((phrase) => phrase.length))
  console.log('='.repeat(65))
  phrases.forEach((p) => {
    const specialCharacter = program.symbol ? '#' : ''
    let pastablePhrase = p.replace(/\s/g, '')
    if (program.symbol) {
      pastablePhrase = pastablePhrase + '#'
    }
    if (program.upper) {
      pastablePhrase = upperFirst(pastablePhrase)
    }

    console.log(`${p.padEnd(longest + 4)} =>   ${pastablePhrase}`)
  })
  console.log('='.repeat(65))

  return phrases
}

if (require.main === module) {
  run()
} 