import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { Country, CountryType } from '../../../model/address.model';
import { SiteAdapter } from '../../../site-context/connectors/site.adapter';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { UserActions } from '../actions/index';
import { BillingCountriesEffect } from './billing-countries.effect';

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

    effect = TestBed.inject(BillingCountriesEffect);
    service = TestBed.inject(SiteConnector);

    spyOn(service, 'getCountries').and.returnValue(of(mockCountries));
  });

  describe('loadBillingCountries$', () => {
    it('should load the billing countries', () => {
      const action = new UserActions.LoadBillingCountries();
      const completion = new UserActions.LoadBillingCountriesSuccess(
        mockCountries
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadBillingCountries$).toBeObservable(expected);
      expect(service.getCountries).toHaveBeenCalledWith(CountryType.BILLING);
    });
  });
});
