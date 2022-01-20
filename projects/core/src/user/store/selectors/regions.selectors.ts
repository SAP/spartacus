import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Region } from '../../../model/address.model';
import { StateUtils } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { RegionsState, StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

export const getRegionsLoaderState: MemoizedSelector<
  StateWithUser,
  LoaderState<RegionsState>
> = createSelector(getUserState, (state: UserState) => state.regions);

export const getAllRegions: MemoizedSelector<StateWithUser, Region[]> =
  createSelector(getRegionsLoaderState, (state: LoaderState<RegionsState>) => {
    return StateUtils.loaderValueSelector(state).entities;
  });

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
    loaded: StateUtils.loaderSuccessSelector(state),
    loading: StateUtils.loaderLoadingSelector(state),
    regions: StateUtils.loaderValueSelector(state).entities,
    country: StateUtils.loaderValueSelector(state).country,
  })
);

export const getRegionsCountry: MemoizedSelector<StateWithUser, string> =
  createSelector(
    getRegionsLoaderState,
    (state: LoaderState<RegionsState>) =>
      StateUtils.loaderValueSelector(state).country
  );

export const getRegionsLoading: MemoizedSelector<StateWithUser, boolean> =
  createSelector(getRegionsLoaderState, (state: LoaderState<RegionsState>) =>
    StateUtils.loaderLoadingSelector(state)
  );

export const getRegionsLoaded: MemoizedSelector<StateWithUser, boolean> =
  createSelector(getRegionsLoaderState, (state: LoaderState<RegionsState>) =>
    StateUtils.loaderSuccessSelector(state)
  );
