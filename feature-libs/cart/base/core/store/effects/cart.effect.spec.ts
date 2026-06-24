import {
  HttpErrorResponse,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Cart, CartType } from '@spartacus/cart/base/root';
import {
  CLIENT_AUTH_FEATURE,
  LoggerService,
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_CURRENT,
  OccConfig,
  SiteContextActions,
  USER_FEATURE,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import * as fromClientAuthReducers from 'core-libs/core/src/auth/client-auth/store/reducers/index';
import * as fromUserReducers from 'core-libs/core/src/user/store/reducers/index';
import { Observable, of, throwError } from 'rxjs';
import { CartConnector } from '../../connectors/cart/cart.connector';
import * as fromCartReducers from '../../store/reducers/index';
import { CartActions } from '../actions/index';
import { MULTI_CART_FEATURE, StateWithMultiCart } from '../multi-cart-state';
import * as fromEffects from './cart.effect';
import { provideMockFeatureToggles } from '@spartacus/core/src/features-config/feature-toggles/testing';
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

const tempCartId = 'tempCartId';

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

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
  let store: Store<StateWithMultiCart>;
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
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromUserReducers.getReducers()),
        StoreModule.forFeature(
          CLIENT_AUTH_FEATURE,
          fromClientAuthReducers.getReducers()
        ),
        StoreModule.forFeature(
          MULTI_CART_FEATURE,
          fromCartReducers.getMultiCartReducers()
        ),
      ],
      providers: [
        {
          provide: CartConnector,
          useClass: MockCartConnector,
        },
        fromEffects.CartEffects,
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: OccConfig, useValue: MockOccModuleConfig },
        provideMockActions(() => actions$),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideMockFeatureToggles({ enableCartReloadOnContextChange: true }),
      ],
    });

    cartEffects = TestBed.inject(fromEffects.CartEffects);
    store = TestBed.inject(Store);
  });

  describe('loadCart$', () => {
    it('should load a cart', () => {
      const action = new CartActions.LoadCart({
        userId: userId,
        cartId: cartId,
      });
      const loadCartCompletion = new CartActions.LoadCartSuccess({
        cart: testCart,
        userId,
        cartId: testCart.code,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: loadCartCompletion,
      });

      expect(cartEffects.loadCart$).toBeObservable(expected);
    });

    it('should remove current cart for current load', () => {
      const action = new CartActions.LoadCart({
        userId,
        cartId: 'current',
      });
      const loadCartCompletion = new CartActions.LoadCartSuccess({
        cart: testCart,
        userId,
        cartId: testCart.code,
      });
      const removeCartCompletion = new CartActions.RemoveCart({
        cartId: OCC_CART_ID_CURRENT,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: loadCartCompletion,
        c: removeCartCompletion,
      });

      expect(cartEffects.loadCart$).toBeObservable(expected);
    });

    it('return fail actions on empty cart', () => {
      const action = new CartActions.LoadCart({
        userId,
        cartId,
      });
      loadMock.and.returnValue(of(null));
      const loadCartFailCompletion = new CartActions.LoadCartFail({
        userId,
        cartId,
        error: {},
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: loadCartFailCompletion,
      });

      expect(cartEffects.loadCart$).toBeObservable(expected);
    });

    it('should clear active cart on "Cart not found" error', () => {
      const action = new CartActions.LoadCart({
        userId,
        cartId,
        extraData: { active: true },
      });
      loadMock.and.returnValue(
        throwError(() => ({
          error: {
            errors: [
              { reason: 'notFound', subjectType: 'cart', subject: '123456' },
            ],
          },
        }))
      );
      const removeCartCompletion = new CartActions.RemoveCart({ cartId });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: removeCartCompletion,
      });
      expect(cartEffects.loadCart$).toBeObservable(expected);
    });

    it('should not clear selective cart on "Cart not found" error', () => {
      const payload = {
        userId,
        cartId,
        extraData: { active: true },
      };
      const httpError = new HttpErrorResponse({
        error: {
          errors: [
            {
              reason: 'notFound',
              subjectType: 'cart',
              subject: 'selectivecart-electronicsspa-123456',
            },
          ],
        },
      });
      const action = new CartActions.LoadCart(payload);
      loadMock.and.returnValue(throwError(() => httpError));
      const removeCartCompletion = new CartActions.LoadCartFail({
        ...payload,
        error: tryNormalizeHttpError(httpError, new MockLoggerService()),
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: removeCartCompletion,
      });
      expect(cartEffects.loadCart$).toBeObservable(expected);
    });
  });

  describe('createCart$', () => {
    it('should create a cart', () => {
      const action = new CartActions.CreateCart({
        userId,
        tempCartId,
      });
      const createCartSuccessCompletion = new CartActions.CreateCartSuccess({
        cart: testCart,
        userId,
        tempCartId,
        cartId: testCart.code,
      });
      const removeCart = new CartActions.RemoveCart({
        cartId: tempCartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: createCartSuccessCompletion,
        c: removeCart,
      });

      expect(cartEffects.createCart$).toBeObservable(expected);
    });

    it('should create and merge cart when oldCartId is provided', () => {
      const action = new CartActions.CreateCart({
        userId,
        oldCartId: 'testOldCartId',
        tempCartId,
      });

      const createCartCompletion = new CartActions.CreateCartSuccess({
        cart: testCart,
        userId,
        tempCartId,
        cartId: testCart.code,
        oldCartId: 'testOldCartId',
      });
      const removeCompletion = new CartActions.RemoveCart({
        cartId: tempCartId,
      });
      const mergeCartCompletion = new CartActions.MergeCartSuccess({
        userId,
        cartId: testCart.code,
        oldCartId: 'testOldCartId',
        tempCartId: 'tempCartId',
        extraData: undefined,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: createCartCompletion,
        c: removeCompletion,
        d: mergeCartCompletion,
      });

      expect(cartEffects.createCart$).toBeObservable(expected);
    });
  });

  describe('mergeCart$', () => {
    it('should merge old cart into the session cart', () => {
      const action = new CartActions.MergeCartAndIncrementProcessesCount({
        userId: userId,
        cartId: cartId,
        tempCartId: 'temp-uuid',
      });
      const completion = new CartActions.CreateCart({
        userId: userId,
        oldCartId: cartId,
        toMergeCartGuid: 'testGuid',
        tempCartId: 'temp-uuid',
        extraData: undefined,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.mergeCart$).toBeObservable(expected);
    });

    it('should abort merge if merged old cart is the same as session cart and apply newly fetched data', () => {
      const action = new CartActions.MergeCartAndIncrementProcessesCount({
        userId: userId,
        cartId: 'xxx',
        tempCartId: 'temp-uuid',
        extraData: { active: true },
      });
      actions$ = hot('-a', { a: action });

      const expected = cold('-(bc)', {
        b: new CartActions.CreateCartSuccess({
          cart: testCart,
          userId: userId,
          tempCartId: 'temp-uuid',
          cartId: 'xxx',
          extraData: { active: true },
        }),
        c: new CartActions.MergeCartAbort({
          cartId: 'xxx',
        }),
      });

      expect(cartEffects.mergeCart$).toBeObservable(expected);
    });

    it('should abort merge and remove cart on load error', () => {
      const action = new CartActions.MergeCartAndIncrementProcessesCount({
        userId: userId,
        cartId: cartId,
        tempCartId: 'temp-uuid',
      });
      const error = new Error('Merge failed');
      loadMock.and.returnValue(throwError(() => error));

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: new CartActions.MergeCartAbort({
          cartId: cartId,
          error: tryNormalizeHttpError(error, new MockLoggerService()),
        }),
        c: new CartActions.RemoveCart({
          cartId: cartId,
        }),
      });

      expect(cartEffects.mergeCart$).toBeObservable(expected);
    });
  });

  describe('refresh$', () => {
    const cartChangesSuccessActions = ['CartAddVoucherSuccess'];

    cartChangesSuccessActions.forEach((actionName) => {
      it(`should refresh cart on ${actionName}`, () => {
        const action = new CartActions[actionName]({
          userId: userId,
          cartId: cartId,
        });
        const loadCompletion = new CartActions.LoadCart({
          userId: userId,
          cartId: cartId,
        });
        const decrementCompletion = new CartActions.CartProcessesDecrement(
          cartId
        );

        actions$ = hot('-a', { a: action });
        const expected = cold('-(bc)', {
          b: decrementCompletion,
          c: loadCompletion,
        });

        expect(cartEffects.refresh$).toBeObservable(expected);
      });
    });
  });

  describe('refreshWithoutProcesses$', () => {
    const cartChangesSuccessActions = [
      'CartAddEntrySuccess',
      'CartUpdateEntrySuccess',
      'CartRemoveEntrySuccess',
      'CartRemoveVoucherSuccess',
    ];

    cartChangesSuccessActions.forEach((actionName) => {
      it(`should refresh cart on ${actionName}`, () => {
        const action = new CartActions[actionName]({
          userId: userId,
          cartId: cartId,
        });
        const loadCompletion = new CartActions.LoadCart({
          userId: userId,
          cartId: cartId,
        });

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', {
          b: loadCompletion,
        });

        expect(cartEffects.refreshWithoutProcesses$).toBeObservable(expected);
      });
    });
  });

  describe('resetCartDetailsOnSiteContextChange$', () => {
    const nonActiveCartId = 'nonActiveCartId';
    const siteContextChangeActions = ['LanguageChange', 'CurrencyChange'];

    siteContextChangeActions.forEach((actionName) => {
      it(`should reload active cart and reset non-active carts on ${actionName}`, () => {
        store.dispatch(
          new CartActions.SetCartTypeIndex({
            cartType: CartType.ACTIVE,
            cartId,
          })
        );
        store.dispatch(
          new CartActions.SetCartData({
            cart: testCart,
            cartId: nonActiveCartId,
          })
        );

        const action = new SiteContextActions[actionName]();
        actions$ = hot('-a', { a: action });
        const expected = cold('-(bc)', {
          b: new CartActions.ResetCartDetailsByIds({
            cartIds: [nonActiveCartId],
          }),
          c: new CartActions.LoadCart({ userId: OCC_USER_ID_CURRENT, cartId }),
        });

        expect(
          cartEffects.refreshCartDetailsOnSiteContextChange$
        ).toBeObservable(expected);
      });

      it(`should only emit LoadCart on ${actionName} when no non-active carts`, () => {
        store.dispatch(
          new CartActions.SetCartTypeIndex({
            cartType: CartType.ACTIVE,
            cartId,
          })
        );

        const action = new SiteContextActions[actionName]();
        actions$ = hot('-a', { a: action });
        const expected = cold('-b', {
          b: new CartActions.LoadCart({ userId: OCC_USER_ID_CURRENT, cartId }),
        });

        expect(
          cartEffects.refreshCartDetailsOnSiteContextChange$
        ).toBeObservable(expected);
      });

      it(`should only reset non-active carts on ${actionName} when no active cart`, () => {
        store.dispatch(
          new CartActions.SetCartData({
            cart: testCart,
            cartId: nonActiveCartId,
          })
        );

        const action = new SiteContextActions[actionName]();
        actions$ = hot('-a', { a: action });
        const expected = cold('-b', {
          b: new CartActions.ResetCartDetailsByIds({
            cartIds: [nonActiveCartId],
          }),
        });

        expect(
          cartEffects.refreshCartDetailsOnSiteContextChange$
        ).toBeObservable(expected);
      });

      it(`should not emit on ${actionName} when no carts in state`, () => {
        const action = new SiteContextActions[actionName]();
        actions$ = hot('-a', { a: action });

        expect(
          cartEffects.refreshCartDetailsOnSiteContextChange$
        ).toBeObservable(cold('-'));
      });
    });
  });

  describe('addEmail$', () => {
    it('should add email to cart', () => {
      const action = new CartActions.AddEmailToCart({
        userId,
        cartId,
        email: 'test@test.com',
      });
      const addEmailToCartCompletion = new CartActions.AddEmailToCartSuccess({
        userId,
        cartId,
        email: 'test@test.com',
      });
      const loadCartCompletion = new CartActions.LoadCart({
        userId,
        cartId,
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: addEmailToCartCompletion,
        c: loadCartCompletion,
      });

      expect(cartEffects.addEmail$).toBeObservable(expected);
    });
  });

  describe('deleteCart$', () => {
    it('should delete cart', () => {
      const action = new CartActions.DeleteCart({ userId, cartId });
      const completion = new CartActions.DeleteCartSuccess({
        userId,
        cartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.deleteCart$).toBeObservable(expected);
    });
  });
});
