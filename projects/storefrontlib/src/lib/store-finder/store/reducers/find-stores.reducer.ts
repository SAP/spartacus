import * as fromStoreFinder from '../actions/find-stores.action';

export interface FindStoresState {
  findStoresEntities: any;
  isLoading: boolean;
}

export const initialState: FindStoresState = {
  findStoresEntities: {},
  isLoading: false
};

export function reducer(
  state = initialState,
  action: fromStoreFinder.FindStoresAction
): FindStoresState {
  switch (action.type) {
    case fromStoreFinder.ON_HOLD:
    case fromStoreFinder.FIND_STORES: {
      return {
        ...state,
        isLoading: true
      };
    }

    case fromStoreFinder.FIND_STORES_SUCCESS: {
      const findStoresEntities = action.payload;

      return {
        ...state,
        findStoresEntities,
        isLoading: false
      };
    }

    case fromStoreFinder.FIND_STORES_FAIL: {
      return {
        ...state,
        isLoading: false
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

export const getFindStoresEntities = (state: FindStoresState) =>
  state.findStoresEntities;
export const getLoading = (state: FindStoresState) => state.isLoading;
