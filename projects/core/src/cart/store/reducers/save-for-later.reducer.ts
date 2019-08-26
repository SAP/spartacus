import { CartActions } from '../actions/index';
import { CartState } from '../cart-state';
import { OrderEntry } from '../../../model/order.model';

export const initialState: CartState = {
  content: {},
  entries: {},
  refresh: false,
  cartMergeComplete: false,
};

export function reducer(
  state = initialState,
  action: CartActions.SaveForLaterAction | CartActions.CartEntryAction
): CartState {
  switch (action.type) {
    case CartActions.LOAD_SAVE_FOR_LATER_SUCCESS:
    case CartActions.CREATE_SAVE_FOR_LATER_SUCCESS: {
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
    case CartActions.CART_ADD_ENTRY_SUCCESS: {
      return {
        ...state,
        refresh: true,
      };
    }
  }

  return state;
}
