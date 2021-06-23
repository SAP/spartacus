import { Cart } from '../../../model/cart.model';
import { getCartIdByUserId } from '../../utils/utils';
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
  describe('activeCartReducer', () => {
    describe('LOAD_CART_SUCCESS action', () => {
      it('should set active cart id when extraData.active is truthy', () => {
        const { activeCartDefaultState } = fromMultiCart;
        const payload = {
          extraData: {
            active: true,
          },
          cart: {
            code: 'cartCode',
          },
          cartId: 'cartCode',
          userId: 'userId',
        };
        const action = new CartActions.LoadCartSuccess(payload);
        const state = fromMultiCart.activeCartReducer(
          activeCartDefaultState,
          action
        );
        expect(state).toEqual('cartCode');
      });

      it('should not change active cart id when it is not active cart load', () => {
        const { activeCartDefaultState } = fromMultiCart;
        const payload = {
          extraData: {},
          cart: {
            code: 'cartCode',
          },
          userId: 'userId',
          cartId: 'cartCode',
        };
        const action = new CartActions.LoadCartSuccess(payload);
        const state = fromMultiCart.activeCartReducer(
          activeCartDefaultState,
          action
        );
        expect(state).toEqual('');
      });
    });

    describe('CREATE_MULTI_CART_SUCCESS action', () => {
      it('should set active cart id when extraData.active is truthy', () => {
        const { activeCartDefaultState } = fromMultiCart;
        const payload = {
          extraData: {
            active: true,
          },
          cart: {
            code: 'cartCode',
          },
          userId: 'userId',
          cartId: 'cartCode',
          tempCartId: 'tempCartId',
        };
        const action = new CartActions.CreateCartSuccess(payload);
        const state = fromMultiCart.activeCartReducer(
          activeCartDefaultState,
          action
        );
        expect(state).toEqual('cartCode');
      });

      it('should not change active cart id when it is not active cart create', () => {
        const { activeCartDefaultState } = fromMultiCart;
        const payload = {
          cart: {
            code: 'cartCode',
          },
          userId: 'userId',
          cartId: 'cartCode',
          tempCartId: 'tempCartId',
        };
        const action = new CartActions.CreateCartSuccess(payload);
        const state = fromMultiCart.activeCartReducer(
          activeCartDefaultState,
          action
        );
        expect(state).toEqual('');
      });
    });

    describe('CREATE_MULTI_CART action', () => {
      it('should set active cart id when extraData.active is truthy', () => {
        const { activeCartDefaultState } = fromMultiCart;
        const payload = {
          extraData: {
            active: true,
          },
          userId: 'userId',
          tempCartId: 'temp-uuid',
        };
        const action = new CartActions.CreateCart(payload);
        const state = fromMultiCart.activeCartReducer(
          activeCartDefaultState,
          action
        );
        expect(state).toEqual('temp-uuid');
      });

      it('should not change active cart id when it is not active cart create', () => {
        const { activeCartDefaultState } = fromMultiCart;
        const payload = {
          userId: 'userId',
          tempCartId: 'temp-uuid',
        };
        const action = new CartActions.CreateCart(payload);
        const state = fromMultiCart.activeCartReducer(
          activeCartDefaultState,
          action
        );
        expect(state).toEqual('');
      });
    });

    describe('REMOVE_CART action', () => {
      it('should clear active cart id, when active cart is removed', () => {
        const initialState = 'cartCode';
        const action = new CartActions.RemoveCart({ cartId: 'cartCode' });
        const state = fromMultiCart.activeCartReducer(initialState, action);
        expect(state).toEqual(fromMultiCart.activeCartDefaultState);
      });

      it('should not change active cart id when non active cart is removed', () => {
        const initialState = 'otherCode';
        const action = new CartActions.RemoveCart({ cartId: 'cartCode' });
        const state = fromMultiCart.activeCartReducer(initialState, action);
        expect(state).toEqual('otherCode');
      });
    });

    describe('DELETE_CART_SUCCESS action', () => {
      it('should clear active cart id, when active cart is removed', () => {
        const initialState = 'cartCode';
        const action = new CartActions.DeleteCartSuccess({
          cartId: 'cartCode',
          userId: 'userId',
        });
        const state = fromMultiCart.activeCartReducer(initialState, action);
        expect(state).toEqual(fromMultiCart.activeCartDefaultState);
      });

      it('should not change active cart id when non active cart is removed', () => {
        const initialState = 'otherCode';
        const action = new CartActions.DeleteCartSuccess({
          cartId: 'cartCode',
          userId: 'userId',
        });
        const state = fromMultiCart.activeCartReducer(initialState, action);
        expect(state).toEqual('otherCode');
      });
    });

    describe('SET_ACTIVE_CART_ID action', () => {
      it('should set active cart id', () => {
        const initialState = 'cartCode';
        const action = new CartActions.SetActiveCartId('cartId');
        const state = fromMultiCart.activeCartReducer(initialState, action);
        expect(state).toEqual('cartId');
      });
    });

    describe('CLEAR_MULTI_CART_STATE action', () => {
      it('should clear active cart id', () => {
        const initialState = 'cartCode';
        const action = new CartActions.ClearCartState();
        const state = fromMultiCart.activeCartReducer(initialState, action);
        expect(state).toEqual(fromMultiCart.activeCartDefaultState);
      });

      it('should not change value if cart is still not initialized -> id === null', () => {
        const action = new CartActions.ClearCartState();
        const state = fromMultiCart.activeCartReducer(
          fromMultiCart.activeCartInitialState,
          action
        );
        expect(state).toEqual(fromMultiCart.activeCartInitialState);
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

    describe('CREATE_MULTI_CART_SUCCESS action', () => {
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

    describe('SET_TEMP_CART action', () => {
      it('should set cart in state', () => {
        const initialState = {};
        const cart = {
          code: 'cartCode',
        };
        const action = new CartActions.SetTempCart({
          cart,
          tempCartId: 'tempCartId',
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

  describe('wishListReducer', () => {
    describe('CREATE_WISH_LIST_SUCCESS action', () => {
      it('should set wish list code', () => {
        const { wishListInitialState } = fromMultiCart;
        const payload = {
          cart: testCart,
          userId: 'userId',
        };
        const action = new CartActions.CreateWishListSuccess(payload);
        const state = fromMultiCart.wishListReducer(
          wishListInitialState,
          action
        );
        expect(state).toEqual(code);
      });
    });
    describe('LOAD_WISH_LIST_SUCCESS action', () => {
      it('should set wish list code', () => {
        const { wishListInitialState } = fromMultiCart;
        const payload = {
          cart: testCart,
          userId: 'userId',
          cartId: getCartIdByUserId(testCart, 'userId'),
        };
        const action = new CartActions.LoadWishListSuccess(payload);
        const state = fromMultiCart.wishListReducer(
          wishListInitialState,
          action
        );
        expect(state).toEqual(code);
      });
    });
    describe('CLEAR_MULTI_CART_STATE action', () => {
      it('should clear wishlist id', () => {
        const initialState = 'wishlistId';
        const action = new CartActions.ClearCartState();
        const state = fromMultiCart.wishListReducer(initialState, action);
        expect(state).toEqual(fromMultiCart.wishListInitialState);
      });
    });
  });
});
