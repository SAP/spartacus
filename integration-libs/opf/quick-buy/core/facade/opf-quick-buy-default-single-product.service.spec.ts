/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { CartItemQuantityService } from '@spartacus/cart/base/root';
import { OpfQuickBuyDefaultSingleProductService } from './opf-quick-buy-default-single-product.service';

describe('OpfQuickBuyDefaultSingleProductService', () => {
  let service: OpfQuickBuyDefaultSingleProductService;
  let cartItemQuantityService: CartItemQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfQuickBuyDefaultSingleProductService,
        CartItemQuantityService,
      ],
    });

    service = TestBed.inject(OpfQuickBuyDefaultSingleProductService);
    cartItemQuantityService = TestBed.inject(CartItemQuantityService);
  });

  it('should return quantity from CartItemQuantityService', (done) => {
    cartItemQuantityService.setQuantity(4);

    service.getSingleProductCartOptions('product-1').subscribe((options) => {
      expect(options).toEqual({ quantity: 4 });
      done();
    });
  });

  it('should reflect quantity updates', (done) => {
    cartItemQuantityService.setQuantity(2);

    service.getSingleProductCartOptions('product-1').subscribe((options) => {
      expect(options.quantity).toBe(2);
      done();
    });
  });
});
