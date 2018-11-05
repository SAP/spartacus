import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import * as fromCart from '../../../cart/store';
import * as fromUser from '../../../user/store';
import * as fromAuth from '../../../auth/store';

import { OccCartService } from '../../../occ/cart/cart.service';
import { OccConfig } from '@spartacus/core';
import { CartService } from '../../services/cart.service';
import { CartDataService } from '../../services/cart-data.service';
import { ProductImageConverterService } from '../../../product/converters';
import * as fromEffects from './cart.effect';
import * as fromActions from '../actions/cart.action';
import { provideMockActions } from '@ngrx/effects/testing';

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
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers()),
          auth: combineReducers(fromAuth.getReducers())
        })
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
