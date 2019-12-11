import { CartActions } from '../actions/index';
import * as fromMultiCart from './multi-cart.reducer';

describe('Multi Cart reducer', () => {
  describe('activeCartReducer', () => {
    describe('LOAD_MULTI_CART_SUCCESS action', () => {
      it('should set active cart id when extraData.active is truthy', () => {
        const { activeCartInitialState } = fromMultiCart;
        const payload = {
          extraData: {
            active: true,
          },
          cart: {
            code: 'cartCode',
          },
          userId: 'userId',
        };
        const action = new CartActions.LoadMultiCartSuccess(payload);
        const state = fromMultiCart.activeCartReducer(
          activeCartInitialState,
          action
        );
        expect(state).toEqual('cartCode');
      });

      it('should not change active cart id when it is not active cart load', () => {
        const { activeCartInitialState } = fromMultiCart;
        const payload = {
          extraData: {},
          cart: {
            code: 'cartCode',
          },
          userId: 'userId',
        };
        const action = new CartActions.LoadMultiCartSuccess(payload);
        const state = fromMultiCart.activeCartReducer(
          activeCartInitialState,
          action
        );
        expect(state).toEqual('');
      });
    });

    describe('CREATE_MULTI_CART_SUCCESS action', () => {
      it('should set active cart id when extraData.active is truthy', () => {
        const { activeCartInitialState } = fromMultiCart;
        const payload = {
          extraData: {
            active: true,
          },
          cart: {
            code: 'cartCode',
          },
          userId: 'userId',
        };
        const action = new CartActions.CreateMultiCartSuccess(payload);
        const state = fromMultiCart.activeCartReducer(
          activeCartInitialState,
          action
        );
        expect(state).toEqual('cartCode');
      });

      it('should not change active cart id when it is not active cart create', () => {
        const { activeCartInitialState } = fromMultiCart;
        const payload = {
          extraData: {},
          cart: {
            code: 'cartCode',
          },
          userId: 'userId',
        };
        const action = new CartActions.CreateMultiCartSuccess(payload);
        const state = fromMultiCart.activeCartReducer(
          activeCartInitialState,
          action
        );
        expect(state).toEqual('');
      });
    });

    describe('CREATE_MULTI_CART action', () => {
      it('should set active cart id when extraData.active is truthy', () => {
        const { activeCartInitialState } = fromMultiCart;
        const payload = {
          extraData: {
            active: true,
          },
          userId: 'userId',
        };
        const action = new CartActions.CreateMultiCart(payload);
        const state = fromMultiCart.activeCartReducer(
          activeCartInitialState,
          action
        );
        expect(state).toEqual('fresh');
      });

      it('should not change active cart id when it is not active cart create', () => {
        const { activeCartInitialState } = fromMultiCart;
        const payload = {
          extraData: {},
          userId: 'userId',
        };
        const action = new CartActions.CreateMultiCart(payload);
        const state = fromMultiCart.activeCartReducer(
          activeCartInitialState,
          action
        );
        expect(state).toEqual('');
      });
    });

    describe('MERGE_MULTI_CART_FAIL action', () => {
      it('should set active cart id when extraData.active is truthy', () => {
        const { activeCartInitialState } = fromMultiCart;
        const payload = {
          extraData: {
            active: true,
          },
          oldCartId: 'oldCartId',
        };
        const action = new CartActions.MergeMultiCartFail(payload);
        const state = fromMultiCart.activeCartReducer(
          activeCartInitialState,
          action
        );
        expect(state).toEqual('oldCartId');
      });

      it('should not change active cart id when it is not active cart create', () => {
        const { activeCartInitialState } = fromMultiCart;
        const payload = {
          extraData: {},
          oldCartId: 'oldCartId',
        };
        const action = new CartActions.MergeMultiCartFail(payload);
        const state = fromMultiCart.activeCartReducer(
          activeCartInitialState,
          action
        );
        expect(state).toEqual('');
      });
    });

    describe('REMOVE_CART action', () => {
      it('should clear active cart id, when active cart is removed', () => {
        const initialState = 'cartCode';
        const action = new CartActions.RemoveCart('cartCode');
        const state = fromMultiCart.activeCartReducer(initialState, action);
        expect(state).toEqual(fromMultiCart.activeCartInitialState);
      });

      it('should not change active cart id when non active cart is removed', () => {
        const initialState = 'otherCode';
        const action = new CartActions.RemoveCart('cartCode');
        const state = fromMultiCart.activeCartReducer(initialState, action);
        expect(state).toEqual('otherCode');
      });
    });

    describe('other actions', () => {
      it('should return the default state', () => {
        const initialState = 'otherCode';
        const action = { type: 'other' } as any;
        const state = fromMultiCart.activeCartReducer(initialState, action);
        expect(state).toEqual('otherCode');
      });
    });
  });

  describe('cartEntitiesReducer', () => {
    describe('LOAD_MULTI_CART_SUCCESS action', () => {
      it('should set cart in state', () => {
        const initialState = {};
        const cart = {
          code: 'cartCode',
        };
        const payload = {
          cart,
          userId: 'userId',
          extraData: {},
        };
        const action = new CartActions.LoadMultiCartSuccess(payload);
        const state = fromMultiCart.cartEntitiesReducer(initialState, action);
        expect(state).toEqual(payload.cart);
      });
    });

    describe('CREATE_MULTI_CART_SUCCESS action', () => {
      it('should set cart in state', () => {
        const initialState = {};
        const cart = {
          code: 'cartCode',
        };
        const payload = {
          cart,
          userId: 'userId',
          extraData: {},
        };
        const action = new CartActions.CreateMultiCartSuccess(payload);
        const state = fromMultiCart.cartEntitiesReducer(initialState, action);
        expect(state).toEqual(payload.cart);
      });
    });

    describe('SET_FRESH_CART action', () => {
      it('should set cart in state', () => {
        const initialState = {};
        const cart = {
          code: 'cartCode',
        };
        const action = new CartActions.SetFreshCart(cart);
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
});
