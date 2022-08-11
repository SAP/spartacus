import { Action } from '@ngrx/store';
import { Country } from '../../../model/address.model';

export const LOAD_DELIVERY_COUNTRIES = '[User] Load Delivery Countries';
export const LOAD_DELIVERY_COUNTRIES_FAIL =
  '[User] Load Delivery Countries Fail';
export const LOAD_DELIVERY_COUNTRIES_SUCCESS =
  '[User] Load Delivery Countries Success';

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

export type DeliveryCountriesAction =
  | LoadDeliveryCountries
  | LoadDeliveryCountriesFail
  | LoadDeliveryCountriesSuccess;
