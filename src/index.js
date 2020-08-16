const wordlist = require('./data/got-long-words.json')
const { generatePhrases } = require('./utils')
var yargs = require('yargs')
const argv = yargs
  .usage('Usage: $0 -n [num] -l [num] [-m]')
  .help('h')
  .alias('h', 'help')
  .describe('n', 'Number of phrases to generate')
  .describe('l', 'Length of passphrase (words)')
  .describe('m', 'Generate mixed (numbers and words) passphrase')
  .alias('n', 'num')
  .alias('l', 'len')
  .default('n', 5)
  .default('l', 5).argv

const run = () => {
  const phrases = generatePhrases(argv.n, argv.l, wordlist, argv.m ? 'mixed' : 'words')
  const lens = phrases.map((phrase) => phrase.length)
  console.log(lens)
  let longest = Math.max(...phrases.map((phrase) => phrase.length))
  console.log(longest)
  phrases.forEach((p) => {
    const noSpaces = p.replace(/\s/g, '')

    console.log(`${p.padEnd(longest + 4)} =>   ${noSpaces}`)
  })
  return phrases
}

run()
