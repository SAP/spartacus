/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { Country } from '../../../model/address.model';
import { ErrorAction, ErrorActionType } from '../../../model/index';

export const LOAD_DELIVERY_COUNTRIES = '[User] Load Delivery Countries';
export const LOAD_DELIVERY_COUNTRIES_FAIL =
  '[User] Load Delivery Countries Fail';
export const LOAD_DELIVERY_COUNTRIES_SUCCESS =
  '[User] Load Delivery Countries Success';

export class LoadDeliveryCountries implements Action {
  readonly type = LOAD_DELIVERY_COUNTRIES;

  constructor() {
    // Intentional empty constructor
  }
}

export class LoadDeliveryCountriesFail implements ErrorAction {
  readonly type = LOAD_DELIVERY_COUNTRIES_FAIL;

  constructor(public error: ErrorActionType) {}
}

export class LoadDeliveryCountriesSuccess implements Action {
  readonly type = LOAD_DELIVERY_COUNTRIES_SUCCESS;

  constructor(public payload: Country[]) {}
}

export type DeliveryCountriesAction =
  | LoadDeliveryCountries
  | LoadDeliveryCountriesFail
  | LoadDeliveryCountriesSuccess;
