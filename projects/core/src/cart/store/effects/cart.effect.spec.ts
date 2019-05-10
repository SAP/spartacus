import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { cold, hot } from 'jasmine-marbles';

import { CartConnector } from '../../connectors/cart/cart.connector';
import * as fromActions from '../actions/cart.action';
import { ProductImageNormalizer } from '../../../product';
import { CartDataService } from '../../facade/cart-data.service';
import { CartService } from '../../facade/cart.service';
import * as fromCart from '../../store/index';
import * as fromAuth from '../../../auth/store/index';
import * as fromUser from '../../../user/store/index';

import * as fromEffects from './cart.effect';
import { OccConfig } from '@spartacus/core';
import { Cart } from '../../../model/cart.model';
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
        StoreModule.forFeature('cart', fromCart.getReducers()),
        StoreModule.forFeature('user', fromUser.getReducers()),
        StoreModule.forFeature('auth', fromAuth.getReducers()),
      ],

      providers: [
        {
          provide: CartConnector,
          useClass: MockCartConnector,
        },
        ProductImageNormalizer,
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
      const action = new fromActions.CreateCart(userId);
      const completion = new fromActions.CreateCartSuccess(testCart);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.createCart$).toBeObservable(expected);
    });
  });

  describe('loadCart$', () => {
    it('should load a cart', () => {
      const action = new fromActions.LoadCart({
        userId: userId,
        cartId: cartId,
      });
      const completion = new fromActions.LoadCartSuccess(testCart);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.loadCart$).toBeObservable(expected);
    });
  });

  describe('mergeCart$', () => {
    it('should merge old cart into the session cart', () => {
      const action = new fromActions.MergeCart({
        userId: userId,
        cartId: cartId,
      });
      const completion = new fromActions.CreateCart({
        userId: userId,
        oldCartId: cartId,
        toMergeCartGuid: 'testGuid',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.mergeCart$).toBeObservable(expected);
    });
  });
});
