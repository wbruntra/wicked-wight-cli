const wordlist = require('./data/got-long-words.json')
const { generatePhrases } = require('./utils')
const { program } = require('commander')

program
  .option('-m, --mixed', 'Use mix of words and numbers', false)
  .option('-n, --num <number>', 'Number of phrases to create', '5')
  .option('-l, --len <number>', 'Length of each phrase', '5')

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
    const noSpaces = p.replace(/\s/g, '')

    console.log(`${p.padEnd(longest + 4)} =>   ${noSpaces}`)
  })
  console.log('='.repeat(65))

  return phrases
}

if (require.main === module) {
  run()
} 