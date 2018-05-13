import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable ,  EMPTY ,  of } from 'rxjs';

import { OccCartService } from '../../../occ/cart/cart.service';
import { ConfigService } from '../../../occ/config.service';
import * as fromEffects from './cart-entry.effect';
import * as fromActions from '../actions';

@Injectable()
class TestActions extends Actions {
  constructor() {
    super(EMPTY);
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
  let entryEffects: fromEffects.CartEntryEffects;
  let actions$: TestActions;

  const userId = 'testUserId';
  const cartId = 'testCartId';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartService,
        fromEffects.CartEntryEffects,
        ConfigService,
        { provide: Actions, useFactory: getActions }
      ]
    });

    entryEffects = TestBed.get(fromEffects.CartEntryEffects);
    cartService = TestBed.get(OccCartService);
    actions$ = TestBed.get(Actions);

    spyOn(cartService, 'addCartEntry').and.returnValue(
      of({ entry: 'testEntry' })
    );
    spyOn(cartService, 'removeCartEntry').and.returnValue(of({}));
    spyOn(cartService, 'updateCartEntry').and.returnValue(of({}));
  });

  describe('addEntry$', () => {
    it('should add an entry', () => {
      const action = new fromActions.AddEntry({
        userId: userId,
        cartId: cartId,
        productCode: 'testProductCode',
        quantity: 1
      });
      const completion = new fromActions.AddEntrySuccess({
        entry: 'testEntry'
      });

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.addEntry$).toBeObservable(expected);
    });
  });

  describe('removeEntry$', () => {
    it('should remove an entry', () => {
      const action = new fromActions.RemoveEntry({
        userId: userId,
        cartId: cartId,
        entry: 'testEntryNumber'
      });
      const completion = new fromActions.RemoveEntrySuccess();

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.removeEntry$).toBeObservable(expected);
    });
  });

  describe('updateEntry$', () => {
    it('should update an entry', () => {
      const action = new fromActions.UpdateEntry({
        userId: userId,
        cartId: cartId,
        entry: 'testEntryNumber',
        qty: 1
      });
      const completion = new fromActions.UpdateEntrySuccess();

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.updateEntry$).toBeObservable(expected);
    });
  });
});
