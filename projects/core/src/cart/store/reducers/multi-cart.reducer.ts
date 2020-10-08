import { Cart } from '../../../model/cart.model';
import { LoaderAction } from '../../../state/utils/loader/loader.action';
import { CartActions } from '../actions/index';

export const activeCartInitialState = '';
export const wishListInitialState = '';

export function activeCartReducer(
  state = activeCartInitialState,
  action:
    | CartActions.CartAction
    | CartActions.MultiCartActions
    | CartActions.CartBundleAction
): string {
  switch (action.type) {
    case CartActions.LOAD_CART_SUCCESS:
    case CartActions.CREATE_CART_SUCCESS:
    // point to `temp-${uuid}` cart when we are creating/merging cart
    case CartActions.CREATE_CART:
      if (action?.payload?.extraData?.active) {
        return action.meta.entityId as string;
      } else {
        return state;
      }
    case CartActions.SET_ACTIVE_CART_ID:
      return action.payload;
    case CartActions.REMOVE_CART:
    case CartActions.DELETE_CART_SUCCESS:
      if (action.payload?.cartId === state) {
        return activeCartInitialState;
      }
      return state;
    case CartActions.CLEAR_CART_STATE:
      return activeCartInitialState;
  }
  return state;
}

export const cartEntitiesInitialState = undefined;

export function cartEntitiesReducer(
  state = cartEntitiesInitialState,
  action: LoaderAction
): Cart {
  switch (action.type) {
    case CartActions.LOAD_CART_SUCCESS:
    case CartActions.CREATE_CART_SUCCESS:
    case CartActions.CREATE_WISH_LIST_SUCCESS:
    case CartActions.LOAD_WISH_LIST_SUCCESS:
    case CartActions.SET_TEMP_CART:
      return action.payload.cart;
    case CartActions.GET_BUNDLE_ALLOWED_PRODUCTS_SUCCESS:
      console.log(action);
      return {
        ...state,
        ...{
          entryGroups: [
            ...state.entryGroups,
            { allowedProducts: action.payload },
          ],
        },
      };
  }
  return state;
}

export function wishListReducer(
  state = wishListInitialState,
  action: CartActions.WishListActions | CartActions.ClearCartState
): string {
  switch (action.type) {
    case CartActions.CREATE_WISH_LIST_SUCCESS:
    case CartActions.LOAD_WISH_LIST_SUCCESS:
      return action.meta.entityId as string;
    case CartActions.CLEAR_CART_STATE:
      return wishListInitialState;
  }
  return state;
}

export function cartBundlesReducer(
  state = cartEntitiesInitialState,
  action: LoaderAction
): Cart {
  switch (action.type) {
    case CartActions.LOAD_CART_SUCCESS:
    case CartActions.CREATE_CART_SUCCESS:
    case CartActions.CREATE_WISH_LIST_SUCCESS:
    case CartActions.LOAD_WISH_LIST_SUCCESS:
    case CartActions.SET_TEMP_CART:
      return action.payload.cart;
  }
  return state;
}
