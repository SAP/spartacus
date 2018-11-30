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
    case fromStoreFinder.FIND_STORES:
    case fromStoreFinder.FIND_ALL_STORES_BY_COUNTRY:
    case fromStoreFinder.FIND_ALL_STORES_BY_REGION: {
      return { ...state, isLoading: true };
    }

    case fromStoreFinder.FIND_STORES_SUCCESS:
    case fromStoreFinder.FIND_ALL_STORES_BY_COUNTRY_SUCCESS:
    case fromStoreFinder.FIND_ALL_STORES_BY_REGION_SUCCESS: {
      const findStoresEntities = action.payload;

      return { ...state, findStoresEntities, isLoading: false };
    }

    case fromStoreFinder.FIND_STORES_FAIL:
    case fromStoreFinder.FIND_ALL_STORES_BY_COUNTRY_FAIL:
    case fromStoreFinder.FIND_ALL_STORES_BY_REGION_FAIL: {
      return { ...state, isLoading: false };
    }
  }

  return state;
}

export const getFindStoresEntities = (state: FindStoresState) =>
  state.findStoresEntities;
export const getLoading = (state: FindStoresState) => state.isLoading;
