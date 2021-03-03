import { PROCESS_FEATURE, StateUtils, MULTI_CART_DATA } from '@spartacus/core';
import { SavedCartActions } from './index';

import {
    SAVED_CART_LIST_PROCESS_ID,
    SAVED_CART_RESTORE_CART_PROCESS_ID,
    SAVED_CART_SAVE_CART_PROCESS_ID,
  } from '../saved-cart-state';

//mock inputs
const userId = "xxx@xxx.xxx";
const cartId= "00000000";
const error = "anError";

fdescribe('SavedCart Actions', () => {
    describe('LoadSavedCart Actions', () => {
        describe('LoadSavedCart', () => {
          it('should create the action', () => {
            const action = new SavedCartActions.LoadSavedCart({
              userId,
              cartId,
            });
    
            expect({ ...action }).toEqual({
              type: SavedCartActions.LOAD_SAVED_CART,
              payload: { userId, cartId },
              meta: StateUtils.entityLoadMeta(
                MULTI_CART_DATA,
                cartId
              ),
            });
          });
        });

        describe('LoadSavedCartSuccess', () => {
            it('should create the action', () => {
              const action = new SavedCartActions.LoadSavedCartSuccess({
                cartId,
              });
      
              expect({ ...action }).toEqual({
                type: SavedCartActions.LOAD_SAVED_CART_SUCCESS,
                payload: { cartId },
                meta: StateUtils.entitySuccessMeta(
                  MULTI_CART_DATA,
                  cartId
                ),
              });
            });
        });

        describe('LoadSavedCartFail', () => {
            it('should create the action', () => {
              const action = new SavedCartActions.LoadSavedCartFail({
                cartId,
                error
              });
      
              expect({ ...action }).toEqual({
                type: SavedCartActions.LOAD_SAVED_CART_FAIL,
                payload: { cartId, error },
                meta: StateUtils.entityFailMeta(
                  MULTI_CART_DATA,
                  cartId, 
                  error
                ),
              });
            });
        });
    });   




    describe('LoadSavedCarts Actions', () => {
      describe('LoadSavedCarts', () => {
        it('should create the action', () => {
          const action = new SavedCartActions.LoadSavedCarts({
            userId
          });
  
          expect({ ...action }).toEqual({
            type: SavedCartActions.LOAD_SAVED_CARTS,
            payload: { userId },
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
              payload: null,
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
              cartId,
              error
            });
    
            expect({ ...action }).toEqual({
              type: SavedCartActions.LOAD_SAVED_CARTS_FAIL,
              payload: { cartId, error },
              meta: StateUtils.entityFailMeta(
                PROCESS_FEATURE,
                SAVED_CART_LIST_PROCESS_ID,
                {cartId, error}
              ),
            });
          });
      });
      describe('ClearSavedCarts', () => {
        it('should create the action', () => {
          const action = new SavedCartActions.ClearSavedCarts();
  
          expect({ ...action }).toEqual({
            type: SavedCartActions.CLEAR_SAVED_CARTS,
            payload: null,
            meta: StateUtils.entityLoadMeta(
              PROCESS_FEATURE,
              SAVED_CART_LIST_PROCESS_ID,
            ),
          });
        });
      });
    }); 
    
    




    describe('RestoreSavedCart Actions', () => {
      describe('RestoreSavedCart', () => {
        it('should create the action', () => {
          const action = new SavedCartActions.RestoreSavedCart({
            userId,
            cartId
          });
  
          expect({ ...action }).toEqual({
            type: SavedCartActions.RESTORE_SAVED_CART,
            payload: { userId, cartId },
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
              payload: null,
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
              cartId,
              error
            });
    
            expect({ ...action }).toEqual({
              type: SavedCartActions.RESTORE_SAVED_CART_FAIL,
              payload: { cartId, error },
              meta: StateUtils.entityFailMeta(
                PROCESS_FEATURE,
                SAVED_CART_RESTORE_CART_PROCESS_ID,
                {cartId, error}
              ),
            });
          });
      });
      describe('ClearRestoreSavedCart', () => {
        it('should create the action', () => {
          const action = new SavedCartActions.ClearRestoreSavedCart();
  
          expect({ ...action }).toEqual({
            type: SavedCartActions.CLEAR_RESTORE_SAVED_CART,
            payload: null,
            meta: StateUtils.entityLoadMeta(
              PROCESS_FEATURE,
              SAVED_CART_RESTORE_CART_PROCESS_ID,
            ),
          });
        });
      });
    });

});
