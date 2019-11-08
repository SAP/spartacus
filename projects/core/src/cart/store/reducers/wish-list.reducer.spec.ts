import { Cart } from '../../../model/cart.model';
import { CartActions } from '../actions/index';
import * as fromWishList from './wish-list.reducer';

const code = 'xxx';

const testCart: Cart = {
  code: code,
  name: 'name',
  description: 'description',
  savedBy: { name: 'user', uid: 'userId' },
};

describe('Wish List reducer', () => {
  describe('wishListReducer', () => {
    describe('CREATE_WISH_LIST_SUCCESS action', () => {
      it('should set wish list code', () => {
        const { initialState } = fromWishList;
        const payload = {
          cart: testCart,
          userId: 'userId',
        };
        const action = new CartActions.CreateWishListSuccess(payload);
        const state = fromWishList.wishListReducer(initialState, action);
        expect(state).toEqual(code);
      });
    });
    describe('LOAD_WISH_LIST_SUCCESS action', () => {
      it('should set wish list code', () => {
        const { initialState } = fromWishList;
        const payload = {
          cart: testCart,
          userId: 'userId',
        };
        const action = new CartActions.LoadWisthListSuccess(payload);
        const state = fromWishList.wishListReducer(initialState, action);
        expect(state).toEqual(code);
      });
    });
  });
});
