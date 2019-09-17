import { StoreFinderActions } from '../actions/index';
import { FindStoresState } from '../store-finder-state';

export const initialState: FindStoresState = {
  findStoresEntities: {},
};

export function reducer(
  state = initialState,
  action: StoreFinderActions.FindStoresAction
): FindStoresState {
  switch (action.type) {
    case StoreFinderActions.FIND_STORES_SUCCESS:
    case StoreFinderActions.FIND_STORE_BY_ID_SUCCESS: {
      const findStoresEntities = action.payload;

      return { ...state, findStoresEntities };
    }
  }

  return state;
}
