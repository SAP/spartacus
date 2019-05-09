import { createSelector, MemoizedSelector } from '@ngrx/store';

import {
  StateWithProductInterests,
  ProductInterestsState,
} from '../product-interests-state';
import { getProductInterestsState } from './feature.selector';

export const getBackInStockState: MemoizedSelector<
  StateWithProductInterests,
  boolean
> = createSelector(
  getProductInterestsState,
  (state: ProductInterestsState) => state.backInStock
);
