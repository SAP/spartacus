/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';

export const LOAD_BILLING_COUNTRIES = '[User] Load Billing Countries';
export const LOAD_BILLING_COUNTRIES_FAIL = '[User] Load Billing Countries Fail';
export const LOAD_BILLING_COUNTRIES_SUCCESS =
  '[User] Load Billing Countries Success';

export class LoadBillingCountries implements Action {
  readonly type = LOAD_BILLING_COUNTRIES;
  constructor() {
    // Intentional empty constructor
  }
}

export class LoadBillingCountriesFail implements Action {
  readonly type = LOAD_BILLING_COUNTRIES_FAIL;
  constructor(public payload: any) {}
}

export class LoadBillingCountriesSuccess implements Action {
  readonly type = LOAD_BILLING_COUNTRIES_SUCCESS;
  constructor(public payload: any) {}
}

export type BillingCountriesAction =
  | LoadBillingCountries
  | LoadBillingCountriesFail
  | LoadBillingCountriesSuccess;
