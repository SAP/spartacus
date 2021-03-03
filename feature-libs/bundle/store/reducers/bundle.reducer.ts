import { BundleActions } from '../actions/index';
import { BundleState } from '../bundle-state';

export const initialState: BundleState = {
  bundleEntities: {},
};

export function bundleReducer(
  state = initialState,
  action: BundleActions.GetBundleAllowedProductsSuccess
): BundleState {
  switch (action.type) {
    case BundleActions.GET_BUNDLE_ALLOWED_PRODUCTS_SUCCESS: {
      const products = action.payload;

      return { ...state, products };
    }
  }
}
