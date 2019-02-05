import { Action } from '@ngrx/store';

import { LoaderResetAction } from '../../../state';
import { Country } from '../../../occ/occ-models/index';

export const LOAD_DELIVERY_COUNTRIES = '[User] Load Delivery Countries';
export const LOAD_DELIVERY_COUNTRIES_FAIL =
  '[User] Load Delivery Countries Fail';
export const LOAD_DELIVERY_COUNTRIES_SUCCESS =
  '[User] Load Delivery Countries Success';
export const RESET_DELIVERY_COUNTRIES = '[User] Reset Delivery Countries';

export class LoadDeliveryCountries implements Action {
  readonly type = LOAD_DELIVERY_COUNTRIES;
  constructor() {}
}

export class LoadDeliveryCountriesFail implements Action {
  readonly type = LOAD_DELIVERY_COUNTRIES_FAIL;
  constructor(public payload: any) {}
}

export class LoadDeliveryCountriesSuccess implements Action {
  readonly type = LOAD_DELIVERY_COUNTRIES_SUCCESS;
  constructor(public payload: Country[]) {}
}

export class ResetDeliveryCountries extends LoaderResetAction {
  readonly type = RESET_DELIVERY_COUNTRIES;
  constructor() {
    super(RESET_DELIVERY_COUNTRIES);
  }
}

export type DeliveryCountriesAction =
  | LoadDeliveryCountries
  | LoadDeliveryCountriesFail
  | LoadDeliveryCountriesSuccess;
