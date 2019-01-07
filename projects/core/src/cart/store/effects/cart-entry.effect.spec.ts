import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { OccCartService } from '../../occ/cart.service';
import * as fromEffects from './cart-entry.effect';
import * as fromActions from '../actions';
import { OccConfig } from '../../../occ/index';

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  }
};

describe('Cart effect', () => {
  let cartService: OccCartService;
  let entryEffects: fromEffects.CartEntryEffects;
  let actions$: Observable<any>;

  const userId = 'testUserId';
  const cartId = 'testCartId';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartService,
        fromEffects.CartEntryEffects,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        provideMockActions(() => actions$)
      ]
    });

    entryEffects = TestBed.get(fromEffects.CartEntryEffects);
    cartService = TestBed.get(OccCartService);

    spyOn(cartService, 'addEntry').and.returnValue(of({ entry: 'testEntry' }));
    spyOn(cartService, 'removeEntry').and.returnValue(of({}));
    spyOn(cartService, 'updateEntry').and.returnValue(of({}));
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

      actions$ = hot('-a', { a: action });
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

      actions$ = hot('-a', { a: action });
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

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.updateEntry$).toBeObservable(expected);
    });
  });
});
