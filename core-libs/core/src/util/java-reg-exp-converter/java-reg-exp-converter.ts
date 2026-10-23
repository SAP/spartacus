/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject, isDevMode } from '@angular/core';
import { LoggerService } from '../../logger';
import { toJsRegExp } from './to-js-reg-exp';

@Injectable({ providedIn: 'root' })
export class JavaRegExpConverter {
  logger = inject(LoggerService);

  /**
   * Converts RegExp from Java syntax to Javascript, by recognizing Java regexp modifiers
   * and converting them to the Javascript ones (i.e. case insensitive mode: `(?i)PATTERN` -> `/pattern/i`)
    *
    * This class is an Angular wrapper around the pure `toJsRegExp()` function.
    * Use this wrapper when you want dev-mode warning logs via `LoggerService`.
    * Use `toJsRegExp()` directly in framework-agnostic or Node-only code.
    *
    * Examples:
    * - input `(?i)electronics` -> `/electronics/i`
    * - input `x*+` -> `null` and (in dev mode) a warning is logged
   *
   * **CAUTION!** Not all features and modifiers of Java regexps are valid in Javascript!
   * If unsupported feature or modifier is used, then `null` will be returned instead of Javascript RegExp.
   *
   * See differences between Java and Javascript regexps:
   * - https://stackoverflow.com/questions/8754444/convert-javascript-regular-expression-to-java-syntax
   * - https://en.wikipedia.org/wiki/Comparison_of_regular_expression_engines#Language_features
   */
  toJsRegExp(javaSyntax: string): RegExp | null {
    return toJsRegExp(javaSyntax, (error) => {
      if (isDevMode()) {
        this.logger.warn(
          `WARNING: Could not convert Java regexp into Javascript. Original regexp: ${javaSyntax} \nMessage: ${error}`
        );
      }
    });
  }
}
