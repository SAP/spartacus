import * as fromAction from './../actions';
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
  action: fromAction.SaveForLaterAction | fromAction.CartEntryAction
): CartState {
  switch (action.type) {
    case fromAction.LOAD_SAVE_FOR_LATER_SUCCESS:
    case fromAction.CREATE_SAVE_FOR_LATER_SUCCESS: {
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
