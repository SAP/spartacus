import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { cold, hot } from 'jasmine-marbles';

import * as fromActions from '../actions/billing-countries.action';

import { BillingCountriesEffect } from './billing-countries.effect';
import { Country, CountryType } from '../../../model/address.model';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { SiteAdapter } from '../../../site-context/connectors/site.adapter';

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
  let service: SiteConnector;
  let effect: BillingCountriesEffect;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BillingCountriesEffect,
        { provide: SiteAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.get(BillingCountriesEffect);
    service = TestBed.get(SiteConnector);

    spyOn(service, 'getCountries').and.returnValue(of(mockCountries));
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
      expect(service.getCountries).toHaveBeenCalledWith(CountryType.BILLING);
    });
  });
});
