import { createSelector, MemoizedSelector } from '@ngrx/store';
import { UIProductReference } from '../../model/product-reference-list';
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
): MemoizedSelector<StateWithProduct, UIProductReference[]> => {
  return createSelector(
    getProductReferencesState,
    referenceTypeData => {
      if (referenceTypeData.productCode === productCode) {
        console.log('ref code', referenceTypeData.productCode);
        console.log('real product code', productCode);
        return referenceTypeData.list;
      }
    }
  );
};
