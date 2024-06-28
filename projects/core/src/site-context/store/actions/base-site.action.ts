/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { ActionErrorProperty, ErrorAction } from '../../../model/index';
import { BaseSite } from '../../../model/misc.model';

export const LOAD_BASE_SITE = '[Site-context] Load BaseSite';
export const LOAD_BASE_SITE_FAIL = '[Site-context] Load BaseSite Fail';
export const LOAD_BASE_SITE_SUCCESS = '[Site-context] Load BaseSite Success';

export const LOAD_BASE_SITES = '[Site-context] Load BaseSites';
export const LOAD_BASE_SITES_FAIL = '[Site-context] Load BaseSites Fail';
export const LOAD_BASE_SITES_SUCCESS = '[Site-context] Load BaseSites Success';

export const SET_ACTIVE_BASE_SITE = '[Site-context] Set Active BaseSite';
export const BASE_SITE_CHANGE = '[Site-context] BaseSite Change';

export class LoadBaseSite implements Action {
  readonly type = LOAD_BASE_SITE;
}

export class LoadBaseSiteFail implements ErrorAction {
  readonly type = LOAD_BASE_SITE_FAIL;

  constructor(error: ActionErrorProperty);
  /**
   * @deprecated Please !! use `error` parameter other than `null` or `undefined`.
   *
   *             Note: Allowing for `null` or `undefined` will be removed in future versions
   *             together with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   **/
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures -- for distinguishing non-deprecated constructor
    error: any
  );
  constructor(public error: any) {}
}

export class LoadBaseSiteSuccess implements Action {
  readonly type = LOAD_BASE_SITE_SUCCESS;

  constructor(public payload: BaseSite) {}
}

export class LoadBaseSites implements Action {
  readonly type = LOAD_BASE_SITES;
}

export class LoadBaseSitesFail implements ErrorAction {
  readonly type = LOAD_BASE_SITES_FAIL;

  constructor(error: ActionErrorProperty);
  /**
   * @deprecated Please !! use `error` parameter other than `null` or `undefined`.
   *
   *             Note: Allowing for `null` or `undefined` will be removed in future versions
   *             together with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   **/
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures -- for distinguishing non-deprecated constructor
    error: any
  );
  constructor(public error: any) {}
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
  | LoadBaseSite
  | LoadBaseSiteFail
  | LoadBaseSiteSuccess
  | LoadBaseSites
  | LoadBaseSitesFail
  | LoadBaseSitesSuccess
  | SetActiveBaseSite
  | BaseSiteChange;
