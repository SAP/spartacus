import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { OccConfig } from '@spartacus/core';
import { ProductImageConverterService } from '@spartacus/core';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from '../actions/cart.action';
import { CartDataService } from '../../facade/cart-data.service';
import { CartService } from '../../facade/cart.service';
import * as fromAuth from '../../../../../../core/src/auth/store/index';
import * as fromCart from '../../../cart/store';
import * as fromUser from '../../../user/store';
import { OccCartService } from '../../../occ/cart/cart.service';

import * as fromEffects from './cart.effect';

describe('Cart effect', () => {
  let cartService: OccCartService;
  let cartEffects: fromEffects.CartEffects;
  let actions$: Observable<any>;

  const testCart: any = {
    code: 'xxx',
    guid: 'testGuid',
    total_items: 0,
    total_price: {
      currency_iso: 'USD',
      value: 0
    },
    total_price_with_tax: {
      currency_iso: 'USD',
      value: 0
    }
  };

  const MockOccModuleConfig: OccConfig = {
    server: {
      baseUrl: '',
      occPrefix: ''
    }
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
        StoreModule.forFeature('auth', fromAuth.getReducers())
      ],

      providers: [
        OccCartService,
        ProductImageConverterService,
        fromEffects.CartEffects,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        CartService,
        CartDataService,
        provideMockActions(() => actions$)
      ]
    });

    cartEffects = TestBed.get(fromEffects.CartEffects);
    cartService = TestBed.get(OccCartService);

    spyOn(cartService, 'createCart').and.returnValue(of(testCart));
    spyOn(cartService, 'loadCart').and.returnValue(of(testCart));
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
        cartId: cartId
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
        cartId: cartId
      });
      const completion = new fromActions.CreateCart({
        userId: userId,
        oldCartId: cartId,
        toMergeCartGuid: 'testGuid'
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.mergeCart$).toBeObservable(expected);
    });
  });
});
