const wordlist = require('./data/got-long-words.json')
const { generatePhrases } = require('./utils')
var yargs = require('yargs')
const argv = yargs
  .usage('Usage: $0 -n [num] -l [num] [-m]')
  .help('h')
  .alias('h', 'help')
  .example('$0 --num 8 --len 5 --mixed', 'Get 8 passphrases of length 5, mixing words and numbers')
  .describe('n', 'Number of phrases to generate')
  .describe('l', 'Length of passphrase')
  .describe('m', 'Generate mixed (numbers and words) passphrase')
  .alias('m', 'mixed')
  .alias('n', 'num')
  .alias('l', 'len')
  .default('n', 5)
  .default('l', 5).argv

const run = () => {
  const phrases = generatePhrases(argv.n, argv.l, wordlist, argv.m ? 'mixed' : 'words')
  let longest = Math.max(...phrases.map((phrase) => phrase.length))
  console.log('='.repeat(65))
  phrases.forEach((p) => {
    const noSpaces = p.replace(/\s/g, '')

    console.log(`${p.padEnd(longest + 4)} =>   ${noSpaces}`)
  })
  console.log('='.repeat(80))

  return phrases
}

run()
