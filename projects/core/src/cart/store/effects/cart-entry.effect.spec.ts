import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CartModification } from '../../../model/cart.model';
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

describe('Cart effect', () => {
  let entryEffects: fromEffects.CartEntryEffects;
  let actions$: Observable<Action>;

  let mockCartModification: Required<CartModification>;
  const userId = 'testUserId';
  const cartId = 'testCartId';

  beforeEach(() => {
    mockCartModification = {
      deliveryModeChanged: true,
      entry: {},
      quantity: 1,
      quantityAdded: 1,
      statusCode: 'statusCode',
      statusMessage: 'statusMessage',
    };

    const mockCartEntryConnector: Partial<CartEntryConnector> = {
      add: createSpy().and.returnValue(of(mockCartModification)),
      remove: createSpy().and.returnValue(of({})),
      update: createSpy().and.returnValue(of(mockCartModification)),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CartEntryConnector, useValue: mockCartEntryConnector },
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
        userId,
        cartId,
        productCode: 'testProductCode',
        ...mockCartModification,
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
        entryNumber: 'testEntryNumber',
      });
      const completion = new CartActions.CartRemoveEntrySuccess({
        userId,
        cartId,
        entryNumber: 'testEntryNumber',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.removeEntry$).toBeObservable(expected);
    });
  });

  describe('updateEntry$', () => {
    it('should update an entry', () => {
      const payload = {
        userId: userId,
        cartId: cartId,
        entryNumber: 'testEntryNumber',
        quantity: 1,
      };
      const action = new CartActions.CartUpdateEntry(payload);
      const completion = new CartActions.CartUpdateEntrySuccess(payload);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.updateEntry$).toBeObservable(expected);
    });
  });
});
