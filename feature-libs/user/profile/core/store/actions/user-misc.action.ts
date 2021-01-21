import { Action } from '@ngrx/store';
export const CLEAR_USER_MISC_DATA = '[User] Clear User Misc Data';

export class ClearUserMiscData implements Action {
  readonly type = CLEAR_USER_MISC_DATA;
}
