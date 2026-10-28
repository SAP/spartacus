/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Product } from '@spartacus/core';
import { ProductService } from '@spartacus/core';
import { of } from 'rxjs';
import { vi } from 'vitest';

/** Mock: ProductService provides a fixed product stream. */
export class MockConfiguratorProductService implements Partial<ProductService> {
  product: Product = { code: '', name: '' };

  get = vi.fn().mockImplementation(() => of(this.product));
}
