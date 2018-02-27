import * as fromCart from './cart.reducer';
import * as fromActions from './../actions';
import { Cart } from './../../models/cart-types.model';

fdescribe('Cart reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCart;
      const action = {} as any;
      const state = fromCart.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('CREATE_CART_SUCCESSS action', () => {
    it('should store a cart', () => {
      const testCart: Cart = {
        code: 'xxx',
        guid: 'xxx',
        total_items: 0,
        total_price: {
          currency_iso: 'USD',
          value: 0
        },
        total_price_with_tax: {
          currency_iso: 'USD',
          value: 0
        }
      };
      const { initialState } = fromCart;

      const action = new fromActions.CreateCartSuccess(testCart);
      const state = fromCart.reducer(initialState, action);

      expect(state.content).toEqual(testCart);
    });
  });

  describe('CREATE_CART_FAIL action', () => {
    it('should return an empty cart', () => {
      const { initialState } = fromCart;

      const failAction = new fromActions.CreateCartFail({ error: 'any' });
      const stateAfterFail = fromCart.reducer(initialState, failAction);
      expect(stateAfterFail.content).toEqual(<Cart>{});
    });
  });
});
