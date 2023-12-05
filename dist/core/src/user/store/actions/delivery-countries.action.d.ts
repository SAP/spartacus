import { Action } from '@ngrx/store';
import { Country } from '../../../model/address.model';
export declare const LOAD_DELIVERY_COUNTRIES = "[User] Load Delivery Countries";
export declare const LOAD_DELIVERY_COUNTRIES_FAIL = "[User] Load Delivery Countries Fail";
export declare const LOAD_DELIVERY_COUNTRIES_SUCCESS = "[User] Load Delivery Countries Success";
export declare class LoadDeliveryCountries implements Action {
    readonly type = "[User] Load Delivery Countries";
    constructor();
}
export declare class LoadDeliveryCountriesFail implements Action {
    payload: any;
    readonly type = "[User] Load Delivery Countries Fail";
    constructor(payload: any);
}
export declare class LoadDeliveryCountriesSuccess implements Action {
    payload: Country[];
    readonly type = "[User] Load Delivery Countries Success";
    constructor(payload: Country[]);
}
export type DeliveryCountriesAction = LoadDeliveryCountries | LoadDeliveryCountriesFail | LoadDeliveryCountriesSuccess;
