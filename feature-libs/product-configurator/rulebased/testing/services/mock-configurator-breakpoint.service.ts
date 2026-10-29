/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BreakpointService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { vi } from 'vitest';

/** Mock: BreakpointService resolves the various screen sizes. */
export class MockConfiguratorBreakpointService
  implements Partial<BreakpointService>
{
  isUp = vi.fn().mockReturnValue(of(false));
  isDown = vi.fn().mockReturnValue(of(true));
}
