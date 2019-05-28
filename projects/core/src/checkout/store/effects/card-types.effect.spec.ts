import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import { cold, hot } from 'jasmine-marbles';

import * as fromActions from './../actions/index';

import { CardTypesEffects } from '.';
import {
  CardType,
  CheckoutPaymentAdapter,
  CheckoutPaymentConnector,
} from '@spartacus/core';

const mockCardTypes: CardType[] = [
  {
    code: 'amex',
    name: 'American Express',
  },
  {
    code: 'maestro',
    name: 'Maestro',
  },
];

describe('Card Types effect', () => {
  let service: CheckoutPaymentConnector;
  let effect: CardTypesEffects;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardTypesEffects,
        { provide: CheckoutPaymentAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.get(CardTypesEffects);
    service = TestBed.get(CheckoutPaymentConnector);

    spyOn(service, 'getCardTypes').and.returnValue(of(mockCardTypes));
  });

  describe('loadCardTypes$', () => {
    it('should load the card types', () => {
      const action = new fromActions.LoadCardTypes();
      const completion = new fromActions.LoadCardTypesSuccess(mockCardTypes);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadCardTypes$).toBeObservable(expected);
    });
  });
});
