/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CityDistrict } from '../../../model/address.model';
import { StateUtils } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { DistrictsState, StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

export const getDistrictsLoaderState: MemoizedSelector<
  StateWithUser,
  LoaderState<DistrictsState>
> = createSelector(getUserState, (state: UserState) => state.districts);

export const getDistrictsDataAndLoading: MemoizedSelector<
  StateWithUser,
  {
    loaded: boolean;
    loading: boolean;
    districts: CityDistrict[];
    cityIsocode: string | null;
  }
> = createSelector(
  getDistrictsLoaderState,
  (state: LoaderState<DistrictsState>) => ({
    loaded: StateUtils.loaderSuccessSelector(state),
    loading: StateUtils.loaderLoadingSelector(state),
    districts: StateUtils.loaderValueSelector(state).entities,
    cityIsocode: StateUtils.loaderValueSelector(state).cityIsocode,
  })
);
