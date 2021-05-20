import { StoreFinderActions } from '../actions/index';
import { FindStoresState } from '../store-finder-state';

export const initialState: FindStoresState = {
  findStoresEntities: {},
  findStoreEntitiesById: {},
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
      const findStoreEntitiesById = action.payload;

      return { ...state, findStoreEntitiesById };
    }
  }

  return state;
}
