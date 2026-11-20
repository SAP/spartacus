/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { ProductService } from '../facade/product.service';
import { MockProductService } from './mock-product.service';
import { ProductTestingModule } from './product-testing.module';

describe('MockProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ProductTestingModule] });
    service = TestBed.inject(ProductService);
  });

  it('should be provided via ProductTestingModule', () => {
    expect(service).toBeInstanceOf(MockProductService);
  });

  it('should return defaults', async () => {
    expect(await firstValueFrom(service.get('code'))).toBeUndefined();
    expect(await firstValueFrom(service.isLoading('code'))).toBe(false);
    expect(await firstValueFrom(service.isSuccess('code'))).toBe(true);
  });

  it('should allow overriding a method return value with vi.spyOn', async () => {
    vi.spyOn(service, 'get').mockReturnValue(of({ code: 'p1' }));
    expect(await firstValueFrom(service.get('p1'))).toEqual({ code: 'p1' });
  });
});
