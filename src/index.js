#!/usr/bin/env node
import wordlist from './data/got-long-words.json' assert { type: 'json' }
import { generatePhrases, upperFirst, randomChoice } from './utils.js'
import { program } from 'commander'

const specialCharacters = ['!', '@', '#']

const helpText = `

Example call:
  $ wicked-pw -mus -n2
  friends 1394 boys 4560 gift     =>   Friends1394boys4560gift#
  jonos 3715 log 3979 selling     =>   Jonos3715log3979selling#

Statistics:
  4087 words in dictionary
  5 words ->  1.14 x 10^18 
  4 words ->  2.79 x 10^14
  3 words ->  6.83 x 10^10
`

program
  .option('-m, --mixed', 'Use mix of words and numbers', false)
  .option('-n, --num <number>', 'Number of phrases to create', '5')
  .option('-l, --len <number>', 'Length of each phrase', '5')
  .option('-s, --symbol', 'Include a special character (#)', false)
  .option('-u, --upper', 'Include an uppercase letter', false)
  .addHelpText('after', helpText)

const run = () => {
  program.parse(process.argv)
  const options = program.opts()
  const phrases = generatePhrases(
    parseInt(options.num),
    parseInt(options.len),
    wordlist,
    options.mixed ? 'mixed' : 'words',
  )
  let longest = Math.max(...phrases.map((phrase) => phrase.length))
  console.log('='.repeat(65))
  phrases.forEach((p) => {
    const specialCharacter = options.symbol ? '#' : ''
    let pastablePhrase = p.replace(/\s/g, '')
    if (options.symbol) {
      pastablePhrase = pastablePhrase + '#'
    }
    if (options.upper) {
      pastablePhrase = upperFirst(pastablePhrase)
    }

    console.log(`${p.padEnd(longest + 4)} =>   ${pastablePhrase}`)
  })
  console.log('='.repeat(65))

  return phrases
}

if (import.meta.main) {
  run()
}
