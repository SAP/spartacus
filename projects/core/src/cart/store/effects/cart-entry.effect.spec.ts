import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { OccConfig } from '../../../occ/index';
import { CartEntryConnector } from '../../connectors/entry/cart-entry.connector';
import { CartActions } from '../actions/index';
import * as fromEffects from './cart-entry.effect';
import createSpy = jasmine.createSpy;

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

class MockCartEntryConnector {
  add = createSpy().and.returnValue(of({ entry: 'testEntry' }));
  remove = createSpy().and.returnValue(of({}));
  update = createSpy().and.returnValue(of({}));
}

describe('Cart effect', () => {
  let entryEffects: fromEffects.CartEntryEffects;
  let actions$: Observable<Action>;

  const userId = 'testUserId';
  const cartId = 'testCartId';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CartEntryConnector, useClass: MockCartEntryConnector },
        fromEffects.CartEntryEffects,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        provideMockActions(() => actions$),
      ],
    });

    entryEffects = TestBed.inject(fromEffects.CartEntryEffects);
  });

  describe('addEntry$', () => {
    it('should add an entry', () => {
      const action = new CartActions.CartAddEntry({
        userId: userId,
        cartId: cartId,
        productCode: 'testProductCode',
        quantity: 1,
      });
      const completion = new CartActions.CartAddEntrySuccess({
        entry: 'testEntry',
        userId,
        cartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.addEntry$).toBeObservable(expected);
    });
  });

  describe('removeEntry$', () => {
    it('should remove an entry', () => {
      const action = new CartActions.CartRemoveEntry({
        userId: userId,
        cartId: cartId,
        entry: 'testEntryNumber',
      });
      const completion = new CartActions.CartRemoveEntrySuccess({
        userId,
        cartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.removeEntry$).toBeObservable(expected);
    });
  });

  describe('updateEntry$', () => {
    it('should update an entry', () => {
      const action = new CartActions.CartUpdateEntry({
        userId: userId,
        cartId: cartId,
        entry: 'testEntryNumber',
        qty: 1,
      });
      const completion = new CartActions.CartUpdateEntrySuccess({
        userId,
        cartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.updateEntry$).toBeObservable(expected);
    });
  });
});
