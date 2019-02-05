import { Action } from '@ngrx/store';

import { LoaderResetAction } from '../../../state';

export const LOAD_BILLING_COUNTRIES = '[User] Load Billing Countries';
export const LOAD_BILLING_COUNTRIES_FAIL = '[User] Load Billing Countries Fail';
export const LOAD_BILLING_COUNTRIES_SUCCESS =
  '[User] Load Billing Countries Success';
export const RESET_BILLING_COUNTRIES = '[User] Reset Billing Countries';

export class LoadBillingCountries implements Action {
  readonly type = LOAD_BILLING_COUNTRIES;
  constructor() {}
}

export class LoadBillingCountriesFail implements Action {
  readonly type = LOAD_BILLING_COUNTRIES_FAIL;
  constructor(public payload: any) {}
}

export class LoadBillingCountriesSuccess implements Action {
  readonly type = LOAD_BILLING_COUNTRIES_SUCCESS;
  constructor(public payload: any) {}
}

export class ResetBillingCountries extends LoaderResetAction {
  readonly type = RESET_BILLING_COUNTRIES;
  constructor() {
    super(RESET_BILLING_COUNTRIES);
  }
}

export type BillingCountriesAction =
  | LoadBillingCountries
  | LoadBillingCountriesFail
  | LoadBillingCountriesSuccess;
