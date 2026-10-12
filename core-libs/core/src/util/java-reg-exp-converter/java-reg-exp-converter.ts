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
   * **CAUTION!** Not all features and modifiers of Java regexps are valid in Javascript!
   * If unsupported feature or modifier is used, then `null` will be returned instead of Javascript RegExp.
   *
   * See differences between Java and Javascript regexps:
   * - https://stackoverflow.com/questions/8754444/convert-javascript-regular-expression-to-java-syntax
   * - https://en.wikipedia.org/wiki/Comparison_of_regular_expression_engines#Language_features
   */
  toJsRegExp(javaSyntax: string): RegExp | null {
    const result = toJsRegExp(javaSyntax);

    if (result === null && isDevMode()) {
      this.logger.warn(
        `WARNING: Could not convert Java regexp into Javascript. Original regexp: ` +
          javaSyntax
      );
    }

    return result;
  }
}
