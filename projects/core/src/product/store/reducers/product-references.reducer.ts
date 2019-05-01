import { UIProductReferenceList } from '../../model/product-reference-list';
import * as fromProductReferences from '../actions/product-references.action';
import { ProductReferencesState } from '../product-state';

export const initialState: ProductReferencesState = {
  productCode: '',
  list: {},
};

export function reducer(
  state = initialState,
  action: fromProductReferences.ProductReferencesAction
): ProductReferencesState {
  switch (action.type) {
    case fromProductReferences.LOAD_PRODUCT_REFERENCES_SUCCESS: {
      const productCode = action.payload.productCode;
      const data = action.payload.list;

      return {
        ...state,
        list: data,
        productCode,
      };
    }
  }

  return state;
}

export const getProductReferenceList = (
  state: ProductReferencesState
): UIProductReferenceList => state.list;
export const getProductReferenceProductCode = (
  state: ProductReferencesState
): string => state.productCode;
