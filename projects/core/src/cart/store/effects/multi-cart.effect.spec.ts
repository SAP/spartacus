import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { Cart } from '../../../model/cart.model';
import * as fromCartReducers from '../../store/reducers/index';
import * as DeprecatedCartActions from '../actions/cart.action';
import { CartActions } from '../actions/index';
import { CART_FEATURE } from '../cart-state';
import { MULTI_CART_FEATURE } from '../multi-cart-state';
import * as fromEffects from './multi-cart.effect';

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
  let cartEffects: fromEffects.MultiCartEffects;
  let actions$: Observable<any>;

  const userId = 'testUserId';
  const cartId = 'testCartId';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CART_FEATURE, fromCartReducers.getReducers()),
        StoreModule.forFeature(
          MULTI_CART_FEATURE,
          fromCartReducers.getMultiCartReducers()
        ),
      ],

      providers: [
        fromEffects.MultiCartEffects,
        provideMockActions(() => actions$),
      ],
    });

    cartEffects = TestBed.get(fromEffects.MultiCartEffects as Type<
      fromEffects.MultiCartEffects
    >);
  });

  describe('loadCart2$', () => {
    it('should dispatch load multi cart action', () => {
      const action = new DeprecatedCartActions.LoadCart({
        userId,
        cartId,
      });
      const loadMultiCartCompletion = new CartActions.LoadMultiCart({
        userId,
        cartId,
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: loadMultiCartCompletion,
      });
      expect(cartEffects.loadCart2$).toBeObservable(expected);
    });
  });

  describe('createCart2$', () => {
    it('should dispatch create multi cart action', () => {
      const action = new DeprecatedCartActions.CreateCart({
        userId,
        cartId,
      });
      const createMultiCartCompletion = new CartActions.CreateMultiCart({
        userId,
        cartId,
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: createMultiCartCompletion,
      });
      expect(cartEffects.createCart2$).toBeObservable(expected);
    });
  });

  describe('setFreshCart$', () => {
    it('should dispatch reset just after setting', () => {
      const action = new CartActions.SetFreshCart(testCart);
      const resetFreshCartCompletion = new CartActions.ResetFreshCart();
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: resetFreshCartCompletion,
      });
      expect(cartEffects.setFreshCart$).toBeObservable(expected);
    });
  });

  describe('mergeCart2$', () => {
    it('should dispatch MergeMultiCart action', () => {
      const action = new DeprecatedCartActions.MergeCart({});
      const mergeMultiCartCompletion = new CartActions.MergeMultiCart({});
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: mergeMultiCartCompletion,
      });
      expect(cartEffects.mergeCart2$).toBeObservable(expected);
    });
  });

  describe('addEmail2$', () => {
    it('should dispatch AddEmailToMultiCart action', () => {
      const payload = {
        email: 'test@email.com',
        userId: 'userId',
        cartId: 'cartId',
      };
      const action = new DeprecatedCartActions.AddEmailToCart(payload);
      const addEmailToMultiCartCompletion = new CartActions.AddEmailToMultiCart(
        payload
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: addEmailToMultiCartCompletion,
      });
      expect(cartEffects.addEmail2$).toBeObservable(expected);
    });
  });
});
