import { ProductReference } from '../../../model/product.model';
import { ProductActions } from '../actions/index';
import { ProductReferencesState } from '../product-state';

export const initialState: ProductReferencesState = {
  productCode: '',
  list: [],
};

export function reducer(
  state = initialState,
  action: ProductActions.ProductReferencesAction
): ProductReferencesState {
  switch (action.type) {
    case ProductActions.LOAD_PRODUCT_REFERENCES_SUCCESS: {
      const productCode = action.payload.productCode;
      const list = action.payload.list;

      return {
        ...state,
        list,
        productCode,
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
