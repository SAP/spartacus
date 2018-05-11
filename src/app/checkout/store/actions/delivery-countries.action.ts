import { Action } from '@ngrx/store';

export const LOAD_DELIVERY_COUNTRIES = '[Checkout] Load Delivery Countries';
export const LOAD_DELIVERY_COUNTRIES_FAIL =
  '[Checkout] Load Delivery Countries Fail';
export const LOAD_DELIVERY_COUNTRIES_SUCCESS =
  '[Checkout] Load Delivery Countries Success';

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
  constructor(public payload: any) {}
}

export type DeliveryCountriesAction =
  | LoadDeliveryCountries
  | LoadDeliveryCountriesFail
  | LoadDeliveryCountriesSuccess;
