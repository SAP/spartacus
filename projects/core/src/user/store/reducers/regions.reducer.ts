import * as fromAction from '../actions/index';
import { RegionsState } from '../user-state';
import { Region } from '../../../occ/occ-models';

export const initialState: RegionsState = {
  entities: []
};

export function reducer(
  state = initialState,
  action: fromAction.RegionsAction | fromAction.ClearMiscsData
): RegionsState {
  switch (action.type) {
    case fromAction.LOAD_REGIONS_SUCCESS: {
      const entities: Region[] = action.payload;
      if (entities) {
        return {
          ...state,
          entities
        };
      }
      return initialState;
    }

    case fromAction.LOAD_REGIONS: {
      return {
        ...state
      };
    }

    case fromAction.CLEAR_MISCS_DATA: {
      return {
        ...initialState
      };
    }
  }

  return state;
}

export const getRegionsEntities = (state: RegionsState) => state.entities;
