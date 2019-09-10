import { StoreFinderActions } from '../actions/index';
import { LoadingState } from '../store-finder-state';

export const initialState: LoadingState = {
  loading: false,
  error: false,
  success: false,
};

export function reducer(
  state = initialState,
  action: StoreFinderActions.ViewAllStoresAction
): LoadingState {
  switch (action.type) {
    case StoreFinderActions.VIEW_ALL_STORES: {
      const loading = true;
      const error = false;

      return {
        ...state,
        loading,
        error,
      };
    }
    case StoreFinderActions.VIEW_ALL_STORES_SUCCESS: {
      const loading = false;
      const success = true;
      const error = false;

      return {
        ...state,
        loading,
        error,
        success,
      };
    }
    case StoreFinderActions.VIEW_ALL_STORES_FAIL: {
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
  }

  return state;
}
