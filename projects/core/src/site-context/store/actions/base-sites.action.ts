import { Action } from '@ngrx/store';
import { BaseSite } from '../../../model/misc.model';

export const LOAD_BASE_SITES = '[Site-context] Load BaseSites';
export const LOAD_BASE_SITES_FAIL = '[Site-context] Load BaseSites Fail';
export const LOAD_BASE_SITES_SUCCESS = '[Site-context] Load BaseSites Success';

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

// action types
export type BaseSitesAction =
  | LoadBaseSites
  | LoadBaseSitesFail
  | LoadBaseSitesSuccess;
