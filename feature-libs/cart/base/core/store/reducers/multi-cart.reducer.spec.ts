import { Cart, CartType } from '@spartacus/cart/base/root';
import { CartActions } from '../actions/index';
import * as fromMultiCart from './multi-cart.reducer';

const code = 'xxx';

const testCart: Cart = {
  code: code,
  name: 'name',
  description: 'description',
  savedBy: { name: 'user', uid: 'userId' },
};

describe('Multi Cart reducer', () => {
  describe('cartEntitiesReducer', () => {
    describe('LOAD_CART_SUCCESS action', () => {
      it('should set cart in state', () => {
        const initialState = {};
        const cart = {
          code: 'cartCode',
        };
        const payload = {
          cart,
          userId: 'userId',
          extraData: {},
          cartId: cart.code,
        };
        const action = new CartActions.LoadCartSuccess(payload);
        const state = fromMultiCart.cartEntitiesReducer(initialState, action);
        expect(state).toEqual(payload.cart);
      });
    });

    describe('LOAD_CARTS_SUCCESS action', () => {
      it('should set cart in state', () => {
        const initialState = fromMultiCart.cartEntitiesInitialState;
        const payload = [testCart];
        const action = new CartActions.LoadCartsSuccess(payload);
        const state = fromMultiCart.cartEntitiesReducer(initialState, action);
        expect(state).toEqual(payload as unknown as Cart);
      });
    });

    describe('CREATE_CART_SUCCESS action', () => {
      it('should set cart in state', () => {
        const initialState = {};
        const cart = {
          code: 'cartCode',
        };
        const payload = {
          cart,
          userId: 'userId',
          cartId: 'cartCode',
          tempCartId: 'tempCartId',
        };
        const action = new CartActions.CreateCartSuccess(payload);
        const state = fromMultiCart.cartEntitiesReducer(initialState, action);
        expect(state).toEqual(payload.cart);
      });
    });

    describe('SET_CART_DATA action', () => {
      it('should set cart in state', () => {
        const initialState = {};
        const cart = {
          code: 'cartCode',
        };
        const action = new CartActions.SetCartData({
          cart,
          cartId: 'cartCode',
        });
        const state = fromMultiCart.cartEntitiesReducer(initialState, action);
        expect(state).toEqual(cart);
      });
    });

    describe('other actions', () => {
      it('should return the default state', () => {
        const previousState = { code: 'otherCode' };
        const action = { type: 'other', payload: { code: 'code' } } as any;
        const state = fromMultiCart.cartEntitiesReducer(previousState, action);
        expect(state).toEqual(previousState);
      });
    });
  });

  describe('cartTypeIndexReducer', () => {
    describe('SET_CART_TYPE_INDEX action', () => {
      it('should set cart type index in state', () => {
        const initialState = {};
        const action = new CartActions.SetCartTypeIndex({
          cartType: CartType.ACTIVE,
          cartId: 'testCartId',
        });
        const state = fromMultiCart.cartTypeIndexReducer(initialState, action);
        expect(state).toEqual({ Active: 'testCartId' });
      });
    });

    describe('REMOVE_CART action', () => {
      it('should not clear index if cartId is not the same as the existing index in state', () => {
        const initialState = { Active: 'initialActiveCartId' };
        const action = new CartActions.RemoveCart({
          cartId: 'testCartId',
        });
        const state = fromMultiCart.cartTypeIndexReducer(initialState, action);
        expect(state).toEqual({ Active: 'initialActiveCartId' });
      });

      it('should clear index in state', () => {
        const initialState = { Active: 'testCartId' };
        const action = new CartActions.RemoveCart({
          cartId: 'testCartId',
        });
        const state = fromMultiCart.cartTypeIndexReducer(initialState, action);
        expect(state).toEqual({ Active: '' });
      });
    });

    describe('DELETE_CART_SUCCESS action', () => {
      it('should not clear index if cartId is not the same as the existing index in state', () => {
        const initialState = { Active: 'initialActiveCartId' };
        const action = new CartActions.DeleteCartSuccess({
          userId: 'testUserId',
          cartId: 'testCartId',
        });
        const state = fromMultiCart.cartTypeIndexReducer(initialState, action);
        expect(state).toEqual({ Active: 'initialActiveCartId' });
      });

      it('should clear index in state', () => {
        const initialState = { Active: 'testCartId' };
        const action = new CartActions.DeleteCartSuccess({
          userId: 'testUserId',
          cartId: 'testCartId',
        });
        const state = fromMultiCart.cartTypeIndexReducer(initialState, action);
        expect(state).toEqual({ Active: '' });
      });
    });

    describe('CLEAR_CART_STATE action', () => {
      it('should clear cart type index in state', () => {
        const initialState = { Active: '1234', Selective: '123456' };
        const action = new CartActions.ClearCartState();
        const state = fromMultiCart.cartTypeIndexReducer(initialState, action);
        expect(state).toEqual(fromMultiCart.cartTypeIndexInitialState);
      });
    });

    describe('other actions', () => {
      it('should return the default state', () => {
        const previousState = { Active: 'testCartId' };
        const action = { type: 'other' } as any;
        const state = fromMultiCart.cartTypeIndexReducer(previousState, action);
        expect(state).toEqual(previousState);
      });
    });
  });
});
