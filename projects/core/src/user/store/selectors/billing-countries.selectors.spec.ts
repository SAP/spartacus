import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Country } from '../../../model/address.model';
import * as fromActions from '../actions/billing-countries.action';
import * as fromReducers from '../reducers/index';
import { UsersSelectors } from '../selectors/index';
import { StateWithUser, USER_FEATURE } from '../user-state';

describe('Billing Countries Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAllBillingCountries', () => {
    it('should return all billing countries', () => {
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

      let result: Country[];
      store
        .pipe(select(UsersSelectors.getAllBillingCountries))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(
        new fromActions.LoadBillingCountriesSuccess(mockCountries)
      );

      expect(result).toEqual(mockCountries);
    });
  });
});
