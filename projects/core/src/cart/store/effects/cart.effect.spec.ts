import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { AUTH_FEATURE } from '../../../auth/store/auth-state';
import * as fromAuthReducers from '../../../auth/store/reducers/index';
import { Cart } from '../../../model/cart.model';
import { OccConfig } from '../../../occ/config/occ-config';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import * as fromUserReducers from '../../../user/store/reducers/index';
import { USER_FEATURE } from '../../../user/store/user-state';
import { CartConnector } from '../../connectors/cart/cart.connector';
import { CartDataService } from '../../facade/cart-data.service';
import { CartService } from '../../facade/cart.service';
import * as fromCartReducers from '../../store/reducers/index';
import { CartActions } from '../actions/index';
import { CART_FEATURE } from '../cart-state';
import * as fromEffects from './cart.effect';
import createSpy = jasmine.createSpy;

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

class MockCartConnector {
  create = createSpy().and.returnValue(of(testCart));
  load = createSpy().and.returnValue(of(testCart));
}

describe('Cart effect', () => {
  let cartEffects: fromEffects.CartEffects;
  let actions$: Observable<any>;

  const MockOccModuleConfig: OccConfig = {
    backend: {
      occ: {
        baseUrl: '',
        prefix: '',
      },
    },
  };

  const userId = 'testUserId';
  const cartId = 'testCartId';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(CART_FEATURE, fromCartReducers.getReducers()),
        StoreModule.forFeature(USER_FEATURE, fromUserReducers.getReducers()),
        StoreModule.forFeature(AUTH_FEATURE, fromAuthReducers.getReducers()),
      ],

      providers: [
        {
          provide: CartConnector,
          useClass: MockCartConnector,
        },
        fromEffects.CartEffects,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        CartService,
        CartDataService,
        provideMockActions(() => actions$),
      ],
    });

    cartEffects = TestBed.get(fromEffects.CartEffects);
  });

  describe('createCart$', () => {
    it('should create a cart', () => {
      const action = new CartActions.CreateCart(userId);
      const completion = new CartActions.CreateCartSuccess(testCart);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.createCart$).toBeObservable(expected);
    });
  });

  describe('loadCart$', () => {
    it('should load a cart', () => {
      const action = new CartActions.LoadCart({
        userId: userId,
        cartId: cartId,
      });
      const completion = new CartActions.LoadCartSuccess(testCart);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.loadCart$).toBeObservable(expected);
    });
  });

  describe('mergeCart$', () => {
    it('should merge old cart into the session cart', () => {
      const action = new CartActions.MergeCart({
        userId: userId,
        cartId: cartId,
      });
      const completion = new CartActions.CreateCart({
        userId: userId,
        oldCartId: cartId,
        toMergeCartGuid: 'testGuid',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.mergeCart$).toBeObservable(expected);
    });
  });

  describe('resetCartDetailsOnSiteContextChange$', () => {
    it('should reset cart details', () => {
      const action = new SiteContextActions.LanguageChange();
      const completion = new CartActions.ResetCartDetails();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.resetCartDetailsOnSiteContextChange$).toBeObservable(
        expected
      );
    });
  });
});
