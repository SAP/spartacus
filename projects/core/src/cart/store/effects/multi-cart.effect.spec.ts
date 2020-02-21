import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { CheckoutActions } from '../../../checkout/store/actions';
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

describe('Multi Cart effect', () => {
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

    cartEffects = TestBed.inject(fromEffects.MultiCartEffects);
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

  describe('setTempCart$', () => {
    it('should dispatch reset just after setting', () => {
      const payload = { cart: testCart, tempCartId: 'tempCartId' };
      const action = new CartActions.SetTempCart(payload);
      const removeTempCartCompletion = new CartActions.RemoveTempCart(payload);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: removeTempCartCompletion,
      });
      expect(cartEffects.setTempCart$).toBeObservable(expected);
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

  describe('removeCart$', () => {
    it('should dispatch RemoveCart action', () => {
      const payload = {
        userId: 'userId',
        cartId: 'cartId',
      };
      const action = new DeprecatedCartActions.DeleteCart(payload);
      const removeCartCompletion = new CartActions.RemoveCart(payload.cartId);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: removeCartCompletion,
      });
      expect(cartEffects.removeCart$).toBeObservable(expected);
    });
  });

  describe('processesIncrement$', () => {
    it('should dispatch CartProcessesIncrement action', () => {
      const payload = {
        userId: 'userId',
        cartId: 'cartId',
      };
      const action1 = new CartActions.CartAddEntry(payload);
      const action2 = new CartActions.CartUpdateEntry(payload);
      const action3 = new CartActions.CartRemoveEntry(payload);
      const action4 = new DeprecatedCartActions.AddEmailToCart({
        ...payload,
        email: 'email',
      });
      const action5 = new CheckoutActions.ClearCheckoutDeliveryMode(payload);
      const action6 = new CartActions.CartAddVoucher({
        ...payload,
        voucherId: 'voucherId',
      });
      const action7 = new CartActions.CartRemoveVoucher({
        ...payload,
        voucherId: 'voucherId',
      });

      const processesIncrementCompletion = new CartActions.CartProcessesIncrement(
        payload.cartId
      );
      actions$ = hot('-a-b-c-d-e-f-g', {
        a: action1,
        b: action2,
        c: action3,
        d: action4,
        e: action5,
        f: action6,
        g: action7,
      });
      const expected = cold('-1-2-3-4-5-6-7', {
        1: processesIncrementCompletion,
        2: processesIncrementCompletion,
        3: processesIncrementCompletion,
        4: processesIncrementCompletion,
        5: processesIncrementCompletion,
        6: processesIncrementCompletion,
        7: processesIncrementCompletion,
      });
      expect(cartEffects.processesIncrement$).toBeObservable(expected);
    });
  });
});
