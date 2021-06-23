import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { Cart } from '../../../model/cart.model';
import * as fromCartReducers from '../../store/reducers/index';
import { CartActions } from '../actions/index';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
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

  describe('setTempCart$', () => {
    it('should dispatch RemoveCart just after setting', () => {
      const payload = { cart: testCart, tempCartId: 'tempCartId' };
      const action = new CartActions.SetTempCart(payload);
      const removeTempCartCompletion = new CartActions.RemoveCart({
        cartId: payload.tempCartId,
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: removeTempCartCompletion,
      });
      expect(cartEffects.setTempCart$).toBeObservable(expected);
    });
  });

  describe('processesIncrement$', () => {
    it('should dispatch CartProcessesIncrement action', () => {
      const payload = {
        userId: 'userId',
        cartId: 'cartId',
      };
      const action = new CartActions.CartAddVoucher({
        ...payload,
        voucherId: 'voucherId',
      });

      const processesIncrementCompletion =
        new CartActions.CartProcessesIncrement(payload.cartId);
      actions$ = hot('-b', {
        b: action,
      });
      const expected = cold('-1', {
        1: processesIncrementCompletion,
      });
      expect(cartEffects.processesIncrement$).toBeObservable(expected);
    });
  });
});
