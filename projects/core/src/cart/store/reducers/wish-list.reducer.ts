import { CartActions } from '../actions';

export const initialState = '';

export function wishListReducer(
  state = initialState,
  action: CartActions.WishListActions
): string {
  switch (action.type) {
    case CartActions.CREATE_WISH_LIST_SUCCESS:
    case CartActions.LOAD_WISH_LIST_SUCCESS:
      return action.meta.entityId as string;
  }
  return state;
}
