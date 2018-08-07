import * as fromStoreFinder from '../actions/find-stores.action';

export interface StoreFinderState {
  entities: { [storeName: string]: any };
}

export const initialState: StoreFinderState = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: fromStoreFinder.FindStoresAction
): StoreFinderState {
  switch (action.type) {
    case fromStoreFinder.FIND_STORES_SUCCESS: {
      const stores = action.payload;
      console.log("IN REDUCER");
      const entities = {
        ...state.entities,
        [stores.storeName]: stores
      };

      return {
        ...state,
        entities
      };
    }
    case fromStoreFinder.FIND_STORES_FAIL: {
      return {
        ...state
      };
    }
  }

  return state;
}

export const getStoreFinderEntities = (state: StoreFinderState) =>
  state.entities;
