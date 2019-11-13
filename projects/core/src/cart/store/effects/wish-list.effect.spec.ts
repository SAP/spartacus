import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { Cart, SaveCartResult } from '../../../model/cart.model';
import { CartConnector } from '../../connectors';
import { SaveCartConnector } from '../../connectors/save-cart';
import { CartActions } from '../actions';
import * as fromEffects from './wish-list.effect';
import { WishListEffects } from './wish-list.effect';
import createSpy = jasmine.createSpy;

const userId = 'testUserId';
const cartName = 'name';
const cartDescription = 'description';

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
}

class MockSaveCartConnector {
  saveCart = createSpy().and.returnValue(of(saveCartResult));
}

describe('Wish List Effect', () => {
  let actions$: Observable<any>;
  let wishListEffect: WishListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: CartConnector, useClass: MockCartConnector },
        { provide: SaveCartConnector, useClass: MockSaveCartConnector },
        fromEffects.WishListEffects,
        provideMockActions(() => actions$),
      ],
    });

    wishListEffect = TestBed.get(fromEffects.WishListEffects);
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
});
