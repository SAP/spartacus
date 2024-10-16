import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { CartModification } from '@spartacus/cart/base/root';
import { OccConfig } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CartEntryGroupConnector } from '../../connectors/entrygroup/cart-entrygroup.connector';
import { CartActions } from '../actions/index';
import * as fromEffects from './cart-entrygroup.effect';
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
  let entryEffects: fromEffects.CartEntryGroupEffects;
  let actions$: Observable<Action>;
  let mockCartModification: Required<CartModification>;

  const userId = 'testUserId';
  const cartId = 'testCartId';
  const entryGroupNumber = 1;

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
      addTo: createSpy().and.returnValue(of(mockCartModification)),
      remove: createSpy().and.returnValue(of({})),
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

  describe('removeEntryGroup$', () => {
    it('should remove an entry group', () => {
      const action = new CartActions.CartRemoveEntryGroup({
        userId,
        cartId,
        entryGroupNumber,
      });
      const completion = new CartActions.CartRemoveEntryGroupSuccess({
        userId,
        cartId,
        entryGroupNumber,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.removeEntryGroup$).toBeObservable(expected);
    });
  });

  describe('addToEntryGroup$', () => {
    it('should add to an entry group', () => {
      const action = new CartActions.CartAddToEntryGroup({
        userId,
        cartId,
        entryGroupNumber,
        productCode: 'testProductCode',
        quantity: 1,
      });
      const completion = new CartActions.CartAddToEntryGroupSuccess({
        userId,
        cartId,
        entryGroupNumber,
        productCode: 'testProductCode',
        ...mockCartModification,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.addToEntryGroup$).toBeObservable(expected);
    });
  });
});
