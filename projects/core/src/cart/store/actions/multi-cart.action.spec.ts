import { Cart } from '../../../model/cart.model';
import { entityRemoveMeta } from '../../../state/utils/entity/entity.action';
import {
  StateEntityActions,
  StateEntityLoaderActions,
  StateEntityProcessesLoaderActions,
} from '../../../state/utils/index';
import { MULTI_CART_FEATURE } from '../multi-cart-state';
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
            MULTI_CART_FEATURE,
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
            MULTI_CART_FEATURE,
            tempCartId
          ),
        });
      });
    });

    describe('CreateMultiCart', () => {
      it('should create the action', () => {
        const action = new CartActions.CreateMultiCart({
          tempCartId,
        });
        expect({ ...action }).toEqual({
          type: CartActions.CREATE_MULTI_CART,
          payload: { tempCartId },
          meta: StateEntityLoaderActions.entityLoadMeta(
            MULTI_CART_FEATURE,
            tempCartId
          ),
        });
      });
    });

    describe('CreateMultiCartFail', () => {
      it('should create the action', () => {
        const action = new CartActions.CreateMultiCartFail({
          tempCartId,
        });
        expect({ ...action }).toEqual({
          type: CartActions.CREATE_MULTI_CART_FAIL,
          payload: { tempCartId },
          meta: StateEntityLoaderActions.entityFailMeta(
            MULTI_CART_FEATURE,
            tempCartId
          ),
        });
      });
    });
  });

  describe('CreateMultiCartSuccess', () => {
    it('should create the action', () => {
      const payload = { cart, userId: 'userId' };
      const action = new CartActions.CreateMultiCartSuccess(payload);
      expect({ ...action }).toEqual({
        type: CartActions.CREATE_MULTI_CART_SUCCESS,
        payload,
        meta: StateEntityLoaderActions.entitySuccessMeta(
          MULTI_CART_FEATURE,
          cart.code
        ),
      });
    });
  });

  describe('LoadMultiCart', () => {
    it('should create the action', () => {
      const payload = { cartId: 'cartId', userId: 'userId' };
      const action = new CartActions.LoadMultiCart(payload);
      expect({ ...action }).toEqual({
        type: CartActions.LOAD_MULTI_CART,
        payload,
        meta: StateEntityLoaderActions.entityLoadMeta(
          MULTI_CART_FEATURE,
          payload.cartId
        ),
      });
    });
  });

  describe('LoadMultiCartFail', () => {
    it('should create the action', () => {
      const payload = { cartId: 'cartId', error: 'error' };
      const action = new CartActions.LoadMultiCartFail(payload);
      expect({ ...action }).toEqual({
        type: CartActions.LOAD_MULTI_CART_FAIL,
        payload,
        meta: StateEntityLoaderActions.entityFailMeta(
          MULTI_CART_FEATURE,
          payload.cartId,
          payload.error
        ),
      });
    });
  });

  describe('LoadMultiCartSuccess', () => {
    it('should create the action', () => {
      const payload = { cart, userId: 'userId', extraData: undefined };
      const action = new CartActions.LoadMultiCartSuccess(payload);
      expect({ ...action }).toEqual({
        type: CartActions.LOAD_MULTI_CART_SUCCESS,
        payload,
        meta: StateEntityLoaderActions.entitySuccessMeta(
          MULTI_CART_FEATURE,
          payload.cart.code
        ),
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
        meta: entityRemoveMeta(MULTI_CART_FEATURE, payload.oldCartId),
      });
    });
  });

  describe('ResetMultiCartDetails', () => {
    it('should create the action', () => {
      const action = new CartActions.ResetMultiCartDetails();
      expect({ ...action }).toEqual({
        type: CartActions.RESET_MULTI_CART_DETAILS,
        meta: StateEntityProcessesLoaderActions.entityProcessesLoaderResetMeta(
          MULTI_CART_FEATURE,
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
        meta: entityRemoveMeta(MULTI_CART_FEATURE, payload),
      });
    });
  });

  describe('AddEmailToMultiCart', () => {
    it('should create the action', () => {
      const payload = {
        userId: 'userId',
        cartId: 'cartId',
        email: 'test@email.com',
      };
      const action = new CartActions.AddEmailToMultiCart(payload);
      expect({ ...action }).toEqual({
        type: CartActions.ADD_EMAIL_TO_MULTI_CART,
        payload,
        meta: StateEntityLoaderActions.entityLoadMeta(
          MULTI_CART_FEATURE,
          payload.cartId
        ),
      });
    });
  });

  describe('AddEmailToMultiCartFail', () => {
    it('should create the action', () => {
      const payload = { userId: 'userId', cartId: 'cartId', error: 'error' };
      const action = new CartActions.AddEmailToMultiCartFail(payload);
      expect({ ...action }).toEqual({
        type: CartActions.ADD_EMAIL_TO_MULTI_CART_FAIL,
        payload,
        meta: StateEntityLoaderActions.entityFailMeta(
          MULTI_CART_FEATURE,
          payload.cartId,
          payload.error
        ),
      });
    });
  });

  describe('AddEmailToMultiCartSuccess', () => {
    it('should create the action', () => {
      const payload = { userId: 'userId', cartId: 'cartId' };
      const action = new CartActions.AddEmailToMultiCartSuccess(payload);
      expect({ ...action }).toEqual({
        type: CartActions.ADD_EMAIL_TO_MULTI_CART_SUCCESS,
        payload,
        meta: StateEntityLoaderActions.entitySuccessMeta(
          MULTI_CART_FEATURE,
          payload.cartId
        ),
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
          MULTI_CART_FEATURE,
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
          MULTI_CART_FEATURE,
          payload
        ),
      });
    });
  });
});
