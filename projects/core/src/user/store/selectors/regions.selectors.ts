import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Region } from '../../../model/address.model';
import { StateLoaderSelectors } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { RegionsState, StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

export const getRegionsLoaderState: MemoizedSelector<
  StateWithUser,
  LoaderState<RegionsState>
> = createSelector(getUserState, (state: UserState) => state.regions);

export const getAllRegions: MemoizedSelector<
  StateWithUser,
  Region[]
> = createSelector(
  getRegionsLoaderState,
  (state: LoaderState<RegionsState>) => {
    return StateLoaderSelectors.loaderValueSelector(state).entities;
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
    loaded: StateLoaderSelectors.loaderSuccessSelector(state),
    loading: StateLoaderSelectors.loaderLoadingSelector(state),
    regions: StateLoaderSelectors.loaderValueSelector(state).entities,
    country: StateLoaderSelectors.loaderValueSelector(state).country,
  })
);

export const getRegionsCountry: MemoizedSelector<
  StateWithUser,
  string
> = createSelector(
  getRegionsLoaderState,
  (state: LoaderState<RegionsState>) =>
    StateLoaderSelectors.loaderValueSelector(state).country
);

export const getRegionsLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(getRegionsLoaderState, (state: LoaderState<RegionsState>) =>
  StateLoaderSelectors.loaderLoadingSelector(state)
);

export const getRegionsLoaded: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(getRegionsLoaderState, (state: LoaderState<RegionsState>) =>
  StateLoaderSelectors.loaderSuccessSelector(state)
);
