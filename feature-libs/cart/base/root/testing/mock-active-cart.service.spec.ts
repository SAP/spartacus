/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { ActiveCartFacade } from '../facade/active-cart.facade';
import { ActiveCartTestingModule } from './active-cart-testing.module';
import { MockActiveCartService } from './mock-active-cart.service';

describe('MockActiveCartService', () => {
  let service: ActiveCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ActiveCartTestingModule] });
    service = TestBed.inject(ActiveCartFacade);
  });

  it('should be provided via ActiveCartTestingModule', () => {
    expect(service).toBeInstanceOf(MockActiveCartService);
  });

  it('should return defaults', async () => {
    expect(await firstValueFrom(service.getActive())).toEqual({});
    expect(await firstValueFrom(service.getEntries())).toEqual([]);
    expect(await firstValueFrom(service.isStable())).toBe(true);
  });

  it('should allow overriding a method return value with vi.spyOn', async () => {
    vi.spyOn(service, 'getActiveCartId').mockReturnValue(of('cart-1'));
    expect(await firstValueFrom(service.getActiveCartId())).toBe('cart-1');
  });
});
