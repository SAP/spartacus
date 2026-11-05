/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BaseSiteService } from '@spartacus/core';
import { of } from 'rxjs';
import { vi } from 'vitest';

/** Mock: BaseSiteService provides a fixed active base site. */
export class MockConfiguratorBaseSiteService
  implements Partial<BaseSiteService>
{
  readonly BASE_SITE = 'electronics-spa';

  getActive = vi.fn().mockReturnValue(of(this.BASE_SITE));
}
