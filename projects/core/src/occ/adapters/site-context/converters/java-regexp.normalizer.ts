import { Injectable, isDevMode } from '@angular/core';
import { Converter } from '../../../../util/converter.service';

// SPIKE TODO - REUSE/FIX EXISTING OCC CONFIG

@Injectable({ providedIn: 'root' })
export class JavaRegexpNormalizer implements Converter<string, RegExp> {
  /**
   * Pattern that extracts modifiers from the Java regexp.
   *
   * Java regexps MAY start with ONE or MANY modifiers like `(?MODIFIERS)REGEXP`. Examples:
   * - `(?i)` for Case Insensitive Mode: `(?i)REGEXP`
   * - `(?u)` for Unicode-Aware Case Folding; `(?u)REGEXP`
   * - or multiple combined:  `(?iu)REGEXP`
   * - (more modifiers in the official Java docs https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html)
   *
   * This pattern extracts 3 parts from the input string, i.e. for `(?iu)REGEXP`:
   *    1. original modifiers syntax, i.e. `(?iu)` (or undefined if no modifiers present)
   *    2. extracted modifiers, i.e. `iu` (or undefined if no modifiers present)
   *    3. the rest of the regexp, i.e. `REGEXP`
   */
  protected readonly EXTRACT_JAVA_REGEXP_MODIFIERS: RegExp = /^(\(\?([a-z]+)\))?(.*)/;

  /**
   * Pattern that matches all double backslashes.
   *
   * For example `'a\\b\\\c\\\\d'.replace(this.ALL_DOUBLE_BACKSLASHES, '_')` should return `a_b_\c__d`
   */
  protected readonly ALL_DOUBLE_BACKSLASHES: RegExp = /\\\\/g;

  /**
   * Single backslash string literal
   */
  protected readonly BACKSLASH: string = '\\';

  /**
   * Converts RegExp from Java syntax to Javascript (with the limitations):
   * - recognizes Java regexp modifiers that appear before the actual regex (i.e. case insensitive mode `(?i)ACTUAL_REGEXP`)
   * - replaces all double backslashes `\\` with a single backslash `\` in the actual regex
   *
   * **CAUTION!** Not all features and modifiers of Java regexps are valid in Javascript!
   * If unsupported feature or modifier is used, then `null` will be returned instead of Javascript RegExp.
   *
   * See differences between Java and Javascript regexps:
   * - https://stackoverflow.com/questions/8754444/convert-javascript-regular-expression-to-java-syntax
   * - https://en.wikipedia.org/wiki/Comparison_of_regular_expression_engines#Language_features
   */
  convert(javaSyntax: string): RegExp {
    const parts = javaSyntax.match(this.EXTRACT_JAVA_REGEXP_MODIFIERS);
    if (!parts) {
      return null;
    }
    const [, , modifiers, actualRegexp] = parts;
    const jsSyntax = this.convertActualRegexp(actualRegexp);
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

  /**
   * Converts the part of the Java RegExp without modifiers, by simply replacing `\\` with `\`.
   * The Java regexp features that are not supported in Javascript will simply not work.
   *
   * See https://stackoverflow.com/questions/8754444/convert-javascript-regular-expression-to-java-syntax
   */
  protected convertActualRegexp(javaSyntax: string): string {
    return javaSyntax.replace(this.ALL_DOUBLE_BACKSLASHES, this.BACKSLASH);
  }
}
