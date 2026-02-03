import { describe, it, expect, beforeEach } from "bun:test";
import { generatePhrases, upperFirst, randomChoice, range } from "./utils.js";
import wordlist from "./data/got-long-words.json" assert { type: "json" };

describe("Password Generator Utilities", () => {
  describe("randomChoice", () => {
    it("should return an element from the array", () => {
      const arr = ["a", "b", "c"];
      const result = randomChoice(arr);
      expect(arr).toContain(result);
    });

    it("should handle single element array", () => {
      const result = randomChoice(["only"]);
      expect(result).toBe("only");
    });

    it("should work with numbers", () => {
      const numbers = [1, 2, 3, 4, 5];
      const result = randomChoice(numbers);
      expect(numbers).toContain(result);
    });
  });

  describe("upperFirst", () => {
    it("should capitalize the first letter", () => {
      expect(upperFirst("hello")).toBe("Hello");
    });

    it("should handle single character", () => {
      expect(upperFirst("a")).toBe("A");
    });

    it("should not affect already capitalized strings", () => {
      expect(upperFirst("Already")).toBe("Already");
    });

    it("should handle empty strings", () => {
      expect(upperFirst("")).toBe("");
    });

    it("should handle mixed case", () => {
      expect(upperFirst("hELLO")).toBe("HELLO");
    });
  });

  describe("range", () => {
    it("should create an array of numbers from 0 to n-1", () => {
      expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    });

    it("should return empty array for 0", () => {
      expect(range(0)).toEqual([]);
    });

    it("should handle single element", () => {
      expect(range(1)).toEqual([0]);
    });

    it("should create correct length array", () => {
      expect(range(10).length).toBe(10);
    });
  });

  describe("generatePhrases", () => {
    it("should generate the correct number of phrases", () => {
      const result = generatePhrases(3, 5, wordlist, "words");
      expect(result.length).toBe(3);
    });

    it("should generate phrases with correct length", () => {
      const phraseLength = 4;
      const result = generatePhrases(2, phraseLength, wordlist, "words");
      result.forEach((phrase) => {
        const words = phrase.split(" ");
        expect(words.length).toBe(phraseLength);
      });
    });

    it("should use words from the wordlist", () => {
      const result = generatePhrases(5, 3, wordlist, "words");
      result.forEach((phrase) => {
        const words = phrase.split(" ");
        words.forEach((word) => {
          expect(wordlist).toContain(word);
        });
      });
    });

    it("should generate 'mixed' type phrases with alternating words and numbers", () => {
      const result = generatePhrases(5, 5, wordlist, "mixed");
      result.forEach((phrase) => {
        const tokens = phrase.split(" ");
        expect(tokens.length).toBe(5);
        // In mixed mode: words at even indices, numbers at odd indices
        for (let i = 0; i < tokens.length; i++) {
          if (i % 2 === 0) {
            // Even index should be a word
            expect(wordlist).toContain(tokens[i]);
          } else {
            // Odd index should be a number
            expect(/^\d+$/.test(tokens[i])).toBe(true);
          }
        }
      });
    });

    it("should generate 'words' type phrases with only words", () => {
      const result = generatePhrases(5, 4, wordlist, "words");
      result.forEach((phrase) => {
        const words = phrase.split(" ");
        words.forEach((word) => {
          expect(wordlist).toContain(word);
        });
      });
    });

    it("should return different phrases on each call (due to randomness)", () => {
      const result1 = generatePhrases(1, 5, wordlist, "words");
      const result2 = generatePhrases(1, 5, wordlist, "words");
      // Very unlikely to be identical (probability extremely low)
      expect(result1[0] !== result2[0]).toBe(true);
    });

    it("should handle minimum values", () => {
      const result = generatePhrases(1, 1, wordlist, "words");
      expect(result.length).toBe(1);
      expect(result[0].split(" ").length).toBe(1);
      expect(wordlist).toContain(result[0]);
    });

    it("should handle large values", () => {
      const result = generatePhrases(2, 10, wordlist, "words");
      expect(result.length).toBe(2);
      result.forEach((phrase) => {
        expect(phrase.split(" ").length).toBe(10);
      });
    });
  });

  describe("Wordlist validation", () => {
    it("should have a valid wordlist with entries", () => {
      expect(Array.isArray(wordlist)).toBe(true);
      expect(wordlist.length).toBeGreaterThan(0);
    });

    it("should have at least 1000 words", () => {
      expect(wordlist.length).toBeGreaterThan(1000);
    });

    it("should contain all string entries", () => {
      wordlist.forEach((word) => {
        expect(typeof word).toBe("string");
        expect(word.length).toBeGreaterThan(0);
      });
    });

    it("should contain Game of Thrones themed words", () => {
      const expectedWords = [
        "dragon",
        "throne",
        "king",
        "queen",
        "stark",
        "arya",
        "jon",
        "daenerys",
      ];
      expectedWords.forEach((word) => {
        expect(wordlist.map((w) => w.toLowerCase())).toContain(word);
      });
    });
  });

  describe("Integration tests", () => {
    it("should generate valid password-like phrases", () => {
      const phrases = generatePhrases(3, 3, wordlist, "words");
      phrases.forEach((phrase) => {
        // Should not be empty
        expect(phrase.length).toBeGreaterThan(0);
        // Should contain spaces (word separator)
        expect(phrase).toContain(" ");
        // Should be string
        expect(typeof phrase).toBe("string");
      });
    });

    it("should generate processable output for password generation", () => {
      const phrases = generatePhrases(2, 4, wordlist, "mixed");
      phrases.forEach((phrase) => {
        // Remove spaces (as CLI would do)
        const pastable = phrase.replace(/\s/g, "");
        // Add symbol
        const withSymbol = pastable + "#";
        // Capitalize first
        const withCaps = upperFirst(withSymbol);

        expect(pastable.length).toBeGreaterThan(0);
        expect(withSymbol).toMatch(/#$/);
        expect(/^[A-Z]/.test(withCaps)).toBe(true);
      });
    });

    it("should produce consistent output structure", () => {
      const count = 5;
      const length = 4;
      const phrases = generatePhrases(count, length, wordlist, "words");

      expect(phrases.length).toBe(count);
      expect(Array.isArray(phrases)).toBe(true);
      phrases.forEach((phrase, index) => {
        expect(typeof phrase).toBe("string");
        expect(phrase.split(" ").length).toBe(length);
        expect(phrase).toMatch(/^[\w\s]+$/);
      });
    });
  });

  describe("CLI argument parsing", () => {
    it("should accept command-line arguments", async () => {
      const { spawnSync } = await import("child_process");
      const result = spawnSync("./lib/main.js", ["-n", "2", "-l", "3"], {
        encoding: "utf8",
      });

      expect(result.status).toBe(0);
      const lines = result.stdout.trim().split("\n");
      // Should have 2 phrases (plus 2 separator lines)
      expect(lines.length).toBe(4);
      // Each phrase should have 3 words
      lines.slice(1, 3).forEach((line) => {
        const phrase = line.split("=>")[0].trim();
        const words = phrase.split(" ");
        expect(words.length).toBe(3);
      });
    });

    it("should respect the --mixed flag", async () => {
      const { spawnSync } = await import("child_process");
      const result = spawnSync("./lib/main.js", ["-m", "-n", "1", "-l", "5"], {
        encoding: "utf8",
      });

      expect(result.status).toBe(0);
      const lines = result.stdout.trim().split("\n");
      const phrase = lines[1].split("=>")[0].trim();
      const tokens = phrase.split(" ");
      expect(tokens.length).toBe(5);
      // In mixed mode: words at even indices, numbers at odd indices
      for (let i = 0; i < tokens.length; i++) {
        if (i % 2 === 0) {
          // Even index should be a word (not all digits)
          expect(/^\d+$/.test(tokens[i])).toBe(false);
        } else {
          // Odd index should be a number
          expect(/^\d+$/.test(tokens[i])).toBe(true);
        }
      }
    });

    it("should respect --upper and --symbol flags", async () => {
      const { spawnSync } = await import("child_process");
      const result = spawnSync(
        "./lib/main.js",
        ["-n", "1", "-l", "3", "-u", "-s"],
        { encoding: "utf8" }
      );

      expect(result.status).toBe(0);
      const lines = result.stdout.trim().split("\n");
      const output = lines[1].split("=>")[1].trim();
      // Should start with uppercase
      expect(/^[A-Z]/.test(output)).toBe(true);
      // Should end with #
      expect(output.endsWith("#")).toBe(true);
    });
  });
});
