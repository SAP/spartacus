import { createSelector, MemoizedSelector } from '@ngrx/store';
import { UserState, StateWithUser } from '../user-state';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderValueSelector,
  loaderLoadingSelector,
} from '../../../state/utils/loader/loader.selectors';
import { getUserState } from './feature.selector';
import { ProductInterestSearchResult } from '../../../model/product-interest.model';

export const getInterestsState: MemoizedSelector<
  StateWithUser,
  LoaderState<ProductInterestSearchResult>
> = createSelector(getUserState, (state: UserState) => state.productInterests);

export const getInterests: MemoizedSelector<
  StateWithUser,
  ProductInterestSearchResult
> = createSelector(
  getInterestsState,
  (state: LoaderState<ProductInterestSearchResult>) =>
    loaderValueSelector(state)
);

export const getInterestsLoading: MemoizedSelector<StateWithUser, boolean> =
  createSelector(
    getInterestsState,
    (state: LoaderState<ProductInterestSearchResult>) =>
      loaderLoadingSelector(state)
  );
