# AGENTS.md

This document provides guidelines for AI agents working on the wicked-cli codebase.

## Project Overview

Wicked Wight CLI is a Game of Thrones-themed password generator built with Bun. It generates random, memorable passwords by combining words from a Game of Thrones wordlist with optional numbers and special characters.

## Build, Lint, and Test Commands

### Core Commands

```bash
# Install dependencies
bun install

# Development (watch mode - rebuilds on file changes)
bun run dev

# Build production bundle (minified binary)
bun run build

# Run the CLI directly
bun run start

# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run tests with coverage
bun test --coverage

# Run a specific test file
bun test src/index.test.js
```

### Pre-commit Hooks

This project uses Husky with a pre-commit hook that automatically runs:
1. `bun test` - All 27 tests must pass
2. `bun run build` - Production bundle must build successfully

Commits are rejected if either check fails.

## Code Style Guidelines

### Language and Modules

- Use **ES Modules** exclusively (`import`/`export`, not CommonJS)
- Use `import` statements at the top of files
- Import JSON files with the assertion syntax: `import data from './file.json' assert { type: 'json' }`
- Use `import.meta.main` to check if running as entry point

### Naming Conventions

- **Variables and functions**: `camelCase` (e.g., `randomChoice`, `phraseLength`)
- **Constants at module level**: `camelCase` or `UPPER_SNAKE_CASE` for true constants (e.g., `specialCharacters`)
- **Descriptive names**: Prefer clarity over brevity (e.g., `generatePhrases` over `gen`)
- **File names**: lowercase with hyphens (e.g., `utils.js`, `index.js`)

### Functions

- Use **arrow functions** for most cases
- Keep functions small and focused on a single task
- Export utility functions explicitly with `export const`
- Use default parameters when appropriate
- Helper functions can be private (not exported)

### Types and Values

- Use JavaScript primitives: `string`, `number`, `boolean`, `Array`
- Avoid type coercion where possible; use explicit conversions
- Parse CLI arguments with `parseInt()` when needed
- Use template literals for string interpolation

### Error Handling

- Let errors bubble up to the CLI entry point where appropriate
- Validate inputs at function boundaries
- Use descriptive error messages for user-facing errors
- Tests should cover edge cases (empty arrays, boundary values)

### Formatting

- **No required linter/formatter** - the codebase uses minimal tooling
- Follow the existing style: consistent spacing, readable indentation
- Use template literals over string concatenation
- Keep lines reasonably short (general guideline: under 100 characters)
- Use blank lines to separate logical sections

### Structure

```
src/
├── index.js        # CLI entry point (uses commander for CLI parsing)
├── utils.js        # Shared utility functions
├── index.test.js   # Test suite (Bun test format)
└── data/
    └── got-long-words.json  # Game of Thrones wordlist
```

### Code Patterns

- **CLI entry point**: Use `commander` for option parsing
- **Random utilities**: Use `Math.random()` directly (no external RNG library)
- **Array utilities**: Use `Array.prototype.map`, `filter`, `reduce`, `forEach`
- **Tests**: Use `bun:test` with `describe`, `it`, `expect` (Jest-compatible API)

### Import Patterns

```javascript
// Import modules
import { func1, func2 } from './module.js'

// Import JSON data
import wordlist from './data/words.json' assert { type: 'json' }

// Import packages
import { program } from 'commander'
```

### Test Expectations

- Place tests in `src/*.test.js` files
- Use `describe` blocks to group related tests
- Test edge cases: empty inputs, single elements, boundary values
- Validate that generated output comes from the wordlist
- Tests should run in under 50ms (Bun is fast)

### Comments

- **Avoid unnecessary comments** - the code should be self-documenting
- Only add comments for complex logic or non-obvious decisions
- The existing codebase has minimal comments; follow this pattern

### What to Avoid

- Don't introduce new dependencies without discussion
- Don't use CommonJS `require()` - use ES imports
- Don't modify the wordlist format without good reason
- Don't add TypeScript unless the project migrates

### Additional Notes

- The project uses **Bun** exclusively (not Node.js or Deno)
- Output is formatted with `console.log` using padding and separators
- CLI uses long options (`--mixed`, `--num <value>`) with short aliases (`-m`, `-n`)
- All functions are synchronous; no async/await needed for this use case
