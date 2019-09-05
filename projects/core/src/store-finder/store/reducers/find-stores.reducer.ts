import { StoreFinderActions } from '../actions/index';
import { LoadingState } from '../store-finder-state';

export const initialState: LoadingState = {
  loading: false,
  error: null,
  success: false,
};

export function reducer(
  state = initialState,
  action: StoreFinderActions.FindStoresAction
): LoadingState {
  switch (action.type) {
    case StoreFinderActions.FIND_STORES: {
      const loading = true;

      return {
        ...state,
        loading,
      };
    }
    case StoreFinderActions.FIND_STORES_FAIL: {
      const loading = false;
      const error = action.payload;
      const success = false;

      return {
        ...state,
        loading,
        error,
        success,
      };
    }
    case StoreFinderActions.FIND_STORES_SUCCESS:
    case StoreFinderActions.FIND_STORE_BY_ID_SUCCESS: {
      const loading = false;
      const success = true;

      return {
        ...state,
        loading,
        success,
      };
    }
  }

  return state;
}
