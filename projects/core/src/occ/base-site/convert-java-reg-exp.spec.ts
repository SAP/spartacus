import { convertJavaRegExp } from './convert-java-reg-exp';

/**
 * Note: In this file we create string literals, which need escaping the backslashes and meta characters. For example:
 *  - `\\` means a backslash
 *  - `\s` means a "s" character
 *  - `\\s` means a backslash followed by the "s" character
 *
 * But in the implementation we create regular expression object from string literals, which implies:
 *  - `new RegExp('\\`) is `/\/`
 *  - `new RegExp('\t')` is `/ /`
 *  - `new RegExp('\\t')` is `/\t/`
 */
describe(`convertJavaRegExp`, () => {
  it(`should recognize single modifier`, () => {
    test_convertJavaRegExp({ input: '(?i)pattern', expected: /pattern/i });
  });

  it(`should recognize multiple modifiers`, () => {
    test_convertJavaRegExp({
      input: '(?gimu)pattern',
      expected: /pattern/gimu,
    });
  });

  it(`should return null for unsupported JS modifiers`, () => {
    test_convertJavaRegExp({ input: '(?iX)pattern', expected: null });
  });

  it(`should return null for unsupported JS regexp features`, () => {
    test_convertJavaRegExp({ input: 'x*+', expected: null });
  });

  it(`should convert regexp when it's compatible in JS - with meta characters`, () => {
    test_convertJavaRegExp({
      input: '\\s test \\t tab \\n',
      expected: /\s test \t tab \n/,
    });
  });

  it(`should convert regexp when it's compatible in JS - email domain validator`, () => {
    test_convertJavaRegExp({
      input: '[.][a-zA-Z]+$',
      expected: /[.][a-zA-Z]+$/,
    });
  });

  it(`should convert regexp when it's compatible in JS - password validator`, () => {
    test_convertJavaRegExp({
      /**
       * Note that in string literal we escape the only the backslash with another backslash, i.e.  `\\-`.
       * But in regexp literal we escape the special (and meta) characters with backslash, i.e `\-`.
       */
      input: '^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^*()_\\-+{};:.,]).{6,}$',
      expected: /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^*()_\-+{};:.,]).{6,}$/,
    });
  });
});

/**
 * Given the regexp input, it compares the result regexp with the expected one, using the `toString()` method.
 * If a regexp is `null`, then let's don't use `toString()`, but the value itself.
 */
function test_convertJavaRegExp({
  input,
  expected,
}: {
  input: string;
  expected: RegExp;
}) {
  const result = convertJavaRegExp(input);
  const resultToString = result ? result.toString() : result;
  const expectedToString = expected ? expected.toString() : expected;

  expect(resultToString).toEqual(expectedToString);
}
