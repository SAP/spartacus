import { StoreFinderActions } from '../actions/index';
import { FindStoresState } from '../store-finder-state';

export const initialState: FindStoresState = {
  findStoresEntities: {},
  findStoreEntityById: {},
};

export function findStoresReducer(
  state = initialState,
  action: StoreFinderActions.FindStoresAction
): FindStoresState {
  switch (action.type) {
    case StoreFinderActions.FIND_STORES_SUCCESS: {
      const findStoresEntities = action.payload;

      return { ...state, findStoresEntities };
    }
    case StoreFinderActions.FIND_STORE_BY_ID_SUCCESS: {
      const findStoreEntityById = action.payload;

      return { ...state, findStoreEntityById };
    }
  }

  return state;
}
