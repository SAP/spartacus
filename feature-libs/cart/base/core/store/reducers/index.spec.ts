/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { Cart } from '@spartacus/cart/base/root';
import { FeatureToggles } from '@spartacus/core';
import { CartActions } from '../actions/index';
import { getMultiCartReducers } from './index';
import { createCartEntitiesReducer } from './multi-cart.reducer';

const baseCart: Cart = {
  code: 'cart-1',
  entries: [{ entryNumber: 0, quantity: 1, product: { code: 'A' } }],
};

const addEntrySuccess = new CartActions.CartAddEntrySuccess({
  userId: 'userId',
  cartId: 'cart-1',
  productCode: 'B',
  quantity: 1,
  entry: { entryNumber: 1, quantity: 1, product: { code: 'B' } },
});

describe('getMultiCartReducers (factory)', () => {
  describe('inside an Angular injection context', () => {
    it('should set the slow-network branch ON when the toggle is enabled and merge entries', () => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: FeatureToggles,
            useValue: { enableCartSlowNetworkResilience: true },
          },
        ],
      });

      const map = TestBed.runInInjectionContext(() => getMultiCartReducers());
      expect(map.carts).toBeDefined();
      expect(map.index).toBeDefined();

      // Drive a CART_ADD_ENTRY_SUCCESS through a toggle-ON reducer to confirm
      // the factory wires up the closure correctly.
      const reducer = createCartEntitiesReducer(true);
      const state = reducer(baseCart, addEntrySuccess);
      expect(state?.entries?.length).toBe(2);
      expect(state?.entries?.[1]?.product?.code).toBe('B');
    });

    it('should fall back OFF when the toggle is disabled (state untouched)', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          {
            provide: FeatureToggles,
            useValue: { enableCartSlowNetworkResilience: false },
          },
        ],
      });

      const map = TestBed.runInInjectionContext(() => getMultiCartReducers());
      expect(map.carts).toBeDefined();

      const reducer = createCartEntitiesReducer(false);
      const state = reducer(baseCart, addEntrySuccess);
      expect(state).toBe(baseCart);
    });
  });

  describe('outside any Angular injection context', () => {
    it('should swallow the inject() error and fall back OFF', () => {
      // Calling the factory directly outside a runInInjectionContext block
      // throws NG0203 from inject(). The try/catch in the factory must
      // recover and force OFF.
      const map = getMultiCartReducers();
      expect(map.carts).toBeDefined();
      expect(map.index).toBeDefined();

      const reducer = createCartEntitiesReducer(false);
      const state = reducer(baseCart, addEntrySuccess);
      expect(state).toBe(baseCart);
    });
  });
});
