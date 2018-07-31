import * as fromAction from '../actions';

export interface RegionsState {
  entities: any;
  loading: boolean;
  loaded: boolean;
}

export const initialState: RegionsState = {
  entities: {},
  loading: false,
  loaded: true
};

export function reducer(
  state = initialState,
  action: fromAction.RegionsAction | fromAction.ClearMiscsData
): RegionsState {
  switch (action.type) {
    case fromAction.LOAD_REGIONS_SUCCESS: {
      const entities = action.payload;
      if (entities) {
        return {
          ...state,
          entities,
          loaded: true,
          loading: false
        };
      }
      return initialState;
    }

    case fromAction.LOAD_REGIONS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromAction.CLEAR_MISCS_DATA: {
      return {
        ...initialState,
        loaded: false
      };
    }
  }

  return state;
}

export const getRegionsEntities = (state: RegionsState) => state.entities;
export const getRegionsLoading = (state: RegionsState) => state.loading;
export const getRegionsLoaded = (state: RegionsState) => state.loaded;
