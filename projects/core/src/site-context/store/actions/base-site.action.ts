import { Action } from '@ngrx/store';
import { BaseSite } from '../../../model/misc.model';

export const LOAD_BASE_SITE = '[Site-context] Load BaseSite';
export const LOAD_BASE_SITE_FAIL = '[Site-context] Load BaseSite Fail';
export const LOAD_BASE_SITE_SUCCESS = '[Site-context] Load BaseSite Success';
export const SET_ACTIVE_BASE_SITE = '[Site-context] Set Active BaseSite';
export const BASE_SITE_CHANGE = '[Site-context] BaseSite Change';

export class LoadBaseSite implements Action {
  readonly type = LOAD_BASE_SITE;
}

export class LoadBaseSiteFail implements Action {
  readonly type = LOAD_BASE_SITE_FAIL;
  constructor(public payload: any) {}
}

export class LoadBaseSiteSuccess implements Action {
  readonly type = LOAD_BASE_SITE_SUCCESS;
  constructor(public payload: BaseSite) {}
}

export class SetActiveBaseSite implements Action {
  readonly type = SET_ACTIVE_BASE_SITE;
  constructor(public payload: string) {}
}

export class BaseSiteChange implements Action {
  readonly type = BASE_SITE_CHANGE;
}

// action types
export type BaseSiteAction =
  | LoadBaseSite
  | LoadBaseSiteFail
  | LoadBaseSiteSuccess
  | SetActiveBaseSite
  | BaseSiteChange;
