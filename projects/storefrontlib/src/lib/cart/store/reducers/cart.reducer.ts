import * as fromAction from './../actions';

export interface CartState {
  content: any;
  entries: { [code: string]: any };
  refresh: boolean;
  isLoading: boolean;
  isLoaded: boolean;
}

export const initialState: CartState = {
  content: {},
  entries: {},
  refresh: false,
  isLoading: false,
  isLoaded: false
};

export function reducer(
  state = initialState,
  action: fromAction.CartAction | fromAction.CartEntryAction
): CartState {
  switch (action.type) {
    case fromAction.LOAD_CART: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false
      };
    }

    case fromAction.LOAD_CART_SUCCESS:
    case fromAction.CREATE_CART_SUCCESS: {
      const content = { ...action.payload };
      let entries = {};
      if (content.entries) {
        entries = content.entries.reduce(
          (entryMap: { [code: string]: any }, entry: any) => {
            return {
              ...entryMap,
              [entry.product.code]: entry
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
        isLoading: false,
        isLoaded: true
      };
    }

    case fromAction.REMOVE_ENTRY_SUCCESS:
    case fromAction.UPDATE_ENTRY_SUCCESS:
    case fromAction.ADD_ENTRY_SUCCESS: {
      return {
        ...state,
        refresh: true,
        isLoading: false,
        isLoaded: true
      };
    }
  }

  return state;
}

export const getCartContent = (state: CartState) => state.content;
export const getRefresh = (state: CartState) => state.refresh;
export const getEntries = (state: CartState) => state.entries;
export const getIsLoading = (state: CartState) => state.isLoading;
export const getIsLoaded = (state: CartState) => state.isLoaded;
