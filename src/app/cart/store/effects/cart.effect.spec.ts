import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { CartEffects } from '.';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { Cart } from '../../models/cart-types.model';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';
import { OccCartService } from '../../../newocc/cart/cart.service';

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

class MockCartService {}

fdescribe('Cart effect', () => {
  let cartService: OccCartService;
  let cartEffects: CartEffects;
  let actions$: TestActions;
  const testCart: Cart = {
    code: 'xxx',
    guid: 'xxx',
    totalItems: 0,
    totalPrice: {
      currencyIso: 'USD',
      value: 0
    },
    totalPriceWithTax: {
      currencyIso: 'USD',
      value: 0
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartEffects,
        { provide: OccCartService, useClass: MockCartService },
        { provide: Actions, useFactory: getActions }
      ]
    });

    cartEffects = TestBed.get(CartEffects);
    cartService = TestBed.get(OccCartService);
    actions$ = TestBed.get(Actions);
  });

  describe('createCart$', () => {
    it('should create a cart', () => {
      spyOn(cartService, 'createCart').and.returnValue(of(testCart));

      const action = new fromActions.CreateCart('xxx@xxx.xxx');
      const completion = new fromActions.CreateCartSuccess(testCart);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cartEffects.createCart$).toBeObservable(expected);
    });
  });
});
