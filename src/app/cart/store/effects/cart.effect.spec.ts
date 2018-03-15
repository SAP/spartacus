import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import * as fromCart from '../../../cart/store';
import * as fromUser from '../../../auth/store';

import { OccCartService } from '../../../occ/cart/cart.service';
import { ConfigService } from '../../../occ/config.service';
import { CartService } from '../../services';
import { ProductImageConverterService } from '../../../product/converters';
import * as fromEffects from './cart.effect';
import * as fromActions from '../actions/cart.action';

@Injectable()
class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

function getActions() {
  return new TestActions();
}

describe('Cart effect', () => {
  let cartService: OccCartService;
  let cartEffects: fromEffects.CartEffects;
  let actions$: TestActions;

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

  const userId = 'testUserId';
  const cartId = 'testCartId';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          cart: combineReducers(fromCart.reducers),
          user: combineReducers(fromUser.reducers)
        })
      ],

      providers: [
        OccCartService,
        ProductImageConverterService,
        fromEffects.CartEffects,
        ConfigService,
        CartService,
        { provide: Actions, useFactory: getActions }
      ]
    });

    cartEffects = TestBed.get(fromEffects.CartEffects);
    cartService = TestBed.get(OccCartService);
    actions$ = TestBed.get(Actions);

    spyOn(cartService, 'createCart').and.returnValue(of(testCart));
    spyOn(cartService, 'loadCart').and.returnValue(of(testCart));
  });

  describe('createCart$', () => {
    it('should create a cart', () => {
      const action = new fromActions.CreateCart(userId);
      const completion = new fromActions.CreateCartSuccess(testCart);

      actions$.stream = hot('-a', { a: action });
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

      actions$.stream = hot('-a', { a: action });
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

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.mergeCart$).toBeObservable(expected);
    });
  });
});
