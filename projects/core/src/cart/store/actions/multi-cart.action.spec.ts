import { Cart } from '../../../model/cart.model';
import { entityRemoveMeta } from '../../../state/utils/entity/entity.action';
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
    describe('RemoveTempCart', () => {
      it('should create the action', () => {
        const action = new CartActions.RemoveTempCart({
          tempCartId: tempCartId,
        });
        expect({ ...action }).toEqual({
          type: CartActions.REMOVE_TEMP_CART,
          payload: { tempCartId },
          meta: StateEntityActions.entityRemoveMeta(
            MULTI_CART_DATA,
            tempCartId
          ),
        });
      });
    });

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

  describe('MergeMultiCart', () => {
    it('should create the action', () => {
      const payload = {};
      const action = new CartActions.MergeMultiCart(payload);
      expect({ ...action }).toEqual({
        type: CartActions.MERGE_MULTI_CART,
        payload,
      });
    });
  });

  describe('MergeMultiCartSuccess', () => {
    it('should create the action', () => {
      const payload = {
        oldCartId: 'oldCartId',
        cartId: 'cartId',
        userId: 'userId',
      };
      const action = new CartActions.MergeMultiCartSuccess(payload);
      expect({ ...action }).toEqual({
        type: CartActions.MERGE_MULTI_CART_SUCCESS,
        payload,
        meta: entityRemoveMeta(MULTI_CART_DATA, payload.oldCartId),
      });
    });
  });

  describe('ResetMultiCartDetails', () => {
    it('should create the action', () => {
      const action = new CartActions.ResetMultiCartDetails();
      expect({ ...action }).toEqual({
        type: CartActions.RESET_MULTI_CART_DETAILS,
        meta: StateEntityProcessesLoaderActions.entityProcessesLoaderResetMeta(
          MULTI_CART_DATA,
          undefined
        ),
      });
    });
  });

  describe('RemoveCart', () => {
    it('should create the action', () => {
      const payload = 'cartId';
      const action = new CartActions.RemoveCart(payload);
      expect({ ...action }).toEqual({
        type: CartActions.REMOVE_CART,
        payload,
        meta: entityRemoveMeta(MULTI_CART_DATA, payload),
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
