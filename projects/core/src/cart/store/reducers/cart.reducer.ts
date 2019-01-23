import * as fromAction from './../actions';
import { OrderEntry } from '../../../occ/occ-models/index';
import { CartState } from '../cart-state';

export const initialState: CartState = {
  content: {},
  entries: {},
  refresh: false,
  loaded: false,
  cartMergeComplete: false
};

export function reducer(
  state = initialState,
  action: fromAction.CartAction | fromAction.CartEntryAction
): CartState {
  switch (action.type) {
    case fromAction.MERGE_CART: {
      return {
        ...state,
        cartMergeComplete: false
      };
    }

    case fromAction.MERGE_CART_SUCCESS: {
      return {
        ...state,
        cartMergeComplete: true
      };
    }

    case fromAction.LOAD_CART_SUCCESS:
    case fromAction.CREATE_CART_SUCCESS: {
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
              [entry.product.code]: state.entries[entry.product.code]
                ? {
                    ...state.entries[entry.product.code],
                    ...entry
                  }
                : entry
            };
          },
          {
            ...entries
          }
        );
        delete content['entries'];
      }
      return {
        ...state,
        content,
        entries,
        refresh: false,
        loaded: true
      };
    }

    case fromAction.REMOVE_ENTRY_SUCCESS:
    case fromAction.UPDATE_ENTRY_SUCCESS:
    case fromAction.ADD_ENTRY_SUCCESS: {
      return {
        ...state,
        refresh: true
      };
    }

    case fromAction.REMOVE_ENTRY:
    case fromAction.ADD_ENTRY:
    case fromAction.LOAD_CART:
    case fromAction.CREATE_CART:
      return {
        ...state,
        loaded: false
      };
  }

  return state;
}
