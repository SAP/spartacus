import { MemoizedSelector, createSelector } from '@ngrx/store';

import { UserState, RegionsState, StateWithUser } from '../user-state';
import { getUserState } from './feature.selector';
import { Region } from '../../../model/address.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderValueSelector,
  loaderLoadingSelector,
  loaderSuccessSelector,
} from '../../../state/utils/loader/loader.selectors';

export const getRegionsLoaderState: MemoizedSelector<
  StateWithUser,
  LoaderState<RegionsState>
> = createSelector(
  getUserState,
  (state: UserState) => state.regions
);

export const getAllRegions: MemoizedSelector<
  StateWithUser,
  Region[]
> = createSelector(
  getRegionsLoaderState,
  (state: LoaderState<RegionsState>) => {
    return loaderValueSelector(state).entities;
  }
);

export const getRegionsDataAndLoading: MemoizedSelector<
  StateWithUser,
  {
    loaded: boolean;
    loading: boolean;
    regions: Region[];
    country: string;
  }
> = createSelector(
  getRegionsLoaderState,
  (state: LoaderState<RegionsState>) => ({
    loaded: loaderSuccessSelector(state),
    loading: loaderLoadingSelector(state),
    regions: loaderValueSelector(state).entities,
    country: loaderValueSelector(state).country,
  })
);

export const getRegionsCountry: MemoizedSelector<
  StateWithUser,
  string
> = createSelector(
  getRegionsLoaderState,
  (state: LoaderState<RegionsState>) => loaderValueSelector(state).country
);

export const getRegionsLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getRegionsLoaderState,
  (state: LoaderState<RegionsState>) => loaderLoadingSelector(state)
);

export const getRegionsLoaded: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getRegionsLoaderState,
  (state: LoaderState<RegionsState>) => loaderSuccessSelector(state)
);
