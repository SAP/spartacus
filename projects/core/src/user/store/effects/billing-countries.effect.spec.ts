import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { cold, hot } from 'jasmine-marbles';

import * as fromActions from '../actions/billing-countries.action';

import { BillingCountriesEffect } from './billing-countries.effect';
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

describe('Billing Countries effect', () => {
  let service: UserPaymentConnector;
  let effect: BillingCountriesEffect;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BillingCountriesEffect,
        { provide: UserPaymentAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.get(BillingCountriesEffect);
    service = TestBed.get(UserPaymentConnector);

    spyOn(service, 'getBillingCountries').and.returnValue(of(mockCountries));
  });

  describe('loadBillingCountries$', () => {
    it('should load the billing countries', () => {
      const action = new fromActions.LoadBillingCountries();
      const completion = new fromActions.LoadBillingCountriesSuccess(
        mockCountries
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadBillingCountries$).toBeObservable(expected);
    });
  });
});
