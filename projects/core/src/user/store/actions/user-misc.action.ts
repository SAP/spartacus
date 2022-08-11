import { Action } from '@ngrx/store';
export const CLEAR_USER_MISCS_DATA = '[User] Clear User Misc Data';

export class ClearUserMiscsData implements Action {
  readonly type = CLEAR_USER_MISCS_DATA;
}
