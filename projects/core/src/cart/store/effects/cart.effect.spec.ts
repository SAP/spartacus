import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { AUTH_FEATURE } from '../../../auth/store/auth-state';
import * as fromAuthReducers from '../../../auth/store/reducers/index';
import { Cart } from '../../../model/cart.model';
import { OccConfig } from '../../../occ/config/occ-config';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import * as fromUserReducers from '../../../user/store/reducers/index';
import { USER_FEATURE } from '../../../user/store/user-state';
import { CartConnector } from '../../connectors/cart/cart.connector';
import { CartDataService } from '../../facade/cart-data.service';
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

describe('Cart effect', () => {
  let cartEffects: fromEffects.CartEffects;
  let actions$: Observable<any>;
  let loadMock: jasmine.Spy;

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
    loadMock = createSpy().and.returnValue(of(testCart));

    class MockCartConnector {
      create = createSpy().and.returnValue(of(testCart));
      load = loadMock;
      addEmail = createSpy().and.returnValue(of({}));
      delete = createSpy().and.returnValue(of({}));
    }

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
        CartDataService,
        provideMockActions(() => actions$),
      ],
    });

    cartEffects = TestBed.get(fromEffects.CartEffects as Type<
      fromEffects.CartEffects
    >);
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

    it('should clear cart on "Cart not found" error', () => {
      const action = new CartActions.LoadCart({
        userId,
        cartId,
      });
      loadMock.and.returnValue(
        throwError({
          error: {
            errors: [{ reason: 'notFound' }],
          },
        })
      );
      const completion = new CartActions.ClearCart();
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(cartEffects.loadCart$).toBeObservable(expected);
    });
  });

  describe('createCart$', () => {
    it('should create a cart', () => {
      const action = new CartActions.CreateCart({ userId });
      const completion = new CartActions.CreateCartSuccess(testCart);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.createCart$).toBeObservable(expected);
    });

    it('should create and merge cart when oldCartId is provided', () => {
      const action = new CartActions.CreateCart({
        userId,
        oldCartId: 'testOldCartId',
      });

      const createCartCompletion = new CartActions.CreateCartSuccess(testCart);
      const mergeCartCompletion = new CartActions.MergeCartSuccess({
        userId,
        cartId: testCart.code,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: createCartCompletion,
        c: mergeCartCompletion,
      });

      expect(cartEffects.createCart$).toBeObservable(expected);
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

  describe('refresh$', () => {
    const cartChangesSuccessActions = [
      'MergeCartSuccess',
      'CartAddEntrySuccess',
      'CartUpdateEntrySuccess',
      'CartRemoveEntrySuccess',
    ];

    cartChangesSuccessActions.forEach(actionName => {
      it(`should refresh cart on ${actionName}`, () => {
        const action = new CartActions[actionName]({
          userId: userId,
          cartId: cartId,
        });
        const completion = new CartActions.LoadCart({
          userId: userId,
          cartId: cartId,
        });

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });

        expect(cartEffects.refresh$).toBeObservable(expected);
      });
    });
  });

  describe('resetCartDetailsOnSiteContextChange$', () => {
    const siteContextChangeActions = ['LanguageChange', 'CurrencyChange'];

    siteContextChangeActions.forEach(actionName => {
      it(`should reset cart details on ${actionName}`, () => {
        const action = new SiteContextActions[actionName]();
        const completion = new CartActions.ResetCartDetails();

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });

        expect(cartEffects.resetCartDetailsOnSiteContextChange$).toBeObservable(
          expected
        );
      });
    });
  });

  describe('addEmail$', () => {
    it('should add email to cart', () => {
      const action = new CartActions.AddEmailToCart({
        userId: userId,
        cartId: cartId,
        email: 'test@test.com',
      });
      const completion = new CartActions.AddEmailToCartSuccess({
        userId,
        cartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.addEmail$).toBeObservable(expected);
    });
  });

  describe('deleteCart$', () => {
    it('should delete cart', () => {
      const action = new CartActions.DeleteCart({ userId, cartId });
      const completion = new CartActions.ClearCart();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.deleteCart$).toBeObservable(expected);
    });
  });
});
