import { Region } from '../../../model/address.model';
import { UserActions } from '../actions/index';
import { RegionsState } from '../user-state';

export const initialState: RegionsState = {
  entities: [],
  country: null,
};

export function reducer(
  state = initialState,
  action: UserActions.RegionsAction | UserActions.ClearUserMiscsData
): RegionsState {
  switch (action.type) {
    case UserActions.LOAD_REGIONS_SUCCESS: {
      const entities: Region[] = action.payload.entities;
      const country: string = action.payload.country;
      if (entities || country) {
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
