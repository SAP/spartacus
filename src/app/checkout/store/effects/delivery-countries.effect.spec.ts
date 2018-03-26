import { TestBed } from '@angular/core/testing';
import { DeliveryCountriesEffects } from '.';
import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';
import { OccMiscsService } from '../../../occ/miscs/miscs.service';

@Injectable()
export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

class MockMiscsService {
  loadDeliveryCountries() {}
}

const mockCountriesList = {
  countries: [
    {
      isocode: 'AL',
      name: 'Albania'
    },
    {
      isocode: 'AD',
      name: 'Andorra'
    }
  ]
};

describe('Delivery Countries effect', () => {
  let service: OccMiscsService;
  let effect: DeliveryCountriesEffects;
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeliveryCountriesEffects,
        { provide: OccMiscsService, useClass: MockMiscsService },
        { provide: Actions, useFactory: getActions }
      ]
    });

    effect = TestBed.get(DeliveryCountriesEffects);
    service = TestBed.get(OccMiscsService);
    actions$ = TestBed.get(Actions);

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

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadDeliveryCountries$).toBeObservable(expected);
    });
  });
});
