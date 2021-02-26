import { UserProfileActions } from '../actions/index';
import { Action } from '@ngrx/store';

export const initialState = false;

export function reducer(state = initialState, action: Action): boolean {
  switch (action.type) {
    case UserProfileActions.RESET_PASSWORD_SUCCESS: {
      return true;
    }
  }
  return state;
}
