import * as fromStoreFinder from '../actions/view-all-stores.action';

export interface ViewAllStoresState {
  viewAllStoresEntities: any;
  isLoading?: boolean;
}

export const initialState: ViewAllStoresState = {
  viewAllStoresEntities: {},
  isLoading: false
};

export function reducer(
  state = initialState,
  action: fromStoreFinder.ViewAllStoresAction
): ViewAllStoresState {
  switch (action.type) {
    case fromStoreFinder.VIEW_ALL_STORES: {
      return {
        ...state,
        isLoading: true
      };
    }
    case fromStoreFinder.VIEW_ALL_STORES_SUCCESS: {
      const viewAllStoresEntities = action.payload;

      return {
        ...state,
        viewAllStoresEntities,
        isLoading: false
      };
    }
    case fromStoreFinder.VIEW_ALL_STORES_FAIL: {
      return {
        ...state,
        isLoading: false
      };
    }
  }

  return state;
}

export const getViewAllStoresEntities = (state: ViewAllStoresState) =>
  state.viewAllStoresEntities;
export const getViewAllStoresLoading = (state: ViewAllStoresState) =>
  state.isLoading;
