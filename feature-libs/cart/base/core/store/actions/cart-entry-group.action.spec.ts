import { CartModification } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';
import { MULTI_CART_DATA } from '../multi-cart-state';
import { CartActions } from './index';

const userId = 'xxx@xxx.xxx';
const cartId = 'testCartId';
const entry = { orderCode: '1' };
const entryGroupNumber = 1;
const quantity = 1;
let mockCartModification: Required<CartModification>;

describe('Cart-entry Actions', () => {
  beforeEach(() => {
    mockCartModification = {
      deliveryModeChanged: true,
      entry: {},
      quantity: 1,
      quantityAdded: 1,
      statusCode: 'statusCode',
      statusMessage: 'statusMessage',
    };
  });

  describe('AddToEntryGroup Actions', () => {
    describe('AddToEntryGroup', () => {
      it('should create the action', () => {
        const payload = {
          userId,
          cartId,
          entry,
          entryGroupNumber,
          quantity,
        };
        const action = new CartActions.AddToEntryGroup(payload);
        expect({ ...action }).toEqual({
          type: CartActions.ADD_TO_ENTRY_GROUP,
          payload: payload,
          meta: StateUtils.entityProcessesIncrementMeta(
            MULTI_CART_DATA,
            cartId
          ),
        });
      });
    });

    describe('AddToEntryGroupFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const payload = {
          error,
          cartId,
          userId,
          entryGroupNumber,
          ...mockCartModification,
        };
        const action = new CartActions.AddToEntryGroupFail(payload);

        expect({ ...action }).toEqual({
          type: CartActions.ADD_TO_ENTRY_GROUP_FAIL,
          payload,
          meta: StateUtils.entityProcessesDecrementMeta(
            MULTI_CART_DATA,
            cartId
          ),
        });
      });
    });

    describe('AddToEntryGroupSuccess', () => {
      it('should create the action', () => {
        const payload = {
          cartId: 'cartId',
          userId: 'userId',
          entryGroupNumber,
          ...mockCartModification,
        };
        const action = new CartActions.AddToEntryGroupSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.ADD_TO_ENTRY_GROUP_SUCCESS,
          payload,
          meta: StateUtils.entityProcessesDecrementMeta(
            MULTI_CART_DATA,
            'cartId'
          ),
        });
      });
    });
  });

  describe('DeleteEntryGroup Actions', () => {
    describe('DeleteEntryGroup', () => {
      it('should create the action', () => {
        const payload = { userId, cartId, entryGroupNumber };
        const action = new CartActions.DeleteEntryGroup(payload);
        expect({ ...action }).toEqual({
          type: CartActions.DELETE_ENTRY_GROUP,
          payload: payload,
          meta: StateUtils.entityProcessesIncrementMeta(
            MULTI_CART_DATA,
            cartId
          ),
        });
      });
    });

    describe('DeleteEntryGroupFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const payload = { error, cartId, userId, entryGroupNumber };
        const action = new CartActions.DeleteEntryGroupFail(payload);
        expect({ ...action }).toEqual({
          type: CartActions.DELETE_ENTRY_GROUP_FAIL,
          payload,
          meta: StateUtils.entityProcessesDecrementMeta(
            MULTI_CART_DATA,
            cartId
          ),
        });
      });
    });

    describe('DeleteEntryGroupSuccess', () => {
      it('should create the action', () => {
        const payload = {
          userId: 'userId',
          cartId: 'cartId',
          entryGroupNumber,
        };
        const action = new CartActions.DeleteEntryGroupSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.DELETE_ENTRY_GROUP_SUCCESS,
          payload,
          meta: StateUtils.entityProcessesDecrementMeta(
            MULTI_CART_DATA,
            'cartId'
          ),
        });
      });
    });
  });
});
