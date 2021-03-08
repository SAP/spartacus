import { MULTI_CART_DATA, PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import {
  SAVED_CART_LIST_PROCESS_ID,
  SAVED_CART_RESTORE_CART_PROCESS_ID,
  SAVED_CART_SAVE_CART_PROCESS_ID,
} from '../saved-cart-state';
import { SavedCartActions } from './index';

const mockUserId = 'test-user';
const mockCartId = 'test-cart';
const error = 'anError';

describe('SavedCart Actions', () => {
  describe('LoadSavedCart Actions', () => {
    describe('LoadSavedCart', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.LoadSavedCart({
          userId: mockUserId,
          cartId: mockCartId,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.LOAD_SAVED_CART,
          payload: { userId: mockUserId, cartId: mockCartId },
          meta: StateUtils.entityLoadMeta(MULTI_CART_DATA, mockCartId),
        });
      });
    });

    describe('LoadSavedCartSuccess', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.LoadSavedCartSuccess({
          cartId: mockCartId,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.LOAD_SAVED_CART_SUCCESS,
          payload: { cartId: mockCartId },
          meta: StateUtils.entitySuccessMeta(MULTI_CART_DATA, mockCartId),
        });
      });
    });
    describe('LoadSavedCartFail', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.LoadSavedCartFail({
          cartId: mockCartId,
          error,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.LOAD_SAVED_CART_FAIL,
          payload: { cartId: mockCartId, error },
          meta: StateUtils.entityFailMeta(MULTI_CART_DATA, mockCartId, error),
        });
      });
    });
  });

  describe('LoadSavedCarts Actions', () => {
    describe('LoadSavedCarts', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.LoadSavedCarts({
          userId: mockUserId,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.LOAD_SAVED_CARTS,
          payload: { userId: mockUserId },
          meta: StateUtils.entityLoadMeta(
            PROCESS_FEATURE,
            SAVED_CART_LIST_PROCESS_ID
          ),
        });
      });
    });
    describe('LoadSavedCartsSuccess', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.LoadSavedCartsSuccess();

        expect({ ...action }).toEqual({
          type: SavedCartActions.LOAD_SAVED_CARTS_SUCCESS,
          payload: undefined,
          meta: StateUtils.entitySuccessMeta(
            PROCESS_FEATURE,
            SAVED_CART_LIST_PROCESS_ID
          ),
        });
      });
    });
    describe('LoadSavedCartsFail', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.LoadSavedCartsFail({
          cartId: mockCartId,
          error,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.LOAD_SAVED_CARTS_FAIL,
          payload: { cartId: mockCartId, error },
          meta: StateUtils.entityFailMeta(
            PROCESS_FEATURE,
            SAVED_CART_LIST_PROCESS_ID,
            { cartId: mockCartId, error }
          ),
        });
      });
    });
    describe('ClearSavedCarts', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.ClearSavedCarts();

        expect({ ...action }).toEqual({
          type: SavedCartActions.CLEAR_SAVED_CARTS,
          meta: StateUtils.entityResetMeta(
            PROCESS_FEATURE,
            SAVED_CART_LIST_PROCESS_ID
          ),
        });
      });
    });
  });

  describe('RestoreSavedCart Actions', () => {
    describe('RestoreSavedCart', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.RestoreSavedCart({
          userId: mockUserId,
          cartId: mockCartId,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.RESTORE_SAVED_CART,
          payload: { userId: mockUserId, cartId: mockCartId },
          meta: StateUtils.entityLoadMeta(
            PROCESS_FEATURE,
            SAVED_CART_RESTORE_CART_PROCESS_ID
          ),
        });
      });
    });
    describe('RestoreSavedCartSuccess', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.RestoreSavedCartSuccess();

        expect({ ...action }).toEqual({
          type: SavedCartActions.RESTORE_SAVED_CART_SUCCESS,
          payload: undefined,
          meta: StateUtils.entitySuccessMeta(
            PROCESS_FEATURE,
            SAVED_CART_RESTORE_CART_PROCESS_ID
          ),
        });
      });
    });
    describe('RestoreSavedCartFail', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.RestoreSavedCartFail({
          cartId: mockCartId,
          error,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.RESTORE_SAVED_CART_FAIL,
          payload: { cartId: mockCartId, error },
          meta: StateUtils.entityFailMeta(
            PROCESS_FEATURE,
            SAVED_CART_RESTORE_CART_PROCESS_ID,
            { cartId: mockCartId, error }
          ),
        });
      });
    });
    describe('ClearRestoreSavedCart', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.ClearRestoreSavedCart();

        expect({ ...action }).toEqual({
          type: SavedCartActions.CLEAR_RESTORE_SAVED_CART,
          meta: StateUtils.entityResetMeta(
            PROCESS_FEATURE,
            SAVED_CART_RESTORE_CART_PROCESS_ID
          ),
        });
      });
    });
  });

  describe('SaveCart Actions', () => {
    describe('SaveCart', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.SaveCart({
          userId: mockUserId,
          cartId: mockCartId,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.SAVE_CART,
          payload: { userId: mockUserId, cartId: mockCartId },
          meta: StateUtils.entityLoadMeta(
            PROCESS_FEATURE,
            SAVED_CART_SAVE_CART_PROCESS_ID
          ),
        });
      });
    });

    describe('SaveCartSuccess', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.SaveCartSuccess();

        expect({ ...action }).toEqual({
          type: SavedCartActions.SAVE_CART_SUCCESS,
          payload: undefined,
          meta: StateUtils.entitySuccessMeta(
            PROCESS_FEATURE,
            SAVED_CART_SAVE_CART_PROCESS_ID
          ),
        });
      });
    });
    describe('SaveCartFail', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.SaveCartFail({
          cartId: mockCartId,
          error,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.SAVE_CART_FAIL,
          payload: { cartId: mockCartId, error },
          meta: StateUtils.entityFailMeta(
            PROCESS_FEATURE,
            SAVED_CART_SAVE_CART_PROCESS_ID,
            { cartId: mockCartId, error }
          ),
        });
      });
    });
    describe('ClearSaveCart', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.ClearSaveCart();

        expect({ ...action }).toEqual({
          type: SavedCartActions.CLEAR_SAVE_CART,
          meta: StateUtils.entityResetMeta(
            PROCESS_FEATURE,
            SAVED_CART_SAVE_CART_PROCESS_ID
          ),
        });
      });
    });
  });
});
