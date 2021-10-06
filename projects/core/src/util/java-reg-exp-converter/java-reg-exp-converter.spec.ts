import { TestBed } from '@angular/core/testing';
import { JavaRegExpConverter } from './java-reg-exp-converter';

/**
 * Note: In this file we create string literals, which need escaping the backslashes and meta characters. For example:
 *  - `\\` means a backslash
 *  - `\s` means a "s" character
 *  - `\\s` means a backslash followed by the "s" character
 *
 * And in the implementation we create regular expression object from string literals, which implies:
 *  - `new RegExp('\\`) is `/\/`
 *  - `new RegExp('\t')` is `/ /`
 *  - `new RegExp('\\t')` is `/\t/`
 */
describe(`JavaRegExpConverter`, () => {
  let converter: JavaRegExpConverter;

  /**
   * Given the regexp input, it compares the result regexp with the expected one, using the `toString()` method.
   * If a regexp is `null`, then it uses the value itself instead of the `toString()` result.
   */
  function test_toJsRegExp({
    input,
    expected,
  }: {
    input: string;
    expected: RegExp;
  }) {
    const result = converter.toJsRegExp(input);
    const resultToString = result ? result.toString() : result;
    const expectedToString = expected ? expected.toString() : expected;

    expect(resultToString).toEqual(expectedToString);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    converter = TestBed.inject(JavaRegExpConverter);
  });

  describe(`toJsRegExp`, () => {
    it(`should recognize a single modifier`, () => {
      test_toJsRegExp({ input: '(?i)pattern', expected: /pattern/i });
    });

    it(`should recognize multiple modifiers`, () => {
      test_toJsRegExp({
        input: '(?gimu)pattern',
        expected: /pattern/gimu,
      });
    });

    it(`should return null for unsupported JS modifiers`, () => {
      spyOn(console, 'warn');
      test_toJsRegExp({ input: '(?iX)pattern', expected: null });
    });

    it(`should return null for unsupported JS regexp features`, () => {
      spyOn(console, 'warn');
      test_toJsRegExp({ input: 'x*+', expected: null });
    });

    it(`should convert regexp when it's compatible in JS - with meta characters`, () => {
      test_toJsRegExp({
        input: '(?i)\\s test \\t tab \\n',
        expected: /\s test \t tab \n/i,
      });
    });

    it(`should convert regexp when it's compatible in JS - email domain validator`, () => {
      test_toJsRegExp({
        input: '(?i)[.][a-zA-Z]+$',
        expected: /[.][a-zA-Z]+$/i,
      });
    });

    it(`should convert regexp when it's compatible in JS - password validator`, () => {
      test_toJsRegExp({
        /**
         * Note that in string literal we escape the only the backslash with another backslash, i.e.  `\\-`.
         * But in regexp literal we escape the special (and meta) characters with backslash, i.e `\-`.
         */
        input:
          '(?i)^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^*()_\\-+{};:.,]).{6,}$',
        expected:
          /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^*()_\-+{};:.,]).{6,}$/i,
      });
    });
  });
});
