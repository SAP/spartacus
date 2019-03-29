import * as fromAction from '../actions/reset-password.action';

export const initialState = false;

export function reducer(
  state = initialState,
  action: fromAction.ResetPasswordAction
): boolean {
  switch (action.type) {
    case fromAction.RESET_PASSWORD_SUCCESS: {
      return true;
    }
  }
  return state;
}
