import { OrderEntry } from '../../../model/order.model';
import { CartState } from '../cart-state';
import * as fromAction from './../actions';
export const initialState: CartState = {
  content: {},
  entries: {},
  refresh: false,
  cartMergeComplete: false,
  appliedVouchers: [],
};

export function reducer(
  state = initialState,
  action:
    | fromAction.CartAction
    | fromAction.CartEntryAction
    | fromAction.CartVoucherAction
): CartState {
  switch (action.type) {
    case fromAction.MERGE_CART: {
      return {
        ...state,
        cartMergeComplete: false,
      };
    }

    case fromAction.MERGE_CART_SUCCESS: {
      return {
        ...state,
        cartMergeComplete: true,
        refresh: true,
      };
    }

    case fromAction.LOAD_CART_SUCCESS:
    case fromAction.CREATE_CART_SUCCESS: {
      const content = { ...action.payload };
      const appliedVouchers = action.payload.appliedVouchers || [];
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
        appliedVouchers,
      };
    }

    case fromAction.ADD_CART_VOUCHER_SUCCESS:
    case fromAction.REMOVE_CART_VOUCHER_SUCCESS:
    case fromAction.REMOVE_ENTRY_SUCCESS:
    case fromAction.UPDATE_ENTRY_SUCCESS:
    case fromAction.ADD_ENTRY_SUCCESS: {
      return {
        ...state,
        refresh: true,
      };
    }
  }

  return state;
}
