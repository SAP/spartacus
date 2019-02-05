import * as fromStoreFinder from '../actions/view-all-stores.action';
import { ViewAllStoresState } from '../store-finder-state';

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
  }

  return state;
}
