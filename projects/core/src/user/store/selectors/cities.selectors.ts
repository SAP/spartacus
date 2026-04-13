/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { CitiesState, StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

export const getCitiesLoaderState: MemoizedSelector<
  StateWithUser,
  LoaderState<CitiesState>
> = createSelector(getUserState, (state: UserState) => state.cities);

export const getCitiesDataAndLoading: MemoizedSelector<
  StateWithUser,
  {
    loaded: boolean;
    loading: boolean;
    cities: { isocode?: string; name?: string }[];
    regionIsocode: string | null;
  }
> = createSelector(getCitiesLoaderState, (state: LoaderState<CitiesState>) => ({
  loaded: StateUtils.loaderSuccessSelector(state),
  loading: StateUtils.loaderLoadingSelector(state),
  cities: StateUtils.loaderValueSelector(state).entities,
  regionIsocode: StateUtils.loaderValueSelector(state).regionIsocode,
}));
