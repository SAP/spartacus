import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { CartModification } from '@spartacus/cart/base/root';
import { OccConfig } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CartEntryGroupConnector } from '../../connectors/entry-group/cart-entry-group.connector';
import { CartActions } from '../actions/index';
import * as fromEffects from './cart-entry-group.effect';
import createSpy = jasmine.createSpy;

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};
const entry = { orderCode: '1' };
const entryGroupNumber = 1;

describe('Cart effect', () => {
  let entryEffects: fromEffects.CartEntryGroupEffects;
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

    const mockCartEntryGroupConnector: Partial<CartEntryGroupConnector> = {
      addToEntryGroup: createSpy().and.returnValue(of(mockCartModification)),
      removeEntryGroup: createSpy().and.returnValue(of({})),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: CartEntryGroupConnector,
          useValue: mockCartEntryGroupConnector,
        },
        fromEffects.CartEntryGroupEffects,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        provideMockActions(() => actions$),
      ],
    });

    entryEffects = TestBed.inject(fromEffects.CartEntryGroupEffects);
  });

  describe('addToEntryGroup$', () => {
    it('should add an entry', () => {
      const action = new CartActions.AddToEntryGroup({
        userId: userId,
        cartId: cartId,
        entry,
        entryGroupNumber,
        quantity: 1,
      });
      const completion = new CartActions.AddToEntryGroupSuccess({
        userId,
        cartId,
        entryGroupNumber,
        ...mockCartModification,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.addToEntryGroup$).toBeObservable(expected);
    });
  });

  describe('removeEntryGroup$', () => {
    it('should remove an entry', () => {
      const action = new CartActions.RemoveEntryGroup({
        userId: userId,
        cartId: cartId,
        entryGroupNumber,
      });
      const completion = new CartActions.RemoveEntryGroupSuccess({
        userId,
        cartId,
        entryGroupNumber,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.removeEntryGroup$).toBeObservable(expected);
    });
  });
});
