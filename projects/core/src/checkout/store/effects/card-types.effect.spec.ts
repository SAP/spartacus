import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {
  CardType,
  CheckoutPaymentAdapter,
  CheckoutPaymentConnector,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CheckoutActions } from '../actions/index';
import { CardTypesEffects } from './card-types.effect';

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

    effect = TestBed.inject(CardTypesEffects);
    service = TestBed.inject(CheckoutPaymentConnector);

    spyOn(service, 'getCardTypes').and.returnValue(of(mockCardTypes));
  });

  describe('loadCardTypes$', () => {
    it('should load the card types', () => {
      const action = new CheckoutActions.LoadCardTypes();
      const completion = new CheckoutActions.LoadCardTypesSuccess(
        mockCardTypes
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadCardTypes$).toBeObservable(expected);
    });
  });
});
