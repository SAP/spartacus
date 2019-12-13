import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../../auth/facade/auth.service';
import * as fromReducers from '../../../cart/store/reducers/index';
import { Cart, SaveCartResult } from '../../../model/cart.model';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { CartConnector } from '../../connectors';
import { SaveCartConnector } from '../../connectors/save-cart';
import { CartActions } from '../actions';
import { StateWithMultiCart } from '../multi-cart-state';
import * as fromEffects from './wish-list.effect';
import { WishListEffects } from './wish-list.effect';
import createSpy = jasmine.createSpy;

const userId = 'testUserId';
const cartName = 'name';
const cartDescription = 'description';
const wishListId = 'xxxx';

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
  name: 'wishlist',
};

const saveCartResult: SaveCartResult = {
  savedCartData: {
    ...testCart,
    name: cartName,
    description: cartDescription,
    savedBy: { name: 'user', uid: userId },
  },
};

class MockCartConnector {
  create = createSpy().and.returnValue(of(testCart));
  load = createSpy().and.returnValue(of(wishList));
  loadAll(): Observable<Cart[]> {
    return of();
  }
}

class MockSaveCartConnector {
  saveCart = createSpy().and.returnValue(of(saveCartResult));
}

class MockAuthService {
  getOccUserId = createSpy().and.returnValue(of(userId));
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
        StoreModule.forFeature(
          'multi-cart',
          fromReducers.getMultiCartReducers()
        ),
      ],
      providers: [
        { provide: CartConnector, useClass: MockCartConnector },
        { provide: SaveCartConnector, useClass: MockSaveCartConnector },
        { provide: AuthService, useClass: MockAuthService },
        fromEffects.WishListEffects,
        provideMockActions(() => actions$),
      ],
    });

    wishListEffect = TestBed.get(fromEffects.WishListEffects);
    cartConnector = TestBed.get(CartConnector as Type<CartConnector>);
    store = TestBed.get(Store as Type<Store<StateWithMultiCart>>);

    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('createWishList$', () => {
    it('should create new cart and save it', () => {
      const action = new CartActions.CreateWishList({
        userId,
        name: cartName,
        description: cartDescription,
      });

      const createWishListCompletion = new CartActions.CreateWishListSuccess({
        cart: saveCartResult.savedCartData,
        userId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: createWishListCompletion });

      expect(wishListEffect.createWishList$).toBeObservable(expected);
    });
  });

  describe('loadWishList$', () => {
    it('should create wish list if it does NOT exist', () => {
      spyOn(cartConnector, 'loadAll').and.returnValue(of([testCart]));

      const action = new CartActions.LoadWisthList(userId);

      const createWishListAction = new CartActions.CreateWishList({
        userId,
        name: 'wishlist',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: createWishListAction });

      expect(wishListEffect.loadWishList$).toBeObservable(expected);
    });
    it('should dispatch load wish list success if it exists', () => {
      spyOn(cartConnector, 'loadAll').and.returnValue(of([testCart, wishList]));

      const action = new CartActions.LoadWisthList(userId);

      const loadWishListSuccessAction = new CartActions.LoadWisthListSuccess({
        cart: wishList,
        userId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: loadWishListSuccessAction });

      expect(wishListEffect.loadWishList$).toBeObservable(expected);
    });
  });

  describe('resetWishList$', () => {
    it('should load wish list from id', () => {
      store.dispatch(
        new CartActions.LoadWisthListSuccess({ cart: testCart, userId })
      );

      const action = new SiteContextActions.CurrencyChange();

      const resetWishListAction = new CartActions.LoadWisthListSuccess({
        cart: wishList,
        userId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: resetWishListAction });

      expect(wishListEffect.resetWishList$).toBeObservable(expected);
    });
  });
});
