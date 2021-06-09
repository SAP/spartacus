import { StoreFinderActions } from '../actions/index';
import { ViewAllStoresState } from '../store-finder-state';

export const initialState: ViewAllStoresState = {
  viewAllStoresEntities: {},
};

export function viewAllStoresReducer(
  state = initialState,
  action: StoreFinderActions.ViewAllStoresAction
): ViewAllStoresState {
  switch (action.type) {
    case StoreFinderActions.VIEW_ALL_STORES_SUCCESS: {
      const viewAllStoresEntities = action.payload;

      return {
        ...state,
        viewAllStoresEntities,
      };
    }
  }

  return state;
}
