import * as fromStoreFinder from '../actions/find-stores.action';
import { StoreLocation } from '../../models/location';

export interface StoreFinderState {
  entities: any;
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
      const entities = action.payload;

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
