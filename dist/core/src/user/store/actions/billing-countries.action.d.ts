import { Action } from '@ngrx/store';
export declare const LOAD_BILLING_COUNTRIES = "[User] Load Billing Countries";
export declare const LOAD_BILLING_COUNTRIES_FAIL = "[User] Load Billing Countries Fail";
export declare const LOAD_BILLING_COUNTRIES_SUCCESS = "[User] Load Billing Countries Success";
export declare class LoadBillingCountries implements Action {
    readonly type = "[User] Load Billing Countries";
    constructor();
}
export declare class LoadBillingCountriesFail implements Action {
    payload: any;
    readonly type = "[User] Load Billing Countries Fail";
    constructor(payload: any);
}
export declare class LoadBillingCountriesSuccess implements Action {
    payload: any;
    readonly type = "[User] Load Billing Countries Success";
    constructor(payload: any);
}
export type BillingCountriesAction = LoadBillingCountries | LoadBillingCountriesFail | LoadBillingCountriesSuccess;
