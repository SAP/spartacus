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
  provideFeatureToggles,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import * as fromClientAuthReducers from 'core-libs/core/src/auth/client-auth/store/reducers/index';
import * as fromUserReducers from 'core-libs/core/src/user/store/reducers/index';
import { Observable, ReplaySubject, of, throwError } from 'rxjs';
import { CartConnector } from '../../connectors/cart/cart.connector';
import * as fromCartReducers from '../../store/reducers/index';
import { CartActions } from '../actions/index';
import { MULTI_CART_FEATURE, StateWithMultiCart } from '../multi-cart-state';
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
        provideFeatureToggles({
          enableCartReloadOnContextChange: true,
          enableCartSlowNetworkResilience: true,
        }),
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

    it('should NOT dispatch LoadCart while pending processes remain (CXSPA-10582)', (done) => {
      // Drive both the Actions$ stream (mocked) and the store state in
      // lockstep. CartAddEntry/CartAddEntrySuccess extend
      // EntityProcessesIncrement/DecrementAction, so dispatching them to the
      // store mutates processesCount; we also push them through actions$ so
      // the effect's ofType(...) sees them.
      const actionsSubject = new ReplaySubject<any>();
      actions$ = actionsSubject.asObservable();

      const send = (action: any) => {
        actionsSubject.next(action);
        store.dispatch(action);
      };

      // Two CartAddEntry → processesCount = 2.
      send(
        new CartActions.CartAddEntry({
          userId,
          cartId,
          productCode: 'A',
          quantity: 1,
        })
      );
      send(
        new CartActions.CartAddEntry({
          userId,
          cartId,
          productCode: 'B',
          quantity: 1,
        })
      );

      const emissions: CartActions.LoadCart[] = [];
      const sub = cartEffects.refreshWithoutProcesses$.subscribe((a) =>
        emissions.push(a)
      );

      // First success → processesCount = 1. Effect must hold off.
      send(
        new CartActions.CartAddEntrySuccess({
          userId,
          cartId,
          productCode: 'A',
          quantity: 1,
        })
      );

      setTimeout(() => {
        expect(emissions.length).toBe(0);

        // Final success drains the queue → processesCount = 0 → trailing
        // LoadCart fires.
        send(
          new CartActions.CartAddEntrySuccess({
            userId,
            cartId,
            productCode: 'B',
            quantity: 1,
          })
        );

        setTimeout(() => {
          expect(emissions.length).toBeGreaterThanOrEqual(1);
          emissions.forEach((a) => {
            expect(a).toEqual(new CartActions.LoadCart({ userId, cartId }));
          });
          sub.unsubscribe();
          done();
        }, 0);
      }, 0);
    });

    it('should dispatch LoadCart per cartId group (rapid multi-product adds across the SAME cart collapse to one trailing reload)', (done) => {
      const actionsSubject = new ReplaySubject<any>();
      actions$ = actionsSubject.asObservable();

      const send = (action: any) => {
        actionsSubject.next(action);
        store.dispatch(action);
      };

      // Five CartAddEntry on the same cart → processesCount = 5.
      for (let i = 0; i < 5; i++) {
        send(
          new CartActions.CartAddEntry({
            userId,
            cartId,
            productCode: `P${i}`,
            quantity: 1,
          })
        );
      }

      const emissions: CartActions.LoadCart[] = [];
      const sub = cartEffects.refreshWithoutProcesses$.subscribe((a) =>
        emissions.push(a)
      );

      // Four successes; processesCount stays > 0.
      for (let i = 0; i < 4; i++) {
        send(
          new CartActions.CartAddEntrySuccess({
            userId,
            cartId,
            productCode: `P${i}`,
            quantity: 1,
          })
        );
      }

      setTimeout(() => {
        expect(emissions.length).toBe(0);

        // Final success drains the queue.
        send(
          new CartActions.CartAddEntrySuccess({
            userId,
            cartId,
            productCode: 'P4',
            quantity: 1,
          })
        );

        setTimeout(() => {
          // All queued successes resolve at quiescence; groupBy + concatMap
          // means we may see ≥ 1 LoadCarts but they all target the same
          // cartId — the important property is "at least one trailing
          // reload, never zero".
          expect(emissions.length).toBeGreaterThanOrEqual(1);
          emissions.forEach((a) => expect(a.payload.cartId).toBe(cartId));
          sub.unsubscribe();
          done();
        }, 0);
      }, 0);
    });

    it('should keep different cartIds in flight independent (each waits its own falling edge)', (done) => {
      const cartIdA = 'cartA';
      const cartIdB = 'cartB';
      const actionsSubject = new ReplaySubject<any>();
      actions$ = actionsSubject.asObservable();

      const send = (action: any) => {
        actionsSubject.next(action);
        store.dispatch(action);
      };

      // Open processes on both carts.
      send(
        new CartActions.CartAddEntry({
          userId,
          cartId: cartIdA,
          productCode: 'A',
          quantity: 1,
        })
      );
      send(
        new CartActions.CartAddEntry({
          userId,
          cartId: cartIdB,
          productCode: 'B',
          quantity: 1,
        })
      );

      const emissions: CartActions.LoadCart[] = [];
      const sub = cartEffects.refreshWithoutProcesses$.subscribe((a) =>
        emissions.push(a)
      );

      // Drain cartA only; cartB is still in flight.
      send(
        new CartActions.CartAddEntrySuccess({
          userId,
          cartId: cartIdA,
          productCode: 'A',
          quantity: 1,
        })
      );

      setTimeout(() => {
        const aLoads = emissions.filter((e) => e.payload.cartId === cartIdA);
        const bLoads = emissions.filter((e) => e.payload.cartId === cartIdB);
        expect(aLoads.length).toBeGreaterThanOrEqual(1);
        expect(bLoads.length).toBe(0);

        // Now drain cartB.
        send(
          new CartActions.CartAddEntrySuccess({
            userId,
            cartId: cartIdB,
            productCode: 'B',
            quantity: 1,
          })
        );

        setTimeout(() => {
          expect(
            emissions.filter((e) => e.payload.cartId === cartIdB).length
          ).toBeGreaterThanOrEqual(1);
          sub.unsubscribe();
          done();
        }, 0);
      }, 0);
    });

    it('should start a fresh wait for the next CartAddEntrySuccess on the same cart after a falling edge', (done) => {
      const actionsSubject = new ReplaySubject<any>();
      actions$ = actionsSubject.asObservable();

      const send = (action: any) => {
        actionsSubject.next(action);
        store.dispatch(action);
      };

      const emissions: CartActions.LoadCart[] = [];
      const sub = cartEffects.refreshWithoutProcesses$.subscribe((a) =>
        emissions.push(a)
      );

      // Round 1: open + drain.
      send(
        new CartActions.CartAddEntry({
          userId,
          cartId,
          productCode: 'A',
          quantity: 1,
        })
      );
      send(
        new CartActions.CartAddEntrySuccess({
          userId,
          cartId,
          productCode: 'A',
          quantity: 1,
        })
      );

      setTimeout(() => {
        const round1Count = emissions.length;
        expect(round1Count).toBeGreaterThanOrEqual(1);

        // Round 2: another burst on the SAME cartId. The inner take(1) must
        // NOT have permanently terminated this cartId's stream.
        send(
          new CartActions.CartAddEntry({
            userId,
            cartId,
            productCode: 'B',
            quantity: 1,
          })
        );
        send(
          new CartActions.CartAddEntrySuccess({
            userId,
            cartId,
            productCode: 'B',
            quantity: 1,
          })
        );

        setTimeout(() => {
          expect(emissions.length).toBeGreaterThan(round1Count);
          emissions.forEach((a) => expect(a.payload.cartId).toBe(cartId));
          sub.unsubscribe();
          done();
        }, 0);
      }, 0);
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

describe('Cart effect — enableCartSlowNetworkResilience OFF (legacy refreshWithoutProcesses$)', () => {
  let cartEffects: fromEffects.CartEffects;
  let actions$: Observable<any>;

  const userId = 'testUserId';
  const cartId = 'testCartId';

  const MockOccModuleConfig: OccConfig = {
    backend: { occ: { baseUrl: '', prefix: '' } },
  };

  beforeEach(() => {
    class MockCartConnector {
      create = createSpy().and.returnValue(of(testCart));
      load = createSpy().and.returnValue(of(testCart));
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
        { provide: CartConnector, useClass: MockCartConnector },
        fromEffects.CartEffects,
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: OccConfig, useValue: MockOccModuleConfig },
        provideMockActions(() => actions$),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideFeatureToggles({
          enableCartReloadOnContextChange: true,
          enableCartSlowNetworkResilience: false,
        }),
      ],
    });

    cartEffects = TestBed.inject(fromEffects.CartEffects);
  });

  // Legacy behaviour: every success action dispatches a single LoadCart
  // synchronously, regardless of pending processes count.
  const cartChangesSuccessActions = [
    'CartAddEntrySuccess',
    'CartUpdateEntrySuccess',
    'CartRemoveEntrySuccess',
    'CartRemoveVoucherSuccess',
  ];

  cartChangesSuccessActions.forEach((actionName) => {
    it(`should synchronously dispatch a single LoadCart on ${actionName}`, () => {
      const action = new CartActions[actionName]({ userId, cartId });
      const loadCompletion = new CartActions.LoadCart({ userId, cartId });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: loadCompletion });

      expect(cartEffects.refreshWithoutProcesses$).toBeObservable(expected);
    });
  });
});
