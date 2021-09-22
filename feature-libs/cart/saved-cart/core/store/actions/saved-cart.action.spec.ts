import { MULTI_CART_DATA, PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import {
  SAVED_CART_CLONE_CART_PROCESS_ID,
  SAVED_CART_LIST_PROCESS_ID,
  SAVED_CART_RESTORE_CART_PROCESS_ID,
  SAVED_CART_SAVE_CART_PROCESS_ID,
} from '../saved-cart-constants';
import { SavedCartActions } from './index';

const mockUserId = 'test-user';
const mockCartId = 'test-cart';
const mockCartName = 'test-cart-name';
const mockCartDescription = 'test-cart-description';
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
          userId: mockUserId,
          cartId: mockCartId,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.LOAD_SAVED_CART_SUCCESS,
          payload: { userId: mockUserId, cartId: mockCartId },
          meta: StateUtils.entitySuccessMeta(MULTI_CART_DATA, mockCartId),
        });
      });
    });
    describe('LoadSavedCartFail', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.LoadSavedCartFail({
          userId: mockUserId,
          cartId: mockCartId,
          error,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.LOAD_SAVED_CART_FAIL,
          payload: { userId: mockUserId, cartId: mockCartId, error },
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
        const action = new SavedCartActions.LoadSavedCartsSuccess({
          userId: mockUserId,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.LOAD_SAVED_CARTS_SUCCESS,
          payload: { userId: mockUserId },
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
          userId: mockUserId,
          error,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.LOAD_SAVED_CARTS_FAIL,
          payload: { userId: mockUserId, error },
          meta: StateUtils.entityFailMeta(
            PROCESS_FEATURE,
            SAVED_CART_LIST_PROCESS_ID,
            error
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
        const action = new SavedCartActions.RestoreSavedCartSuccess({
          userId: mockUserId,
          cartId: mockCartId,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.RESTORE_SAVED_CART_SUCCESS,
          payload: {
            userId: mockUserId,
            cartId: mockCartId,
          },
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
          userId: mockUserId,
          cartId: mockCartId,
          error,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.RESTORE_SAVED_CART_FAIL,
          payload: { userId: mockUserId, cartId: mockCartId, error },
          meta: StateUtils.entityFailMeta(
            PROCESS_FEATURE,
            SAVED_CART_RESTORE_CART_PROCESS_ID,
            error
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
        const action = new SavedCartActions.SaveCartSuccess({
          userId: mockUserId,
          cartId: mockCartId,
          saveCartName: mockCartName,
          saveCartDescription: mockCartDescription,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.SAVE_CART_SUCCESS,
          payload: {
            userId: mockUserId,
            cartId: mockCartId,
            saveCartName: mockCartName,
            saveCartDescription: mockCartDescription,
          },
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
          userId: mockUserId,
          cartId: mockCartId,
          saveCartName: mockCartName,
          saveCartDescription: mockCartDescription,
          error,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.SAVE_CART_FAIL,
          payload: {
            userId: mockUserId,
            cartId: mockCartId,
            saveCartName: mockCartName,
            saveCartDescription: mockCartDescription,
            error,
          },
          meta: StateUtils.entityFailMeta(
            PROCESS_FEATURE,
            SAVED_CART_SAVE_CART_PROCESS_ID,
            error
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

  describe('EditSavedCart Actions', () => {
    describe('EditSavedCart', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.EditSavedCart({
          userId: mockUserId,
          cartId: mockCartId,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.EDIT_SAVED_CART,
          payload: { userId: mockUserId, cartId: mockCartId },
          meta: StateUtils.entityLoadMeta(
            PROCESS_FEATURE,
            SAVED_CART_SAVE_CART_PROCESS_ID
          ),
        });
      });
    });

    describe('EditSavedCartSuccess', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.EditSavedCartSuccess({
          userId: mockUserId,
          cartId: mockCartId,
          saveCartName: mockCartName,
          saveCartDescription: mockCartDescription,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.EDIT_SAVED_CART_SUCCESS,
          payload: {
            userId: mockUserId,
            cartId: mockCartId,
            saveCartName: mockCartName,
            saveCartDescription: mockCartDescription,
          },
          meta: StateUtils.entitySuccessMeta(
            PROCESS_FEATURE,
            SAVED_CART_SAVE_CART_PROCESS_ID
          ),
        });
      });
    });
    describe('EditSavedCartFail', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.EditSavedCartFail({
          userId: mockUserId,
          cartId: mockCartId,
          saveCartName: mockCartName,
          saveCartDescription: mockCartDescription,
          error,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.EDIT_SAVED_CART_FAIL,
          payload: {
            userId: mockUserId,
            cartId: mockCartId,
            saveCartName: mockCartName,
            saveCartDescription: mockCartDescription,
            error,
          },
          meta: StateUtils.entityFailMeta(
            PROCESS_FEATURE,
            SAVED_CART_SAVE_CART_PROCESS_ID,
            error
          ),
        });
      });
    });
  });

  describe('CloneSavedCart Actions', () => {
    describe('CloneSavedCart', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.CloneSavedCart({
          userId: mockUserId,
          cartId: mockCartId,
          saveCartName: mockCartName,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.CLONE_SAVED_CART,
          payload: {
            userId: mockUserId,
            cartId: mockCartId,
            saveCartName: mockCartName,
          },
          meta: StateUtils.entityLoadMeta(
            PROCESS_FEATURE,
            SAVED_CART_CLONE_CART_PROCESS_ID
          ),
        });
      });
    });
    describe('CloneSavedCartSuccess', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.CloneSavedCartSuccess({
          userId: mockUserId,
          cartId: mockCartId,
          saveCartName: mockCartName,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.CLONE_SAVED_CART_SUCCESS,
          payload: {
            userId: mockUserId,
            cartId: mockCartId,
            saveCartName: mockCartName,
          },
          meta: StateUtils.entitySuccessMeta(
            PROCESS_FEATURE,
            SAVED_CART_CLONE_CART_PROCESS_ID
          ),
        });
      });
    });
    describe('CloneSavedCartFail', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.CloneSavedCartFail({
          userId: mockUserId,
          cartId: mockCartId,
          saveCartName: mockCartName,
          error,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.CLONE_SAVED_CART_FAIL,
          payload: {
            userId: mockUserId,
            cartId: mockCartId,
            saveCartName: mockCartName,
            error,
          },
          meta: StateUtils.entityFailMeta(
            PROCESS_FEATURE,
            SAVED_CART_CLONE_CART_PROCESS_ID,
            error
          ),
        });
      });
    });
    describe('ClearCloneSavedCart', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.ClearCloneSavedCart();

        expect({ ...action }).toEqual({
          type: SavedCartActions.CLEAR_CLONE_SAVED_CART,
          meta: StateUtils.entityResetMeta(
            PROCESS_FEATURE,
            SAVED_CART_CLONE_CART_PROCESS_ID
          ),
        });
      });
    });
  });
});
