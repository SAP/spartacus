import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, select } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import { StateWithUser, USER_FEATURE } from '../user-state';
import { Region } from '../../../model/address.model';

describe('Regions Selectors', () => {
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

  describe('getAllRegions', () => {
    it('should return all regions', () => {
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
      const country = 'CA';

      let result: Region[];
      store
        .pipe(select(fromSelectors.getAllRegions))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(
        new fromActions.LoadRegionsSuccess({ entities: mockRegions, country })
      );

      expect(result).toEqual(mockRegions);
    });
  });

  describe('getRegionsCountry', () => {
    it('should return regions country', () => {
      const mockRegions: Region[] = [];
      const country = 'CA';

      let result: string;
      store
        .pipe(select(fromSelectors.getRegionsCountry))
        .subscribe(value => (result = value));

      expect(result).toBeNull();
      store.dispatch(
        new fromActions.LoadRegionsSuccess({ entities: mockRegions, country })
      );
      expect(result).toEqual(country);
    });
  });

  describe('getRegionsLoading', () => {
    it('should return loading state', () => {
      const country = 'CA';

      let result: boolean;
      store
        .pipe(select(fromSelectors.getRegionsLoading))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);
      store.dispatch(new fromActions.LoadRegions(country));
      expect(result).toEqual(true);
    });
  });

  describe('getRegionsLoaded', () => {
    it('should return success state', () => {
      const mockRegions: Region[] = [];
      const country = 'CA';

      let result: boolean;
      store
        .pipe(select(fromSelectors.getRegionsLoaded))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);
      store.dispatch(
        new fromActions.LoadRegionsSuccess({ entities: mockRegions, country })
      );
      expect(result).toEqual(true);
    });
  });
});
