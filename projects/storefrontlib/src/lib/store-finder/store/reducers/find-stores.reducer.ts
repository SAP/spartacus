import * as fromStoreFinder from '../actions/find-stores.action';

export interface StoreFinderState {
  findStoresEntities: any;
  viewAllStoresEntities: any;
}

export const initialState: StoreFinderState = {
  findStoresEntities: {},
  viewAllStoresEntities: {}
};

export function reducer(
  state = initialState,
  action: fromStoreFinder.FindStoresAction
): StoreFinderState {
  switch (action.type) {
    case fromStoreFinder.FIND_STORES_SUCCESS: {
      const findStoresEntities = action.payload;

      return {
        ...state,
        findStoresEntities
      };
    }
    case fromStoreFinder.FIND_STORES_FAIL: {
      return {
        ...state
      };
    }

    case fromStoreFinder.FIND_ALL_STORES_SUCCESS: {
      const viewAllStoresEntities = action.payload;

      return {
        ...state,
        viewAllStoresEntities
      };
    }
    case fromStoreFinder.FIND_ALL_STORES_FAIL: {
      return {
        ...state
      };
    }

    case fromStoreFinder.FIND_ALL_STORES_BY_COUNTRY_SUCCESS: {
      const findStoresEntities = action.payload;

      return {
        ...state,
        findStoresEntities
      };
    }

    case fromStoreFinder.FIND_ALL_STORES_BY_COUNTRY_FAIL: {
      return {
        ...state
      };
    }

    case fromStoreFinder.FIND_ALL_STORES_BY_REGION_SUCCESS: {
      const findStoresEntities = action.payload;

      return {
        ...state,
        findStoresEntities
      };
    }

    case fromStoreFinder.FIND_ALL_STORES_BY_REGION_FAIL: {
      return {
        ...state
      };
    }
  }

  return state;
}

export const getFindStoresEntities = (state: StoreFinderState) =>
  state.findStoresEntities;
export const getViewAllStoresEntities = (state: StoreFinderState) =>
  state.viewAllStoresEntities;
