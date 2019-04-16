import { ProductReference } from '../../../occ/occ-models';
import * as fromProductReferences from '../actions/product-references.action';
import { ProductReferencesState } from '../product-state';

export const initialState: ProductReferencesState = {
  productCode: '',
  list: [],
};

export function reducer(
  state = initialState,
  action: fromProductReferences.ProductReferencesAction
): ProductReferencesState {
  switch (action.type) {
    case fromProductReferences.LOAD_PRODUCT_REFERENCES_SUCCESS: {
      const productCode = action.payload.productCode;
      const list = action.payload.list;

      return {
        ...state,
        productCode,
        list,
      };
    }
  }

  return state;
}

export const getProductReferenceList = (
  state: ProductReferencesState
): ProductReference[] => state.list;
export const getProductReferenceProductCode = (
  state: ProductReferencesState
): string => state.productCode;
