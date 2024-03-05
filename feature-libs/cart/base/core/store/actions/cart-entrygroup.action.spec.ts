import { StateUtils } from '@spartacus/core';
import { MULTI_CART_DATA } from '../multi-cart-state';
import { CartActions } from './index';

const userId = 'xxx@xxx.xxx';
const cartId = 'testCartId';
const entryGroupNumber = 1;

describe('Cart-entrygroup Actions', () => {
  beforeEach(() => {});

  describe('RemoveCartEntryGroup Actions', () => {
    describe('CartRemoveEntryGroup', () => {
      it('should create the action', () => {
        const payload = { userId, cartId, entryGroupNumber };
        const action = new CartActions.CartRemoveEntryGroup(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_REMOVE_ENTRYGROUP,
          payload: payload,
          meta: StateUtils.entityProcessesIncrementMeta(
            MULTI_CART_DATA,
            cartId
          ),
        });
      });
    });

    describe('CartRemoveEntryGroupFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const payload = { error, cartId, userId, entryGroupNumber };
        const action = new CartActions.CartRemoveEntryGroupFail(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_REMOVE_ENTRYGROUP_FAIL,
          payload,
          meta: StateUtils.entityProcessesDecrementMeta(
            MULTI_CART_DATA,
            cartId
          ),
        });
      });
    });

    describe('CartRemoveEntryGroupSuccess', () => {
      it('should create the action', () => {
        const payload = { userId, cartId, entryGroupNumber };
        const action = new CartActions.CartRemoveEntryGroupSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_REMOVE_ENTRYGROUP_SUCCESS,
          payload,
          meta: StateUtils.entityProcessesDecrementMeta(
            MULTI_CART_DATA,
            cartId
          ),
        });
      });
    });
  });
});
