import { RegionsState } from '../user-state';
import * as fromAction from '../actions/index';
import { Region } from '../../../model/address.model';

export const initialState: RegionsState = {
  entities: [],
  country: null,
};

export function reducer(
  state = initialState,
  action: fromAction.RegionsAction | fromAction.ClearMiscsData
): RegionsState {
  switch (action.type) {
    case fromAction.LOAD_REGIONS_SUCCESS: {
      const entities: Region[] = action.payload.entities;
      const country: string = action.payload.country;
      if (entities) {
        return {
          ...state,
          entities,
          country,
        };
      }
      return initialState;
    }
  }

  return state;
}
