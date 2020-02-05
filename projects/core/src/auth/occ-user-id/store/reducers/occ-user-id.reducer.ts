import { OCC_USER_ID_ANONYMOUS } from '../../../../occ/utils/occ-constants';
import * as OccUserIdActions from '../actions/occ-user-id.action';

export const initialState: string = OCC_USER_ID_ANONYMOUS;

export function occUserIdReducer(
  state = initialState,
  action: OccUserIdActions.SetOccUserId
): string {
  switch (action.type) {
    case OccUserIdActions.SET_OCC_USER_ID:
      {
        return action.payload;
      }
      return state;
  }
  return state;
}
