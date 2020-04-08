import { Cart } from '../../../model/cart.model';
import {
  StateEntityActions,
  StateEntityLoaderActions,
  StateEntityProcessesLoaderActions,
} from '../../../state/utils/index';
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
          meta: StateEntityLoaderActions.entitySuccessMeta(
            MULTI_CART_DATA,
            tempCartId
          ),
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
        meta: StateEntityProcessesLoaderActions.entityProcessesIncrementMeta(
          MULTI_CART_DATA,
          payload
        ),
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
        meta: StateEntityProcessesLoaderActions.entityProcessesDecrementMeta(
          MULTI_CART_DATA,
          payload
        ),
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

  describe('ClearMultiCartState', () => {
    it('should clear whole multi cart state', () => {
      const action = new CartActions.ClearMultiCartState();
      expect({ ...action }).toEqual({
        type: CartActions.CLEAR_MULTI_CART_STATE,
        meta: StateEntityActions.entityRemoveMeta(MULTI_CART_DATA, null),
      });
    });
  });
});
