import { Action } from '@ngrx/store';
import { BaseSite } from '../../../model/misc.model';

export const LOAD_BASE_SITES = '[Site-context] Load BaseSites';
export const LOAD_BASE_SITES_FAIL = '[Site-context] Load BaseSites Fail';
export const LOAD_BASE_SITES_SUCCESS = '[Site-context] Load BaseSites Success';
export const SET_ACTIVE_BASE_SITE = '[Site-context] Set Active BaseSite';
export const BASE_SITE_CHANGE = '[Site-context] BaseSite Change';

export class LoadBaseSites implements Action {
  readonly type = LOAD_BASE_SITES;
}

export class LoadBaseSitesFail implements Action {
  readonly type = LOAD_BASE_SITES_FAIL;
  constructor(public payload: any) {}
}

export class LoadBaseSitesSuccess implements Action {
  readonly type = LOAD_BASE_SITES_SUCCESS;
  constructor(public payload: BaseSite[]) {}
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
  | LoadBaseSites
  | LoadBaseSitesFail
  | LoadBaseSitesSuccess
  | SetActiveBaseSite
  | BaseSiteChange;
