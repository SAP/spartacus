import { BundleActions } from '../actions/index';
import { SelectedProductsState } from '../bundle-state';

export const initialState: SelectedProductsState = {};

export function selectedProductsReducer(
  state = initialState,
  action:
    | BundleActions.AddProductToBundle
    | BundleActions.RemoveProductFromBundle
): SelectedProductsState {
  switch (action.type) {
    case BundleActions.ADD_PRODUCT_TO_BUNDLE: {
      const { sectionId, bundleId, product, cartId } = action.payload;
      if (
        state?.[cartId]?.[bundleId]?.[sectionId]?.find(
          (item) => item.code === product.code
        )
      )
        return state;
      return {
        ...state,
        [cartId]: {
          ...state?.[cartId],
          [bundleId]: {
            ...state?.[cartId]?.[bundleId],
            [sectionId]: [
              ...(state?.[cartId]?.[bundleId]?.[sectionId] ?? []),
              product,
            ],
          },
        },
      };
    }
    case BundleActions.REMOVE_PRODUCT_FROM_BUNDLE: {
      const { sectionId, bundleId, product, cartId } = action.payload;
      return {
        ...state,
        [cartId]: {
          ...state?.[cartId],
          [bundleId]: {
            ...state?.[cartId]?.[bundleId],
            [sectionId]: [
              ...(state?.[cartId]?.[bundleId]?.[sectionId] ?? []).filter(
                (item) => item.code !== product.code
              ),
            ],
          },
        },
      };
    }
  }

  return state;
}
