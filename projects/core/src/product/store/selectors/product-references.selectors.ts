import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ProductReference } from '../../../occ/occ-models/occ.models';
import {
  ProductReferencesState,
  ProductsState,
  StateWithProduct,
} from '../product-state';
import { getProductsState } from './feature.selector';

export const getProductReferencesState: MemoizedSelector<
  StateWithProduct,
  ProductReferencesState
> = createSelector(
  getProductsState,
  (state: ProductsState) => state.productReferences
);

export const getSelectedProductReferencesFactory = (
  productCode
): MemoizedSelector<StateWithProduct, ProductReference[]> => {
  return createSelector(
    getProductReferencesState,
    referenceTypeData => {
      if (referenceTypeData.productCode === productCode) {
        return referenceTypeData.list;
      }
    }
  );
};
