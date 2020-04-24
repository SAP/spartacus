import { Cart } from '../../../model/cart.model';
import { StateUtils } from '../../../state/utils/index';
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

const tempCartId = 'tempCartId';

describe('MultiCart Actions', () => {
  describe('TempCart Actions', () => {
    describe('SetTempCart', () => {
      it('should create the action', () => {
        const payload = { cart, tempCartId };
        const action = new CartActions.SetTempCart(payload);
        expect({ ...action }).toEqual({
          type: CartActions.SET_TEMP_CART,
          payload,
          meta: StateUtils.entitySuccessMeta(MULTI_CART_DATA, tempCartId),
        });
      });
    });
  });

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
});
