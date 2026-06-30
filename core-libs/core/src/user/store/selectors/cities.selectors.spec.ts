/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { UserActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { UsersSelectors } from '../selectors/index';
import { StateWithUser, USER_FEATURE } from '../user-state';

describe('Cities Selectors', () => {
  let store: Store<StateWithUser>;
  const regionIsocode = 'CN-11';
  const mockCities = [
    { isocode: 'CN-1101', name: 'Beijing' },
    { isocode: 'CN-1102', name: 'Tianjin' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers()),
      ],
    });
    store = TestBed.inject(Store);
    vi.spyOn(store, 'dispatch');
  });

  describe('getCitiesDataAndLoading', () => {
    it('should return cities with loading state', () => {
      let result: any;
      store
        .pipe(select(UsersSelectors.getCitiesDataAndLoading))
        .subscribe((value) => (result = value));

      expect(result.cities).toEqual([]);
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(false);
      expect(result.regionIsocode).toBeNull();

      store.dispatch(new UserActions.LoadCities(regionIsocode));
      expect(result.loading).toEqual(true);

      store.dispatch(
        new UserActions.LoadCitiesSuccess({
          entities: mockCities,
          regionIsocode,
        })
      );
      expect(result.cities).toEqual(mockCities);
      expect(result.loaded).toEqual(true);
      expect(result.loading).toEqual(false);
      expect(result.regionIsocode).toEqual(regionIsocode);
    });
  });
});
