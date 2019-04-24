import { createSelector, MemoizedSelector } from '@ngrx/store';

import { UserState, StateWithUser } from '../user-state';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderValueSelector,
  loaderSuccessSelector,
} from '../../../state/utils/loader/loader.selectors';

import { getUserState } from './feature.selector';
import { ProductInterestList } from '../../model/product-interest.model';

export const getInterestsState: MemoizedSelector<
  StateWithUser,
  LoaderState<ProductInterestList>
> = createSelector(
  getUserState,
  (state: UserState) => state.productInterests
);

export const getInterestsLoaded: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getInterestsState,
  (state: LoaderState<ProductInterestList>) => loaderSuccessSelector(state)
);

export const getInterests: MemoizedSelector<
  StateWithUser,
  ProductInterestList
> = createSelector(
  getInterestsState,
  (state: LoaderState<ProductInterestList>) => loaderValueSelector(state)
);
