/*import * as fromCartToken from './../actions/cart.action';
import { Cart } from '../../models/cart-types.model';

fdescribe('Cart Actions', () => {
  describe('CreateCart Action', () => {
    it('should create the action', () => {
      const userId = 'xxx@xxx.xxx';
      const action = new fromCartToken.CreateCart(userId);
      expect({ ...action }).toEqual({
        type: fromCartToken.CREATE_CART,
        payload: userId
      });
    });
  });

  describe('CreateCartFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromCartToken.CreateCartFail(error);

      expect({ ...action }).toEqual({
        type: fromCartToken.CREATE_CART_FAIL,
        payload: error
      });
    });
  });

  describe('CreateCartSuccess Action', () => {
    it('should create the action', () => {
      const cart: Cart = {
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
      const action = new fromCartToken.CreateCartSuccess(cart);

      expect({ ...action }).toEqual({
        type: fromCartToken.CREATE_CART_SUCCESSS,
        payload: cart
      });
    });
  });

  describe('LoadCart Action', () => {
    it('should create the action', () => {});
  });

  describe('LoadCartFail Action', () => {
    it('should create the action', () => {});
  });

  describe('LoadCartSuccess Action', () => {
    it('should create the action', () => {});
  });
});*/
