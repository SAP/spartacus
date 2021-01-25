import { UserProfileActions } from '../actions/index';

export const initialState = false;

export function reducer(
  state = initialState,
  action: UserProfileActions.ResetPasswordAction
): boolean {
  switch (action.type) {
    case UserProfileActions.RESET_PASSWORD_SUCCESS: {
      return true;
    }
  }
  return state;
}
