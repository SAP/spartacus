/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslationService } from '@spartacus/core';
import { of } from 'rxjs';
import { vi } from 'vitest';

/** Mock: TranslationService translates given key with options. */
export class MockConfiguratorTranslationService
  implements Partial<TranslationService>
{
  translate = vi.fn().mockImplementation((key: string, params?: unknown) => {
    switch (key) {
      case 'configurator.group.general':
        return of('General');
      case 'configurator.group.conflictHeader':
        return of('Conflict Header');
      case 'configurator.group.conflictGroup':
        return of(
          `Conflict ${(params as { attribute?: string })?.attribute ?? ''}`
        );
      default:
        return params ? of(key + JSON.stringify(params)) : of(key);
    }
  });
}
