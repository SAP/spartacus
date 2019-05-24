import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { cold, hot } from 'jasmine-marbles';

import * as fromActions from './../actions';

import { DeliveryCountriesEffects } from './delivery-countries.effect';
import { Country } from '../../../model/address.model';
import { UserPaymentConnector } from '../../connectors/payment/user-payment.connector';
import { UserPaymentAdapter } from '@spartacus/core';

const mockCountries: Country[] = [
  {
    isocode: 'AL',
    name: 'Albania',
  },
  {
    isocode: 'AD',
    name: 'Andorra',
  },
];

describe('Delivery Countries effect', () => {
  let service: UserPaymentConnector;
  let effect: DeliveryCountriesEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeliveryCountriesEffects,
        { provide: UserPaymentAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.get(DeliveryCountriesEffects);
    service = TestBed.get(UserPaymentConnector);

    spyOn(service, 'getDeliveryCountries').and.returnValue(of(mockCountries));
  });

  describe('loadDeliveryCountries$', () => {
    it('should load the delivery countries', () => {
      const action = new fromActions.LoadDeliveryCountries();
      const completion = new fromActions.LoadDeliveryCountriesSuccess(
        mockCountries
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadDeliveryCountries$).toBeObservable(expected);
    });
  });
});
