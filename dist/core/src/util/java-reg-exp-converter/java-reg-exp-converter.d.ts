import { LoggerService } from '../../logger';
import * as i0 from "@angular/core";
export declare class JavaRegExpConverter {
    logger: LoggerService;
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
    private readonly EXTRACT_JAVA_REGEXP_MODIFIERS;
    /**
     * Converts RegExp from Java syntax to Javascript, by recognizing Java regexp modifiers
     * and converting them to the Javascript ones (i.e. case insensitive mode: `(?i)PATTERN` -> `/pattern/i`)
     *
     * **CAUTION!** Not all features and modifiers of Java regexps are valid in Javascript!
     * If unsupported feature or modifier is used, then `null` will be returned instead of Javascript RegExp.
     *
     * See differences between Java and Javascript regexps:
     * - https://stackoverflow.com/questions/8754444/convert-javascript-regular-expression-to-java-syntax
     * - https://en.wikipedia.org/wiki/Comparison_of_regular_expression_engines#Language_features
     */
    toJsRegExp(javaSyntax: string): RegExp | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<JavaRegExpConverter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JavaRegExpConverter>;
}
