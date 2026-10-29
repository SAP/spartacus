/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { vi } from 'vitest';

/** Mock: LanguageService provides easy access to language state. */
export class MockConfiguratorLanguageService
  implements Partial<LanguageService>
{
  getAll = vi.fn().mockReturnValue(of([]));
  getActive = vi.fn().mockReturnValue(of('en'));
}
