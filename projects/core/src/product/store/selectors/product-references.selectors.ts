import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ProductReference } from '../../../model/product.model';
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
  (state: ProductsState) => state.references
);

export const getSelectedProductReferencesFactory = (
  productCode: string
): MemoizedSelector<StateWithProduct, ProductReference[]> => {
  return createSelector(
    getProductReferencesState,
    referenceTypeData => {
      if (referenceTypeData.productCode === productCode) {
        return !!referenceTypeData.list ? referenceTypeData.list : [];
      }
    }
  );
};
