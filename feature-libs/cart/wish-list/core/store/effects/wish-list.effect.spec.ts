import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  CartActions,
  CartConnector,
  getCartIdByUserId,
  MULTI_CART_FEATURE,
  StateWithMultiCart,
} from '@spartacus/cart/base/core';
import { Cart, CartType } from '@spartacus/cart/base/root';
import { SiteContextActions, UserIdService } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { EMPTY, Observable, of } from 'rxjs';
import { getMultiCartReducers } from '../../../../base/core/store';
import { getWishlistName } from '../../utils/utils';
import { WishListActions } from '../actions';
import * as fromEffects from './wish-list.effect';
import { WishListEffects } from './wish-list.effect';

import createSpy = jasmine.createSpy;

const userId = 'testUserId';
const cartName = 'name';
const cartDescription = 'description';
const wishListId = 'xxxx';
const customerId = '1234-5678-abcdef';

const testCart: Cart = {
  code: 'xxx',
  guid: 'testGuid',
  totalItems: 0,
  totalPrice: {
    currencyIso: 'USD',
    value: 0,
  },
  totalPriceWithTax: {
    currencyIso: 'USD',
    value: 0,
  },
};

const wishList: Cart = {
  code: wishListId,
  name: getWishlistName(customerId),
};

const savedCart: Cart = {
  ...testCart,
  name: cartName,
  description: cartDescription,
  savedBy: { name: 'user', uid: userId },
};

class MockCartConnector {
  create = createSpy().and.returnValue(of(testCart));
  load = createSpy().and.returnValue(of(wishList));
  loadAll(): Observable<Cart[]> {
    return EMPTY;
  }
  save = createSpy().and.returnValue(of(savedCart));
}

class MockUserIdService implements Partial<UserIdService> {
  getUserId = createSpy().and.returnValue(of(userId));
}

describe('Wish List Effect', () => {
  let actions$: Observable<any>;
  let wishListEffect: WishListEffects;
  let cartConnector: CartConnector;
  let store: Store<StateWithMultiCart>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(MULTI_CART_FEATURE, getMultiCartReducers()),
      ],
      providers: [
        { provide: CartConnector, useClass: MockCartConnector },
        { provide: UserIdService, useClass: MockUserIdService },
        fromEffects.WishListEffects,
        provideMockActions(() => actions$),
      ],
    });

    wishListEffect = TestBed.inject(WishListEffects);
    cartConnector = TestBed.inject(CartConnector);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('createWishList$', () => {
    it('should create new cart and save it', () => {
      const action = new WishListActions.CreateWishList({
        userId,
        name: cartName,
        description: cartDescription,
      });

      const createWishListCompletion =
        new WishListActions.CreateWishListSuccess({
          cart: savedCart,
          cartId: 'xxx',
        });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: createWishListCompletion });

      expect(wishListEffect.createWishList$).toBeObservable(expected);
    });
  });

  describe('loadWishList$', () => {
    it('should create wish list if it does NOT exist', () => {
      spyOn(cartConnector, 'loadAll').and.returnValue(of([testCart]));

      const payload = {
        userId,
        cartId: getWishlistName(customerId),
      };
      const action = new WishListActions.LoadWishList(payload);

      const createWishListAction = new WishListActions.CreateWishList({
        userId,
        name: getWishlistName(customerId),
      });

      const removeCartAction = new CartActions.RemoveCart({
        cartId: getWishlistName(customerId),
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: createWishListAction,
        c: removeCartAction,
      });

      expect(wishListEffect.loadWishList$).toBeObservable(expected);
    });

    it('should dispatch load wish list success if it exists', () => {
      spyOn(cartConnector, 'loadAll').and.returnValue(of([testCart, wishList]));

      const payload = {
        userId,
        cartId: getWishlistName(customerId),
      };
      const action = new WishListActions.LoadWishList(payload);

      const loadWishListSuccessAction = new WishListActions.LoadWishListSuccess(
        {
          cart: wishList,
          cartId: getCartIdByUserId(wishList, userId),
        }
      );

      const removeCartAction = new CartActions.RemoveCart({
        cartId: getWishlistName(customerId),
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: loadWishListSuccessAction,
        c: removeCartAction,
      });

      expect(wishListEffect.loadWishList$).toBeObservable(expected);
    });
  });

  describe('resetWishList$', () => {
    it('should load wish list from id', () => {
      store.dispatch(
        new CartActions.SetCartTypeIndex({
          cartType: CartType.WISH_LIST,
          cartId: getCartIdByUserId(wishList, userId),
        })
      );

      const action = new SiteContextActions.CurrencyChange({
        previous: 'previous',
        current: 'current',
      });

      const resetWishListAction = new WishListActions.LoadWishListSuccess({
        cart: wishList,
        cartId: getCartIdByUserId(wishList, userId),
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: resetWishListAction });

      expect(wishListEffect.resetWishList$).toBeObservable(expected);
    });
  });

  describe('setWishListId$', () => {
    it('when CreateWishListSuccess, should set wishlist id to state', () => {
      const action = new WishListActions.CreateWishListSuccess({
        cart: wishList,
        cartId: wishList.code as string,
      });

      const setWishListIdAction = new CartActions.SetCartTypeIndex({
        cartType: CartType.WISH_LIST,
        cartId: wishList.code as string,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: setWishListIdAction });

      expect(wishListEffect.setWishListId$).toBeObservable(expected);
    });

    it('when LoadWishListSuccess, should set wishlist id to state', () => {
      const action = new WishListActions.LoadWishListSuccess({
        cart: wishList,
        cartId: wishList.code as string,
      });

      const setWishListIdAction = new CartActions.SetCartTypeIndex({
        cartType: CartType.WISH_LIST,
        cartId: wishList.code as string,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: setWishListIdAction });

      expect(wishListEffect.setWishListId$).toBeObservable(expected);
    });
  });

  describe('setWishListData$', () => {
    it('when CreateWishListSuccess, should set wishlist data to state', () => {
      const action = new WishListActions.CreateWishListSuccess({
        cart: wishList,
        cartId: 'testCartId',
      });

      const setWishListDataAction = new CartActions.SetCartData({
        cart: wishList,
        cartId: 'testCartId',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: setWishListDataAction });

      expect(wishListEffect.setWishListData$).toBeObservable(expected);
    });

    it('when LoadWishListSuccess, should set wishlist data to state', () => {
      const action = new WishListActions.LoadWishListSuccess({
        cart: wishList,
        cartId: 'testCartId',
      });

      const setWishListDataAction = new CartActions.SetCartData({
        cart: wishList,
        cartId: 'testCartId',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: setWishListDataAction });

      expect(wishListEffect.setWishListData$).toBeObservable(expected);
    });
  });
});
