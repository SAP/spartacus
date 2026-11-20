/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { CurrentProductTestingModule } from './current-product-testing.module';
import { MockCurrentProductService } from './mock-current-product.service';

describe('MockCurrentProductService', () => {
  let service: CurrentProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CurrentProductTestingModule] });
    service = TestBed.inject(CurrentProductService);
  });

  it('should be provided via CurrentProductTestingModule', () => {
    expect(service).toBeInstanceOf(MockCurrentProductService);
  });

  it('should return null by default', async () => {
    expect(await firstValueFrom(service.getProduct())).toBeNull();
  });

  it('should allow overriding getProduct with vi.spyOn', async () => {
    vi.spyOn(service, 'getProduct').mockReturnValue(of({ code: 'p1' }));
    expect(await firstValueFrom(service.getProduct())).toEqual({ code: 'p1' });
  });
});
