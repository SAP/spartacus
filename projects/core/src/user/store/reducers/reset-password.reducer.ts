import { UserActions } from '../actions/index';

export const initialState = false;

export function reducer(
  state = initialState,
  action: UserActions.ResetPasswordAction
): boolean {
  switch (action.type) {
    case UserActions.RESET_PASSWORD_SUCCESS: {
      return true;
    }
  }
  return state;
}
