import { OrderEntry } from '../../../model/order.model';
import { CartActions } from '../actions/index';
import { CartState } from '../cart-state';

export const initialState: CartState = {
  content: {},
  entries: {},
  refresh: false,
  cartMergeComplete: false,
};

export function reducer(
  state = initialState,
  action: CartActions.CartAction | CartActions.CartEntryAction
): CartState {
  switch (action.type) {
    case CartActions.MERGE_CART: {
      return {
        ...state,
        cartMergeComplete: false,
      };
    }

    case CartActions.MERGE_CART_SUCCESS: {
      return {
        ...state,
        cartMergeComplete: true,
        refresh: true,
      };
    }

    case CartActions.LOAD_CART_SUCCESS:
    case CartActions.CREATE_CART_SUCCESS: {
      const content = { ...action.payload };
      let entries = {};
      if (content.entries) {
        entries = content.entries.reduce(
          (entryMap: { [code: string]: any }, entry: OrderEntry) => {
            return {
              ...entryMap,
              /*
              If we refresh the page from cart details page, 2 load cart
              Actions gets dispatched. One is non-detail, and the second is detailed.
              In the case where the detailed once get resolved first, we merge the existing
              data with the new data from the response (to not delete existing detailed data).
              */
              [entry.product.code]:
                state.entries && state.entries[entry.product.code]
                  ? {
                      ...state.entries[entry.product.code],
                      ...entry,
                    }
                  : entry,
            };
          },
          {
            ...entries,
          }
        );
        delete content['entries'];
      }
      return {
        ...state,
        content,
        entries,
        refresh: false,
      };
    }

    case CartActions.CART_REMOVE_ENTRY_SUCCESS:
    case CartActions.CART_UPDATE_ENTRY_SUCCESS:
    case CartActions.CART_ADD_ENTRY_SUCCESS:
    case CartActions.ADD_EMAIL_TO_CART_SUCCESS: {
      return {
        ...state,
        refresh: true,
      };
    }

    case CartActions.RESET_CART_DETAILS: {
      return {
        content: {
          guid: state.content.guid,
          code: state.content.code,
          user: state.content.user,
        },
        entries: {},
        refresh: false,
        cartMergeComplete: false,
      };
    }

    case CartActions.CLEAR_CART: {
      return initialState;
    }
  }

  return state;
}
