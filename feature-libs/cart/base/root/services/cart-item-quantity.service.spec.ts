/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { CartItemQuantityService } from './cart-item-quantity.service';

describe('CartItemQuantityService', () => {
  let service: CartItemQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartItemQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit the default quantity of 1', () => {
    let result: number | undefined;
    service
      .getQuantity()
      .pipe(take(1))
      .subscribe((quantity) => (result = quantity));

    expect(result).toBe(1);
  });

  it('should update the quantity via setQuantity', () => {
    let result: number | undefined;
    service.getQuantity().subscribe((quantity) => (result = quantity));

    service.setQuantity(5);

    expect(result).toBe(5);
  });

  it('should emit the latest quantity to late subscribers', () => {
    service.setQuantity(3);

    let result: number | undefined;
    service
      .getQuantity()
      .pipe(take(1))
      .subscribe((quantity) => (result = quantity));

    expect(result).toBe(3);
  });

  it('should reset the quantity to 1', () => {
    service.setQuantity(7);

    let result: number | undefined;
    service.getQuantity().subscribe((quantity) => (result = quantity));

    service.reset();

    expect(result).toBe(1);
  });
});
