import { Cart, CartType } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';
import { MULTI_CART_DATA } from '../multi-cart-state';
import { CartActions } from './index';

const cart: Cart = {
  code: 'xxx',
  guid: 'xxx',
  totalItems: 0,
  totalPrice: {
    currencyIso: 'USD',
    value: 0,
  },
  totalPriceWithTax: {
    currencyIso: 'USD',
    value: 0,
  },
};

describe('MultiCart Actions', () => {
  describe('CartProcessesIncrement', () => {
    it('should create the action', () => {
      const payload = 'cartId';
      const action = new CartActions.CartProcessesIncrement(payload);
      expect({ ...action }).toEqual({
        type: CartActions.CART_PROCESSES_INCREMENT,
        payload,
        meta: StateUtils.entityProcessesIncrementMeta(MULTI_CART_DATA, payload),
      });
    });
  });

  describe('CartProcessesDecrement', () => {
    it('should create the action', () => {
      const payload = 'cartId';
      const action = new CartActions.CartProcessesDecrement(payload);
      expect({ ...action }).toEqual({
        type: CartActions.CART_PROCESSES_DECREMENT,
        payload,
        meta: StateUtils.entityProcessesDecrementMeta(MULTI_CART_DATA, payload),
      });
    });
  });

  describe('SetActiveCartId', () => {
    it('should set active cart id', () => {
      const payload = 'cartId';
      const action = new CartActions.SetActiveCartId(payload);
      expect({ ...action }).toEqual({
        type: CartActions.SET_ACTIVE_CART_ID,
        payload,
      });
    });
  });

  describe('ClearCartState', () => {
    it('should clear whole multi cart state', () => {
      const action = new CartActions.ClearCartState();
      expect({ ...action }).toEqual({
        type: CartActions.CLEAR_CART_STATE,
        meta: StateUtils.entityRemoveAllMeta(MULTI_CART_DATA),
      });
    });
  });

  describe('SetCartData Actions', () => {
    describe('SetCartData', () => {
      it('should create the action', () => {
        const payload = { cart, cartId: 'testUserId' };
        const action = new CartActions.SetCartData(payload);
        expect({ ...action }).toEqual({
          type: CartActions.SET_CART_DATA,
          payload,
          meta: StateUtils.entitySuccessMeta(MULTI_CART_DATA, 'testUserId'),
        });
      });
    });
  });

  describe('SetCartTypeIndex Actions', () => {
    describe('SetCartTypeIndex', () => {
      it('should create the action', () => {
        const payload = { cartType: CartType.ACTIVE, cartId: 'testCartId' };
        const action = new CartActions.SetCartTypeIndex(payload);
        expect({ ...action }).toEqual({
          type: CartActions.SET_CART_TYPE_INDEX,
          payload,
        });
      });
    });
  });
});
