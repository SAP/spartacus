import { BundleActions } from '../actions/index';
import { AvailableEntriesState } from '../bundle-state';

export const initialState: AvailableEntriesState = {
  availableEntriesEntities: {}
};

export function availableEntriesReducer(
  state = initialState,
  action: BundleActions.GetBundleAllowedProductsSuccess
): AvailableEntriesState {
  switch (action.type) {
    case BundleActions.GET_BUNDLE_ALLOWED_PRODUCTS_SUCCESS: {
      const availableEntriesEntities = action.payload;
      return {
        ...state, availableEntriesEntities: {
          ...state.availableEntriesEntities,
          [availableEntriesEntities.cartId]: {
            ...state.availableEntriesEntities[availableEntriesEntities.cartId],
            [availableEntriesEntities.entryGroupNumber]: availableEntriesEntities
          }
        }
      }
    }
  }

  return state;
}
