import * as fromStoreFinder from '../actions/view-all-stores.action';

export interface ViewAllStoresState {
  viewAllStoresEntities: any;
}

export const initialState: ViewAllStoresState = {
  viewAllStoresEntities: {}
};

export function reducer(
  state = initialState,
  action: fromStoreFinder.ViewAllStoresAction
): ViewAllStoresState {
  switch (action.type) {
    case fromStoreFinder.VIEW_ALL_STORES_SUCCESS: {
      const viewAllStoresEntities = action.payload;

      return {
        ...state,
        viewAllStoresEntities
      };
    }
    case fromStoreFinder.VIEW_ALL_STORES_FAIL: {
      return {
        ...state
      };
    }
  }

  return state;
}

export const getViewAllStoresEntities = (state: ViewAllStoresState) =>
  state.viewAllStoresEntities;
