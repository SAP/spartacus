import { CartModification } from '../../../model/cart.model';
import { StateEntityProcessesLoaderActions } from '../../../state/utils/index';
import { MULTI_CART_DATA } from '../multi-cart-state';
import { CartActions } from './index';

const userId = 'xxx@xxx.xxx';
const cartId = 'testCartId';
const productCode = 'testProductCode';
const entryNumber = 'testEntryNumber';
let mockCartModification: CartModification;

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

  describe('AddCartEntry Actions', () => {
    describe('CartAddEntry', () => {
      it('should create the action', () => {
        const payload = {
          userId,
          cartId,
          productCode,
          quantity: 1,
        };
        const action = new CartActions.CartAddEntry(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_ADD_ENTRY,
          payload: payload,
          meta: StateEntityProcessesLoaderActions.entityProcessesIncrementMeta(
            MULTI_CART_DATA,
            cartId
          ),
        });
      });
    });

    describe('CartAddEntryFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const payload = {
          error,
          cartId,
          userId,
          productCode,
          ...mockCartModification,
        };
        const action = new CartActions.CartAddEntryFail(payload);

        expect({ ...action }).toEqual({
          type: CartActions.CART_ADD_ENTRY_FAIL,
          payload,
          meta: StateEntityProcessesLoaderActions.entityProcessesDecrementMeta(
            MULTI_CART_DATA,
            cartId
          ),
        });
      });
    });

    describe('CartAddEntrySuccess', () => {
      it('should create the action', () => {
        const payload = {
          cartId: 'cartId',
          userId: 'userId',
          productCode,
          ...mockCartModification,
        };
        const action = new CartActions.CartAddEntrySuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_ADD_ENTRY_SUCCESS,
          payload,
          meta: StateEntityProcessesLoaderActions.entityProcessesDecrementMeta(
            MULTI_CART_DATA,
            'cartId'
          ),
        });
      });
    });
  });

  describe('RemoveCartEntry Actions', () => {
    describe('CartRemoveEntry', () => {
      it('should create the action', () => {
        const payload = { userId: userId, cartId: cartId, entry: entryNumber };
        const action = new CartActions.CartRemoveEntry(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_REMOVE_ENTRY,
          payload: payload,
          meta: StateEntityProcessesLoaderActions.entityProcessesIncrementMeta(
            MULTI_CART_DATA,
            cartId
          ),
        });
      });
    });

    describe('CartRemoveEntryFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const payload = { error, cartId, userId };
        const action = new CartActions.CartRemoveEntryFail(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_REMOVE_ENTRY_FAIL,
          payload,
          meta: StateEntityProcessesLoaderActions.entityProcessesDecrementMeta(
            MULTI_CART_DATA,
            cartId
          ),
        });
      });
    });

    describe('CartRemoveEntrySuccess', () => {
      it('should create the action', () => {
        const payload = {
          userId: 'userId',
          cartId: 'cartId',
        };
        const action = new CartActions.CartRemoveEntrySuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_REMOVE_ENTRY_SUCCESS,
          payload,
          meta: StateEntityProcessesLoaderActions.entityProcessesDecrementMeta(
            MULTI_CART_DATA,
            'cartId'
          ),
        });
      });
    });
  });

  describe('UpdateCartEntry Actions', () => {
    describe('CartUpdateEntry', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId,
          entry: productCode,
          qty: 1,
        };
        const action = new CartActions.CartUpdateEntry(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_UPDATE_ENTRY,
          payload: payload,
          meta: StateEntityProcessesLoaderActions.entityProcessesIncrementMeta(
            MULTI_CART_DATA,
            cartId
          ),
        });
      });
    });

    describe('CartUpdateEntryFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const payload = { error, cartId, userId };
        const action = new CartActions.CartUpdateEntryFail(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_UPDATE_ENTRY_FAIL,
          payload,
          meta: StateEntityProcessesLoaderActions.entityProcessesDecrementMeta(
            MULTI_CART_DATA,
            cartId
          ),
        });
      });
    });

    describe('CartUpdateEntrySuccess', () => {
      it('should create the action', () => {
        const payload = {
          cartId: 'cartId',
          userId: 'userId',
        };
        const action = new CartActions.CartUpdateEntrySuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_UPDATE_ENTRY_SUCCESS,
          payload,
          meta: StateEntityProcessesLoaderActions.entityProcessesDecrementMeta(
            MULTI_CART_DATA,
            'cartId'
          ),
        });
      });
    });
  });
});
