import { OCC_USER_ID_ANONYMOUS } from '../../../../occ/utils/occ-constants';
import { SetOccUserId, SET_OCC_USER_ID } from '../actions/occ-user-id.action';

export const initialState: string = OCC_USER_ID_ANONYMOUS;

export function occUserIdReducer(
  state = initialState,
  action: SetOccUserId
): string {
  if (action.type === SET_OCC_USER_ID) {
    return action.payload;
  }
  return state;
}
