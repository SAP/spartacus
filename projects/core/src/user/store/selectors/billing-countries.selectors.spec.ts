import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, select } from '@ngrx/store';

import * as fromActions from '../actions/billing-countries.action';
import * as fromReducers from '../reducers/index';
import * as fromSelectors from '../selectors/billing-countries.selectors';
import { Country } from '../../../occ/occ-models/index';
import { UserState, USER_FEATURE } from '../user-state';

describe('Billing Countries Selectors', () => {
  let store: Store<UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAllBillingCountries', () => {
    it('should return all billing countries', () => {
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

      let result: Country[];
      store
        .pipe(select(fromSelectors.getAllBillingCountries))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(
        new fromActions.LoadBillingCountriesSuccess(mockCountries)
      );

      expect(result).toEqual(mockCountries);
    });
  });
});
