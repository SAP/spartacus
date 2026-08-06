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

describe('Districts Selectors', () => {
  let store: Store<StateWithUser>;
  const cityIsocode = 'CN-1101';
  const mockDistricts = [
    { isocode: 'CN-110101', name: 'Dongcheng' },
    { isocode: 'CN-110102', name: 'Xicheng' },
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

  describe('getDistrictsDataAndLoading', () => {
    it('should return districts with loading state', () => {
      let result: any;
      store
        .pipe(select(UsersSelectors.getDistrictsDataAndLoading))
        .subscribe((value) => (result = value));

      expect(result.districts).toEqual([]);
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(false);
      expect(result.cityIsocode).toBeNull();

      store.dispatch(new UserActions.LoadDistricts(cityIsocode));
      expect(result.loading).toEqual(true);

      store.dispatch(
        new UserActions.LoadDistrictsSuccess({
          entities: mockDistricts,
          cityIsocode,
        })
      );
      expect(result.districts).toEqual(mockDistricts);
      expect(result.loaded).toEqual(true);
      expect(result.loading).toEqual(false);
      expect(result.cityIsocode).toEqual(cityIsocode);
    });
  });
});
