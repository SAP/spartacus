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
import { OCC_CART_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import * as fromUserReducers from '../../../user/store/reducers/index';
import { USER_FEATURE } from '../../../user/store/user-state';
import { CartConnector } from '../../connectors/cart/cart.connector';
import { CartDataService } from '../../facade/cart-data.service';
import * as fromCartReducers from '../../store/reducers/index';
import * as DeprecatedCartActions from '../actions/cart.action';
import { CartActions } from '../actions/index';
import { CART_FEATURE } from '../cart-state';
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
        StoreModule.forFeature(CART_FEATURE, fromCartReducers.getReducers()),
        StoreModule.forFeature(USER_FEATURE, fromUserReducers.getReducers()),
        StoreModule.forFeature(AUTH_FEATURE, fromAuthReducers.getReducers()),
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
      const action = new DeprecatedCartActions.LoadCart({
        userId: userId,
        cartId: cartId,
      });
      const loadMultiCartCompletion = new CartActions.LoadMultiCartSuccess({
        cart: testCart,
        userId,
        extraData: undefined,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: loadMultiCartCompletion,
      });

      expect(cartEffects.loadCart$).toBeObservable(expected);
    });

    it('should complete add entry process when dispatched with extraData', () => {
      const action = new DeprecatedCartActions.LoadCart({
        userId,
        cartId,
        extraData: {
          addEntries: true,
        },
      });
      const loadMultiCartCompletion = new CartActions.LoadMultiCartSuccess({
        cart: testCart,
        userId,
        extraData: {
          addEntries: true,
        },
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: loadMultiCartCompletion,
      });

      expect(cartEffects.loadCart$).toBeObservable(expected);
    });

    it('should remove current cart for current load', () => {
      const action = new DeprecatedCartActions.LoadCart({
        userId,
        cartId: 'current',
      });
      const loadCartCompletion = new DeprecatedCartActions.LoadCartSuccess(
        testCart
      );
      const loadMultiCartCompletion = new CartActions.LoadMultiCartSuccess({
        cart: testCart,
        userId,
        extraData: undefined,
      });
      const removeCartCompletion = new CartActions.RemoveCart(
        OCC_CART_ID_CURRENT
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: loadCartCompletion,
        c: loadMultiCartCompletion,
        d: removeCartCompletion,
      });

      expect(cartEffects.loadCart$).toBeObservable(expected);
    });

    it('return fail actions on empty cart', () => {
      const action = new DeprecatedCartActions.LoadCart({
        userId,
        cartId,
      });
      loadMock.and.returnValue(of(null));
      const loadCartFailCompletion = new DeprecatedCartActions.LoadCartFail({});
      const loadMultiCartFailCompletion = new CartActions.LoadMultiCartFail({
        cartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: loadCartFailCompletion,
        c: loadMultiCartFailCompletion,
      });

      expect(cartEffects.loadCart$).toBeObservable(expected);
    });

    it('should clear active cart on "Cart not found" error', () => {
      const action = new DeprecatedCartActions.LoadCart({
        userId,
        cartId,
        extraData: { active: true },
      });
      loadMock.and.returnValue(
        throwError({
          error: {
            errors: [{ reason: 'notFound' }],
          },
        })
      );
      const clearCartCompletion = new DeprecatedCartActions.ClearCart();
      const removeCartCompletion = new CartActions.RemoveCart(cartId);
      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: clearCartCompletion,
        c: removeCartCompletion,
      });
      expect(cartEffects.loadCart$).toBeObservable(expected);
    });
  });

  describe('createCart$', () => {
    it('should create a cart', () => {
      const action = new DeprecatedCartActions.CreateCart({
        userId,
        tempCartId,
      });
      const createMultiCartSuccessCompletion = new CartActions.CreateMultiCartSuccess(
        {
          cart: testCart,
          userId,
          extraData: undefined,
        }
      );
      const setTempCartCompletion = new CartActions.SetTempCart({
        cart: testCart,
        tempCartId: tempCartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: createMultiCartSuccessCompletion,
        c: setTempCartCompletion,
      });

      expect(cartEffects.createCart$).toBeObservable(expected);
    });

    it('should dispatch CreateCartSuccess action for active cart', () => {
      const action = new DeprecatedCartActions.CreateCart({
        userId,
        extraData: {
          active: true,
        },
        tempCartId,
      });
      const createCartSuccessCompletion = new DeprecatedCartActions.CreateCartSuccess(
        testCart
      );
      const createMultiCartSuccessCompletion = new CartActions.CreateMultiCartSuccess(
        {
          cart: testCart,
          userId,
          extraData: {
            active: true,
          },
        }
      );
      const setTempCartCompletion = new CartActions.SetTempCart({
        cart: testCart,
        tempCartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: createMultiCartSuccessCompletion,
        c: setTempCartCompletion,
        d: createCartSuccessCompletion,
      });

      expect(cartEffects.createCart$).toBeObservable(expected);
    });

    it('should create and merge cart when oldCartId is provided', () => {
      const action = new DeprecatedCartActions.CreateCart({
        userId,
        oldCartId: 'testOldCartId',
        tempCartId,
      });

      const createMultiCartCompletion = new CartActions.CreateMultiCartSuccess({
        cart: testCart,
        userId,
        extraData: undefined,
      });
      const setTempCartCompletion = new CartActions.SetTempCart({
        cart: testCart,
        tempCartId,
      });
      const mergeCartCompletion = new DeprecatedCartActions.MergeCartSuccess({
        userId,
        cartId: testCart.code,
      });
      const mergeMultiCartCompletion = new CartActions.MergeMultiCartSuccess({
        oldCartId: 'testOldCartId',
        cartId: testCart.code,
        userId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcde)', {
        b: createMultiCartCompletion,
        c: setTempCartCompletion,
        d: mergeCartCompletion,
        e: mergeMultiCartCompletion,
      });

      expect(cartEffects.createCart$).toBeObservable(expected);
    });
  });

  describe('mergeCart$', () => {
    it('should merge old cart into the session cart', () => {
      const action = new DeprecatedCartActions.MergeCart({
        userId: userId,
        cartId: cartId,
        tempCartId: 'temp-uuid',
      });
      const completion = new DeprecatedCartActions.CreateCart({
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
  });

  describe('refresh$', () => {
    const cartChangesSuccessActions = [
      'CartAddEntrySuccess',
      'CartUpdateEntrySuccess',
      'CartRemoveEntrySuccess',
      'CartAddVoucherSuccess',
      'CartRemoveVoucherSuccess',
    ];

    cartChangesSuccessActions.forEach(actionName => {
      it(`should refresh cart on ${actionName}`, () => {
        const action = new CartActions[actionName]({
          userId: userId,
          cartId: cartId,
        });
        const loadCompletion = new DeprecatedCartActions.LoadCart({
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
    it(`should refresh cart on MergeCartSuccess`, () => {
      const action = new CartActions.MergeCartSuccess({
        userId: userId,
        cartId: cartId,
      });
      const loadCompletion = new DeprecatedCartActions.LoadCart({
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

  describe('resetCartDetailsOnSiteContextChange$', () => {
    const siteContextChangeActions = ['LanguageChange', 'CurrencyChange'];

    siteContextChangeActions.forEach(actionName => {
      it(`should reset cart details on ${actionName}`, () => {
        const action = new SiteContextActions[actionName]();
        const resetCartDetailsCompletion = new DeprecatedCartActions.ResetCartDetails();
        const resetMultiCartDetailsCompletion = new CartActions.ResetMultiCartDetails();

        actions$ = hot('-a', { a: action });
        const expected = cold('-(bc)', {
          b: resetCartDetailsCompletion,
          c: resetMultiCartDetailsCompletion,
        });

        expect(cartEffects.resetCartDetailsOnSiteContextChange$).toBeObservable(
          expected
        );
      });
    });
  });

  describe('addEmail$', () => {
    it('should add email to cart', () => {
      const action = new DeprecatedCartActions.AddEmailToCart({
        userId: userId,
        cartId: cartId,
        email: 'test@test.com',
      });
      const addEmailToCartCompletion = new DeprecatedCartActions.AddEmailToCartSuccess(
        {
          userId,
          cartId,
        }
      );
      const addEmailToMultiCartCompletion = new CartActions.AddEmailToMultiCartSuccess(
        {
          userId,
          cartId,
        }
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: addEmailToCartCompletion,
        c: addEmailToMultiCartCompletion,
      });

      expect(cartEffects.addEmail$).toBeObservable(expected);
    });
  });

  describe('deleteCart$', () => {
    it('should delete cart', () => {
      const action = new DeprecatedCartActions.DeleteCart({ userId, cartId });
      const completion = new DeprecatedCartActions.ClearCart();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.deleteCart$).toBeObservable(expected);
    });
  });
});
