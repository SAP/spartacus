import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Country } from '../../../model/address.model';
import { UserActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { UsersSelectors } from '../selectors/index';
import { StateWithUser, USER_FEATURE } from '../user-state';

describe('Delivery Countries Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAllDeliveryCountries', () => {
    it('should return all delivery countries', () => {
      const mockCountries: Country[] = [
        {
          isocode: 'AD',
          name: 'Andorra',
        },
        {
          isocode: 'CA',
          name: 'Canada',
        },
      ];

      let result: Country[];
      store
        .pipe(select(UsersSelectors.getAllDeliveryCountries))
        .subscribe((value) => (result = value));

      expect(result).toEqual([]);

      store.dispatch(
        new UserActions.LoadDeliveryCountriesSuccess(mockCountries)
      );

      expect(result).toEqual(mockCountries);
    });
  });

  describe('countrySelectorFactory', () => {
    it('should return title', () => {
      const isocode = 'AL';
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

      let result;

      store
        .pipe(select(UsersSelectors.countrySelectorFactory(isocode)))
        .subscribe((value) => (result = value));

      store.dispatch(
        new UserActions.LoadDeliveryCountriesSuccess(mockCountries)
      );
      expect(result).toEqual(mockCountries[0]);
    });
  });
});
