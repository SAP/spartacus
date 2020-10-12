import * as fromUpdateEmailAction from '../../../user/store/actions/update-email.action';
import { UserToken } from '../../models/token-types.model';
import { AuthActions } from '../actions/index';

export const initialState: UserToken = <UserToken>{};

export function reducer(
  state = initialState,
  action:
    | AuthActions.UserTokenAction
    | fromUpdateEmailAction.UpdateEmailSuccessAction
): UserToken {
  switch (action.type) {
    case AuthActions.SET_USER_TOKEN_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
  }
  return state;
}
