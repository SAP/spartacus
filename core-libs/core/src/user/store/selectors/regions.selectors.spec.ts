import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Region } from '../../../model/address.model';
import { UserActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { UsersSelectors } from '../selectors/index';
import { StateWithUser, USER_FEATURE } from '../user-state';

describe('Regions Selectors', () => {
  let store: Store<StateWithUser>;
  const country = 'CA';
  const mockRegions: Region[] = [
    {
      isocode: 'CA-ON',
      name: 'Ontario',
    },
    {
      isocode: 'CA-QC',
      name: 'Quebec',
    },
  ];
  const mockEmptyRegions: Region[] = [];

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

  describe('getAllRegions', () => {
    it('should return all regions', () => {
      let result: Region[];
      store
        .pipe(select(UsersSelectors.getAllRegions))
        .subscribe((value) => (result = value));

      expect(result).toEqual([]);

      store.dispatch(
        new UserActions.LoadRegionsSuccess({ entities: mockRegions, country })
      );

      expect(result).toEqual(mockRegions);
    });
  });

  describe('getRegionsCountry', () => {
    it('should return regions country', () => {
      let result: string;
      store
        .pipe(select(UsersSelectors.getRegionsCountry))
        .subscribe((value) => (result = value));

      expect(result).toBeNull();
      store.dispatch(
        new UserActions.LoadRegionsSuccess({
          entities: mockEmptyRegions,
          country,
        })
      );
      expect(result).toEqual(country);
    });
  });

  describe('getRegionsLoading', () => {
    it('should return loading state', () => {
      let result: boolean;
      store
        .pipe(select(UsersSelectors.getRegionsLoading))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);
      store.dispatch(new UserActions.LoadRegions(country));
      expect(result).toEqual(true);
    });
  });

  describe('getRegionsLoaded', () => {
    it('should return success state', () => {
      let result: boolean;
      store
        .pipe(select(UsersSelectors.getRegionsLoaded))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);
      store.dispatch(
        new UserActions.LoadRegionsSuccess({
          entities: mockEmptyRegions,
          country,
        })
      );
      expect(result).toEqual(true);
    });
  });
});
