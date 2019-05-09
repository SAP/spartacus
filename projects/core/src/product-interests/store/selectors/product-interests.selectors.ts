import { createSelector, MemoizedSelector } from '@ngrx/store';

import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderValueSelector,
  loaderSuccessSelector,
} from '../../../state/utils/loader/loader.selectors';

import { ProductInterestList } from '../../model/product-interest.model';
import {
  StateWithProductInterests,
  ProductInterestsState,
} from '../product-interests-state';
import { getProductInterestsState } from './feature.selector';

export const getInterestsState: MemoizedSelector<
  StateWithProductInterests,
  LoaderState<ProductInterestList>
> = createSelector(
  getProductInterestsState,
  (state: ProductInterestsState) => state.interests
);

export const getInterestsLoaded: MemoizedSelector<
  StateWithProductInterests,
  boolean
> = createSelector(
  getInterestsState,
  (state: LoaderState<ProductInterestList>) => loaderSuccessSelector(state)
);

export const getInterests: MemoizedSelector<
  StateWithProductInterests,
  ProductInterestList
> = createSelector(
  getInterestsState,
  (state: LoaderState<ProductInterestList>) => loaderValueSelector(state)
);
