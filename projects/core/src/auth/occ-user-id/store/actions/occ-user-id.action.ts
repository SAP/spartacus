import { Action } from '@ngrx/store';

export const SET_OCC_USER_ID = '[Auth/OccUserId] Set Occ User ID';

export class SetOccUserId implements Action {
  readonly type = SET_OCC_USER_ID;
  constructor(public payload: string) {}
}

// action types
export type OccUserIdActions = SetOccUserId;
