import { Action } from '@ngrx/store';

export const SET_ACTIVE_BASE_SITE = '[Site-context] Set Active BaseSite';
export const BASE_SITE_CHANGE = '[Site-context] BaseSite Change';

export class SetActiveBaseSite implements Action {
  readonly type = SET_ACTIVE_BASE_SITE;
  constructor(public payload: string) {}
}

export class BaseSiteChange implements Action {
  readonly type = BASE_SITE_CHANGE;
}

// action types
export type BaseSiteAction = SetActiveBaseSite | BaseSiteChange;
