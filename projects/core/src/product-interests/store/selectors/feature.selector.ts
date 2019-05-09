import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';
import {
  StateWithProductInterests,
  ProductInterestsState,
  PRODUCT_INTERESTS_FEATURE,
} from '../product-interests-state';

export const getProductInterestsState: MemoizedSelector<
  StateWithProductInterests,
  ProductInterestsState
> = createFeatureSelector<ProductInterestsState>(PRODUCT_INTERESTS_FEATURE);
