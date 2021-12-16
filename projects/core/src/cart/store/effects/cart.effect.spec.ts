import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { normalizeHttpError } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { CLIENT_AUTH_FEATURE } from '../../../auth/client-auth/store/client-auth-state';
import * as fromClientAuthReducers from '../../../auth/client-auth/store/reducers/index';
import { Cart } from '../../../model/cart.model';
import { OccConfig } from '../../../occ/config/occ-config';
import { OCC_CART_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import * as fromUserReducers from '../../../user/store/reducers/index';
import { USER_FEATURE } from '../../../user/store/user-state';
import { CartConnector } from '../../connectors/cart/cart.connector';
import * as fromCartReducers from '../../store/reducers/index';
import { CartActions } from '../actions/index';
import { MULTI_CART_FEATURE } from '../multi-cart-state';
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
        { provide: OccConfig, useValue: MockOccModuleConfig },
        provideMockActions(() => actions$),
      ],
    });

    cartEffects = TestBed.inject(fromEffects.CartEffects);
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
        throwError({
          error: {
            errors: [
              { reason: 'notFound', subjectType: 'cart', subject: '123456' },
            ],
          },
        })
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
      loadMock.and.returnValue(throwError(httpError));
      const removeCartCompletion = new CartActions.LoadCartFail({
        ...payload,
        error: normalizeHttpError(httpError),
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
      const setTempCartCompletion = new CartActions.SetTempCart({
        cart: testCart,
        tempCartId: tempCartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: createCartSuccessCompletion,
        c: setTempCartCompletion,
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
      const setTempCartCompletion = new CartActions.SetTempCart({
        cart: testCart,
        tempCartId,
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
        c: setTempCartCompletion,
        d: mergeCartCompletion,
      });

      expect(cartEffects.createCart$).toBeObservable(expected);
    });
  });

  describe('mergeCart$', () => {
    it('should merge old cart into the session cart', () => {
      const action = new CartActions.MergeCart({
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

    it('should do nothing if merged old cart is the same as session cart', () => {
      const action = new CartActions.MergeCart({
        userId: userId,
        cartId: 'xxx',
        tempCartId: 'temp-uuid',
      });

      actions$ = hot('-a', { a: action });

      expect(cartEffects.mergeCart$).toBeObservable(cold('--'));
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
    const siteContextChangeActions = ['LanguageChange', 'CurrencyChange'];

    siteContextChangeActions.forEach((actionName) => {
      it(`should reset cart details on ${actionName}`, () => {
        const action = new SiteContextActions[actionName]();
        const resetCartDetailsCompletion = new CartActions.ResetCartDetails();

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', {
          b: resetCartDetailsCompletion,
        });

        expect(cartEffects.resetCartDetailsOnSiteContextChange$).toBeObservable(
          expected
        );
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
