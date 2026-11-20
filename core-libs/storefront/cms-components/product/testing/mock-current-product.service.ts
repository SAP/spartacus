/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CurrentProductService } from '../current-product.service';

/**
 * Mock of {@link CurrentProductService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockCurrentProductService
  implements Partial<CurrentProductService>
{
  getProduct(): Observable<Product | null> {
    return of(null);
  }
}
