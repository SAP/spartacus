import { TestBed } from '@angular/core/testing';
import { DeliveryCountriesEffects } from './delivery-countries.effect';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';
import { OccMiscsService } from '../../../occ/miscs/miscs.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { Country } from '../../../occ-models';

class MockMiscsService {
  loadDeliveryCountries() {}
}

const mockCountries: Country[] = [
  {
    isocode: 'AL',
    name: 'Albania'
  },
  {
    isocode: 'AD',
    name: 'Andorra'
  }
];

const mockCountriesList = {
  countries: mockCountries
};

describe('Delivery Countries effect', () => {
  let service: OccMiscsService;
  let effect: DeliveryCountriesEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeliveryCountriesEffects,
        { provide: OccMiscsService, useClass: MockMiscsService },
        provideMockActions(() => actions$)
      ]
    });

    effect = TestBed.get(DeliveryCountriesEffects);
    service = TestBed.get(OccMiscsService);

    spyOn(service, 'loadDeliveryCountries').and.returnValue(
      of(mockCountriesList)
    );
  });

  describe('loadDeliveryCountries$', () => {
    it('should load the delivery countries', () => {
      const action = new fromActions.LoadDeliveryCountries();
      const completion = new fromActions.LoadDeliveryCountriesSuccess(
        mockCountriesList.countries
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadDeliveryCountries$).toBeObservable(expected);
    });
  });
});
