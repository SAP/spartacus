/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Product } from '@spartacus/core';
import type { CurrentProductService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { vi } from 'vitest';

/** Mock: CurrentProductService provides a fixed product stream. */
export class MockConfiguratorCurrentProductService
  implements Partial<CurrentProductService>
{
  product: Product | null = { code: '', name: '' };

  getProduct = vi.fn().mockImplementation(() => of(this.product));
}
