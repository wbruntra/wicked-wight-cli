# Wicked Wight CLI

Generate random, Game of Thrones-inspired passwords, from the command line.

## Build & Development

This project uses [Bun](https://bun.sh) as the bundler and runtime.

```bash
# Install dependencies
bun install

# Development (watch mode)
bun run dev

# Build production bundle (minified)
bun run build

# Run the CLI
bun run start -- --help

# Run tests
bun test
```

## Options

```
  -m, --mixed         Use mix of words and numbers (default: false)
  -n, --num <number>  Number of phrases to create (default: "5")
  -l, --len <number>  Length of each phrase (default: "5")
  -s, --symbol        Include a special character (#) (default: false)
  -u, --upper         Include an uppercase letter (default: false)
  -h, --help          display help for command
```

Examples:

```
$ wicked-pw --len 4

=================================================================
shaking ghar myranda fighters     =>   shakinggharmyrandafighters
heavy vargo painted age           =>   heavyvargopaintedage
sweet chuckled litter barley      =>   sweetchuckledlitterbarley
song climbed feeding screams      =>   songclimbedfeedingscreams
worn falling clothing brick       =>   wornfallingclothingbrick
=================================================================
```

```
$ wicked-pw -m

=================================================================
however 4063 crippled 8285 iron       =>   however4063crippled8285iron
standing 6001 erik 6275 meribald      =>   standing6001erik6275meribald
martell 2504 galbart 2883 rotted      =>   martell2504galbart2883rotted
butchered 6951 charred 4787 trail     =>   butchered6951charred4787trail
touch 9887 amused 5373 hurried        =>   touch9887amused5373hurried
=================================================================
```

```
$ wicked-pw -u -s -m

=================================================================
dull 9350 slip 3597 freeze           =>   Dull9350slip3597freeze#
woman 8196 dragged 5633 loudly       =>   Woman8196dragged5633loudly#
remove 8157 leaning 9569 curls       =>   Remove8157leaning9569curls#
chill 2303 kisses 7155 mallister     =>   Chill2303kisses7155mallister#
cat 2510 heavily 8690 become         =>   Cat2510heavily8690become#
=================================================================
```
