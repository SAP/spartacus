/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { City } from '../../../model/address.model';
import { StateUtils } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { CitiesState, StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

export const getCitiesLoaderState: MemoizedSelector<
  StateWithUser,
  LoaderState<CitiesState>
> = createSelector(
  getUserState,
  (state: UserState) => state.cities ?? StateUtils.initialLoaderState
);

export const getCitiesDataAndLoading: MemoizedSelector<
  StateWithUser,
  {
    loaded: boolean;
    loading: boolean;
    cities: City[];
    regionIsocode: string | null;
  }
> = createSelector(getCitiesLoaderState, (state: LoaderState<CitiesState>) => ({
  loaded: StateUtils.loaderSuccessSelector(state),
  loading: StateUtils.loaderLoadingSelector(state),
  cities: StateUtils.loaderValueSelector(state)?.entities ?? [],
  regionIsocode: StateUtils.loaderValueSelector(state)?.regionIsocode ?? null,
}));
