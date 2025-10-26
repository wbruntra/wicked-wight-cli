# Testing Guide

## Running Tests

The project uses [Bun's built-in test runner](https://bun.sh/docs/test/overview) which provides a Jest-compatible API.

### Run all tests
```bash
bun test
```

### Run tests in watch mode
```bash
bun test --watch
```

### Run tests with coverage
```bash
bun test --coverage
```

### Run specific test file
```bash
bun test src/index.test.js
```

## Test Coverage

The test suite includes comprehensive coverage of all utility functions:

- **randomChoice()**: Tests array selection, edge cases, and type handling
- **upperFirst()**: Tests capitalization, edge cases (empty strings, single chars)
- **range()**: Tests array generation with various inputs
- **generatePhrases()**: Tests phrase generation for both 'words' and 'mixed' modes
- **Wordlist validation**: Ensures the wordlist is valid and contains expected Game of Thrones themed words
- **Integration tests**: Tests the full password generation workflow

## Pre-commit Hook

Before any commit, the following checks are automatically run:

1. **Unit tests** (`bun test`) - All 27 tests must pass
2. **Build** (`bun run build`) - The project must build successfully

This ensures code quality and that the bundle is always valid before committing.

If any check fails, the commit will be rejected. You'll need to fix the issues and try again.

### Example

```bash
$ git commit -m "Add new feature"
# Pre-commit hook runs automatically:
# - Tests fail → commit is rejected
# - You fix the issue
# - git commit again → tests pass, build succeeds → commit accepted
```

## Test Statistics

- **Total tests**: 27
- **Test categories**: 
  - randomChoice: 3 tests
  - upperFirst: 5 tests
  - range: 4 tests
  - generatePhrases: 7 tests
  - Wordlist validation: 4 tests
  - Integration tests: 3 tests

All tests execute in approximately 32ms.
