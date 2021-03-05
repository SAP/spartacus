import { PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import { SAVED_CART_SAVE_CART_PROCESS_ID } from '../saved-cart-state';
import { SavedCartActions } from './index';

const userId = 'xxx@xxx.xxx';
const cartId = '123456789';
const saveCartDescription = 'testCartDescription';
const saveCartName = 'testCartName';
const extraData = {
  edit: false,
};

const error = 'anError';
// const cart: Cart = {
//   code: '123456789',
//   description: 'testCartDescription',
//   name: 'testCartName',
// };

describe('SavedCart Actions', () => {
  describe('SaveCart Actions', () => {
    describe('SaveCart', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.SaveCart({
          userId,
          cartId,
          saveCartName,
          saveCartDescription,
          extraData,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.SAVE_CART,
          payload: {
            userId,
            cartId,
            saveCartName,
            saveCartDescription,
            extraData,
          },
          meta: StateUtils.entityLoadMeta(
            PROCESS_FEATURE,
            SAVED_CART_SAVE_CART_PROCESS_ID
          ),
        });
      });
    });

    describe('SaveCartFail', () => {
      it('should create the action', () => {
        const action = new SavedCartActions.SaveCartFail({
          error,
        });

        expect({ ...action }).toEqual({
          type: SavedCartActions.SAVE_CART_FAIL,
          payload: {
            error,
          },
          meta: StateUtils.entityFailMeta(
            PROCESS_FEATURE,
            SAVED_CART_SAVE_CART_PROCESS_ID,
            { error }
          ),
        });
      });
    });

    // describe('SaveCartSuccess', () => {
    //   it('should create the action', () => {
    //     const action = new SavedCartActions.SaveCartSuccess();

    //     expect({ ...action }).toEqual({
    //       type: SavedCartActions.SAVE_CART_SUCCESS,
    //       meta: StateUtils.entityFailMeta(
    //         PROCESS_FEATURE,
    //         SAVED_CART_SAVE_CART_PROCESS_ID
    //       ),
    //     });
    //   });
    // });
  });
});
