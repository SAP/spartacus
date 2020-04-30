import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { Country, CountryType } from '../../../model/address.model';
import { SiteAdapter } from '../../../site-context/connectors/site.adapter';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { UserActions } from '../actions/index';
import { DeliveryCountriesEffects } from './delivery-countries.effect';

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
  let service: SiteConnector;
  let effect: DeliveryCountriesEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeliveryCountriesEffects,
        { provide: SiteAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.inject(DeliveryCountriesEffects);
    service = TestBed.inject(SiteConnector);

    spyOn(service, 'getCountries').and.returnValue(of(mockCountries));
  });

  describe('loadDeliveryCountries$', () => {
    it('should load the delivery countries', () => {
      const action = new UserActions.LoadDeliveryCountries();
      const completion = new UserActions.LoadDeliveryCountriesSuccess(
        mockCountries
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadDeliveryCountries$).toBeObservable(expected);
      expect(service.getCountries).toHaveBeenCalledWith(CountryType.SHIPPING);
    });
  });
});
