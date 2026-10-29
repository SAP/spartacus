/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { GlobalMessageService } from '@spartacus/core';
import { vi } from 'vitest';

/** Mock: GlobalMessageService provides a global message. */
export class MockConfiguratorGlobalMessageService
  implements Partial<GlobalMessageService>
{
  add = vi.fn();
  remove = vi.fn();
  get = vi.fn();
}
