import * as fromStoreFinder from '../actions/find-stores.action';
import { FindStoresState } from '../store-finder-state';

export const initialState: FindStoresState = {
  findStoresEntities: {}
};

export function reducer(
  state = initialState,
  action: fromStoreFinder.FindStoresAction
): FindStoresState {
  switch (action.type) {
    case fromStoreFinder.FIND_STORES_SUCCESS:
    case fromStoreFinder.FIND_STORE_BY_ID_SUCCESS: {
      const findStoresEntities = action.payload;

      return { ...state, findStoresEntities };
    }
  }

  return state;
}
