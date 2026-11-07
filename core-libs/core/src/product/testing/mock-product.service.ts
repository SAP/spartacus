/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../model/product.model';
import { ProductService } from '../facade/product.service';

/**
 * Mock of {@link ProductService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockProductService implements Partial<ProductService> {
  get(): Observable<Product | undefined> {
    return of(undefined);
  }

  isLoading(): Observable<boolean> {
    return of(false);
  }

  isSuccess(): Observable<boolean> {
    return of(true);
  }

  hasError(): Observable<boolean> {
    return of(false);
  }
}
