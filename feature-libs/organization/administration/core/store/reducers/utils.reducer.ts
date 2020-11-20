import { UtilsActions } from '../actions';

export const utilsInitialState = undefined;

export function utilsReducer(
  state = utilsInitialState,
  action: UtilsActions.utilsActionTypes
) {
  switch (action.type) {
    case UtilsActions.SET_TOGGLE_STATE:
      return { ...state, toggleStatus: action.payload };
  }
}
