import { isDevMode } from '@angular/core';

/**
 * Pattern that extracts modifiers from the Java regexp.
 *
 * Java regexps MAY start with ONE or MANY modifiers like `(?MODIFIERS)PATTERN`. Examples:
 * - `(?i)` for Case Insensitive Mode: `(?i)PATTERN`
 * - `(?u)` for Unicode-Aware Case Folding; `(?u)PATTERN`
 * - or multiple combined:  `(?iu)PATTERN`
 * - (more modifiers in the official Java docs https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html)
 *
 * This pattern extracts 3 parts from the input string, i.e. for `(?iu)PATTERN`:
 *    1. original modifiers syntax, i.e. `(?iu)` (or undefined if no modifiers present)
 *    2. extracted modifiers, i.e. `iu` (or undefined if no modifiers present)
 *    3. the rest of the regexp, i.e. `PATTERN`
 */
const EXTRACT_JAVA_REGEXP_MODIFIERS: RegExp = /^(\(\?([a-z]+)\))?(.*)/;

/**
 * Converts RegExp from Java syntax to Javascript (with the limitations):
 * - recognizes Java regexp modifiers that appear before the actual regex (i.e. case insensitive mode: `(?i)PATTERN` -> `/pattern/i`)
 *
 * **CAUTION!** Not all features and modifiers of Java regexps are valid in Javascript!
 * If unsupported feature or modifier is used, then `null` will be returned instead of Javascript RegExp.
 *
 * See differences between Java and Javascript regexps:
 * - https://stackoverflow.com/questions/8754444/convert-javascript-regular-expression-to-java-syntax
 * - https://en.wikipedia.org/wiki/Comparison_of_regular_expression_engines#Language_features
 *
 * Note: we don't replace manually double backslashes of Java regexps to single ones for JS,
 *  because creating JS RegExp out of a string literal (`new RegExp(stringHere)`) treats double backslashes as single ones.
 */
export function convertJavaRegExp(javaSyntax: string): RegExp {
  const parts = javaSyntax.match(EXTRACT_JAVA_REGEXP_MODIFIERS);
  if (!parts) {
    return null;
  }
  const [, , modifiers, jsSyntax] = parts;
  try {
    return new RegExp(jsSyntax, modifiers);
  } catch (error) {
    if (isDevMode()) {
      console.warn(
        `WARNING: Could not convert Java regexp into Javascript. Original regexp: ${javaSyntax} \nMessage: ${error}`
      );
    }
    return null;
  }
}
