import { Action } from '@ngrx/store';
import { Currency } from '../../../model/misc.model';
export declare const LOAD_CURRENCIES = "[Site-context] Load Currencies";
export declare const LOAD_CURRENCIES_FAIL = "[Site-context] Load Currencies Fail";
export declare const LOAD_CURRENCIES_SUCCESS = "[Site-context] Load Currencies Success";
export declare const SET_ACTIVE_CURRENCY = "[Site-context] Set Active Currency";
export declare const CURRENCY_CHANGE = "[Site-context] Currency Change";
export declare class LoadCurrencies implements Action {
    readonly type = "[Site-context] Load Currencies";
}
export declare class LoadCurrenciesFail implements Action {
    payload: any;
    readonly type = "[Site-context] Load Currencies Fail";
    constructor(payload: any);
}
export declare class LoadCurrenciesSuccess implements Action {
    payload: Currency[];
    readonly type = "[Site-context] Load Currencies Success";
    constructor(payload: Currency[]);
}
export declare class SetActiveCurrency implements Action {
    payload: string;
    readonly type = "[Site-context] Set Active Currency";
    constructor(payload: string);
}
export declare class CurrencyChange implements Action {
    payload: {
        previous: string | null;
        current: string | null;
    };
    readonly type = "[Site-context] Currency Change";
    constructor(payload: {
        previous: string | null;
        current: string | null;
    });
}
export type CurrenciesAction = LoadCurrencies | LoadCurrenciesFail | LoadCurrenciesSuccess | SetActiveCurrency | CurrencyChange;
