import { createSelector, MemoizedSelector } from '@ngrx/store';

import { ProductInterestSearchResult } from '../../../model/product-interest.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderLoadingSelector,
  loaderValueSelector,
} from '../../../state/utils/loader/loader.selectors';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

export const getInterestsState: MemoizedSelector<
  StateWithUser,
  LoaderState<ProductInterestSearchResult>
> = createSelector(
  getUserState,
  (state: UserState) => state.productInterests
);

export const getInterests: MemoizedSelector<
  StateWithUser,
  ProductInterestSearchResult
> = createSelector(
  getInterestsState,
  (state: LoaderState<ProductInterestSearchResult>) =>
    loaderValueSelector(state)
);

export const getInterestsLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getInterestsState,
  (state: LoaderState<ProductInterestSearchResult>) =>
    loaderLoadingSelector(state)
);
