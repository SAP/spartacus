export const SET_TOGGLE_STATE = '[Utils] Set Toggle button state';

export class SetToggleState {
  readonly type = SET_TOGGLE_STATE;
  constructor(public payload: boolean) {}
}

export type utilsActionTypes = SetToggleState;
