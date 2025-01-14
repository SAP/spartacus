/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pipe, PipeTransform } from '@angular/core';
import { Translatable, isTranslatable } from '../translatable';
import { mockTranslate } from './mock-translate';

@Pipe({ name: 'cxTranslate' })
export class MockTranslatePipe implements PipeTransform {
  transform(
    input: Translatable | string | string[],
    options: object = {}
  ): string | undefined {
    if (!input) {
      return '';
    }

    if (isTranslatable(input) && input.raw) {
      return input.raw;
    }

    if (isTranslatable(input) && input.params) {
      options = { ...options, ...input.params };
    }

    const key = isTranslatable(input) ? input.key : input;

    return mockTranslate(key, options);
  }
}
